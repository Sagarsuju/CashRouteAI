import React, { useEffect, useRef } from 'react';

export const CashNetwork3D: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const resize = () => {
      canvas.width = canvas.parentElement?.clientWidth || 380;
      canvas.height = canvas.parentElement?.clientHeight || 260;
    };
    resize();
    window.addEventListener('resize', resize);

    // 12 network nodes in 3D orbit
    const nodes = [
      { radius: 75, speed: 0.015, offset: 0, color: '#0C83EB', label: 'ATM-042', size: 5, yOffset: -20 },
      { radius: 105, speed: -0.012, offset: 1.2, color: '#EF4444', label: 'CRIT', size: 6, yOffset: 15 },
      { radius: 90, speed: 0.018, offset: 2.5, color: '#10B981', label: 'ATM-018', size: 4.5, yOffset: -35 },
      { radius: 125, speed: 0.009, offset: 3.8, color: '#38A3F8', label: 'CIT-07', size: 5.5, yOffset: 30 },
      { radius: 80, speed: -0.014, offset: 4.5, color: '#F59E0B', label: 'ATM-003', size: 4.5, yOffset: 5 },
      { radius: 110, speed: 0.016, offset: 5.2, color: '#0050A4', label: 'CIT-04', size: 5, yOffset: -10 },
      { radius: 65, speed: 0.022, offset: 0.8, color: '#10B981', label: 'ATM-012', size: 4, yOffset: 25 },
      { radius: 100, speed: -0.011, offset: 3.1, color: '#10B981', label: 'ATM-025', size: 4.5, yOffset: -25 },
    ];

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw orbit grid rings with perspective tilt
      ctx.save();
      ctx.translate(cx, cy);

      // Outer tilted orbit rings
      [65, 85, 110].forEach((r, idx) => {
        ctx.beginPath();
        ctx.ellipse(0, 0, r * 1.3, r * 0.45, idx * 0.25, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(12, 131, 235, 0.12)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
      });
      ctx.setLineDash([]);

      // Center Vault Node (Glowing Sphere)
      const pulse = Math.sin(angle * 2) * 3;
      const gradient = ctx.createRadialGradient(0, 0, 2, 0, 0, 28 + pulse);
      gradient.addColorStop(0, 'rgba(56, 163, 248, 1)');
      gradient.addColorStop(0.4, 'rgba(12, 131, 235, 0.8)');
      gradient.addColorStop(0.8, 'rgba(12, 131, 235, 0.2)');
      gradient.addColorStop(1, 'rgba(12, 131, 235, 0)');

      ctx.beginPath();
      ctx.arc(0, 0, 30 + pulse, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core icon
      ctx.beginPath();
      ctx.arc(0, 0, 14, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = 'rgba(12, 131, 235, 0.6)';
      ctx.shadowBlur = 12;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Inner vault symbol
      ctx.fillStyle = '#0050A4';
      ctx.font = 'bold 9px JetBrains Mono, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('₹AI', 0, 0.5);

      // Render orbiting nodes
      const projectedNodes: Array<{ x: number; y: number; z: number; color: string; label: string; size: number }> = [];

      nodes.forEach((node) => {
        const curAngle = angle * node.speed * 60 + node.offset;
        // 3D coordinates on tilted plane
        const x3d = Math.cos(curAngle) * node.radius * 1.35;
        const z3d = Math.sin(curAngle) * node.radius;
        const y3d = z3d * 0.35 + node.yOffset * Math.cos(curAngle * 0.5);

        // Perspective scale factor
        const scale = (z3d + 150) / 200;
        const xProj = x3d;
        const yProj = y3d;

        projectedNodes.push({
          x: xProj,
          y: yProj,
          z: z3d,
          color: node.color,
          label: node.label,
          size: node.size * scale,
        });

        // Connection line to central vault
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(xProj, yProj);
        ctx.strokeStyle = `rgba(12, 131, 235, ${0.08 + (z3d > 0 ? 0.15 : 0.04)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Sort by Z for correct depth sorting
      projectedNodes.sort((a, b) => a.z - b.z);

      // Draw nodes
      projectedNodes.forEach((node) => {
        ctx.save();
        ctx.translate(node.x, node.y);

        // Node glow
        ctx.beginPath();
        ctx.arc(0, 0, node.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = node.color === '#EF4444' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(12, 131, 235, 0.15)';
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(0, 0, node.size, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label pill
        if (node.z > -20) {
          ctx.font = '600 8.5px Inter, sans-serif';
          ctx.fillStyle = '#0F172A';
          ctx.fillText(node.label, 0, -node.size - 5);
        }

        ctx.restore();
      });

      ctx.restore();

      angle += 0.015;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="relative w-full h-[240px] flex items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-b from-brand-50/60 to-white/40 border border-brand-100/60 p-2">
      <div className="absolute top-3 left-4 flex items-center gap-2 z-10">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
          Dynamic Spatial Mesh
        </span>
      </div>
      <canvas ref={canvasRef} className="w-full h-full block cursor-grab active:cursor-grabbing" />
      <div className="absolute bottom-2.5 right-3.5 text-[10px] text-slate-400 font-mono">
        R-Tree Optimizer v2.4 • 60 FPS
      </div>
    </div>
  );
};
