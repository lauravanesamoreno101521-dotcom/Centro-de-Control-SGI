import React, { useEffect, useState } from "react";
import { Cpu, RefreshCw, Clock } from "lucide-react";

interface SGIHeaderProps {
  onResetSystem: () => void;
}

const emotionLights = [
  { color: "#FFEA00", label: "Alegría" },
  { color: "#FF6B00", label: "Ansiedad" },
  { color: "#00A8FF", label: "Calma" },
  { color: "#FF1744", label: "Furia" },
  { color: "#00FF88", label: "Desagrado" },
  { color: "#BF40FF", label: "Nostalgia" },
];

export default function SGIHeader({ onResetSystem }: SGIHeaderProps) {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }) + " | " + now.toLocaleTimeString("es-ES", { hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 shadow-xl" id="sgi-control-header">
      <div className="header-rainbow-border" />
      <div className="glass-panel border-b border-white/10 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-lg blur-sm animate-pulse"
              style={{ background: "linear-gradient(135deg, #FFEA00, #BF40FF, #00A8FF)" }}
            />
            <div className="relative bg-slate-900 border border-purple-500/40 p-2.5 rounded-lg text-purple-300">
              <Cpu className="h-6 w-6 animate-pulse-slow" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-display font-bold text-xl md:text-2xl tracking-tight uppercase">
                <span className="text-white">Centro de </span>
                <span className="neon-title-control">Control</span>{" "}
                <span className="neon-title-sgi">SGI</span>
              </h1>
            </div>
            <p className="text-xs text-slate-400 font-medium">
              Sistema de Gestión Integrado — Gestión Emocional de Procesos
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              {emotionLights.map((light) => (
                <span
                  key={light.label}
                  className="h-2 w-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor: light.color,
                    boxShadow: `0 0 6px ${light.color}`,
                  }}
                  title={light.label}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 md:gap-6">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-slate-900/80 border border-white/5 px-3 py-2 rounded-lg font-mono text-xs text-slate-300">
              <Clock className="h-3.5 w-3.5" style={{ color: "#00A8FF" }} />
              <span>{currentTime || "Cargando..."}</span>
            </div>

            <button
              onClick={onResetSystem}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-white/10 hover:border-purple-500/30 px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all duration-200"
              title="Sincronizar y resetear valores de fábrica"
              id="btn-sync-system"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
