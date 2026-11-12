"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, Flame, Eye, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreeDElementProps {
  className?: string;
  splineUrl?: string;
  variant?: "hero" | "card" | "compact" | "cook";
  badgeText?: string;
}

export function ThreeDElement({
  className,
  splineUrl,
  variant = "hero",
  badgeText = "3D Interactive Space",
}: ThreeDElementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Mouse move 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Map to rotation degrees
    setRotate({
      x: (-y / rect.height) * 20,
      y: (x / rect.width) * 20,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Interactive particle & flame canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      speedY: number;
      speedX: number;
      alpha: number;
      hue: number;
    }> = [];

    // Create initial ember/cooking particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        speedY: -(Math.random() * 1.5 + 0.5),
        speedX: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.7 + 0.2,
        hue: Math.random() > 0.4 ? 28 : 14, // Saffron or coral flame hues
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw subtle radial glow in center
      const gradient = ctx.createRadialGradient(
        width / 2,
        height * 0.65,
        10,
        width / 2,
        height * 0.65,
        width * 0.6
      );
      gradient.addColorStop(0, "rgba(242, 140, 40, 0.22)");
      gradient.addColorStop(0.5, "rgba(71, 73, 115, 0.12)");
      gradient.addColorStop(1, "rgba(22, 27, 51, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render floating ember particles
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.alpha -= 0.003;

        if (p.y < 0 || p.alpha <= 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
          p.alpha = Math.random() * 0.8 + 0.2;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 60%, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#F28C28";
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing select-none transition-shadow duration-300",
        "border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.4)]",
        className
      )}
      style={{
        perspective: "1000px",
      }}
    >
      {/* Background Canvas Particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 3D Tilted Layer */}
      <div
        className="w-full h-full flex flex-col items-center justify-center p-8 transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${
            isHovered ? "20px" : "0px"
          })`,
          transformStyle: "preserve-3d",
        }}
      >
        {splineUrl ? (
          <iframe
            src={splineUrl}
            title="3D Scene"
            className="w-full h-full border-0 pointer-events-auto"
          />
        ) : (
          <div className="relative flex flex-col items-center text-center">
            {/* Multi-layered 3D cooking glyph */}
            <div
              className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full flex items-center justify-center mb-6"
              style={{
                transform: "translateZ(40px)",
              }}
            >
              {/* Outer pulsing ring */}
              <div className="absolute inset-0 rounded-full border-2 border-saffron/30 animate-ping opacity-25" />
              <div className="absolute inset-2 rounded-full border border-saffron/40 border-dashed animate-spin [animation-duration:30s]" />

              {/* Inner glowing core */}
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-saffron via-saffron-light to-amber-200 shadow-[0_0_50px_rgba(242,140,40,0.6)] flex items-center justify-center">
                <Flame className="w-16 h-16 sm:w-20 sm:h-20 text-prussian drop-shadow-md animate-bounce [animation-duration:3s]" />
              </div>

              {/* Floating Orbiting Spheres */}
              <div
                className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-white to-almond-400 shadow-lg flex items-center justify-center text-prussian font-bold text-xs"
                style={{ transform: "translateZ(60px)" }}
              >
                ₹
              </div>
              <div
                className="absolute -bottom-2 -left-2 w-9 h-9 rounded-full bg-prussian-600 border border-saffron/50 shadow-lg flex items-center justify-center text-saffron text-xs"
                style={{ transform: "translateZ(50px)" }}
              >
                <Sparkles className="w-4 h-4" />
              </div>
            </div>

            {/* 3D Label & Ready for Spline note */}
            <div
              className="space-y-1.5"
              style={{ transform: "translateZ(30px)" }}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-semibold">
                <Layers className="w-3.5 h-3.5 text-saffron" />
                <span>{badgeText}</span>
              </div>
              <h4 className="text-white font-heading font-bold text-base sm:text-lg">
                Interactive Culinary Core
              </h4>
              <p className="text-xs text-almond-600 max-w-xs">
                Move cursor to interact • Ready for Spline 3D or Three.js scene embeds
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Glass status chip */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-prussian/80 backdrop-blur-md border border-white/10 text-[10px] text-almond-500">
        <Eye className="w-3 h-3 text-saffron" />
        <span>3D Ready</span>
      </div>
    </div>
  );
}
