import React, { useState } from "react";
import { Smile, AlertCircle, Heart, Shield, ChevronRight, Activity, Globe, Eye, CheckCircle2, Leaf, HardHat, Car } from "lucide-react";
import { EmotionalProfile, EmotionKey } from "../types";
import EmotionCardIdentity from "./EmotionCardIdentity";
import { motion } from "motion/react";

interface DashboardProps {
  profiles: EmotionalProfile[];
  onSelectProfile: (profile: EmotionalProfile) => void;
}

const emotionDetails: Record<EmotionKey, { stickyNote: string; traits: string[] }> = {
  [EmotionKey.Alegria]: {
    stickyNote: "Auditoría aprobada",
    traits: ["Brilla", "Agradece", "Disfruta", "Comparte"],
  },
  [EmotionKey.Ansiedad]: {
    stickyNote: "¿Y Si...?",
    traits: ["Identifico riesgos", "Prevenir problemas", "Proteger al equipo"],
  },
  [EmotionKey.Calma]: {
    stickyNote: "Hay que amar la sombra",
    traits: ["Analizo", "Reviso detalles", "Decido con claridad"],
  },
  [EmotionKey.Desagrado]: {
    stickyNote: "Estándares altos siempre",
    traits: ["Aseguro estándares", "No acepto incumplimientos", "Ni mediocridad"],
  },
  [EmotionKey.Nostalgia]: {
    stickyNote: "Recuerdos que nos conectan",
    traits: ["Experiencias que fortalecen", "Lecciones aprendidas", "Memoria histórica"],
  },
  [EmotionKey.Furia]: {
    stickyNote: "Cumplir no es opcional",
    traits: ["Defiendo lo correcto", "Exijo cumplimiento", "Acciono para solucionar"],
  },
};

const hseqBadges = [
  { label: "Calidad", color: "#00A8FF", icon: CheckCircle2 },
  { label: "Ambiental", color: "#00FF88", icon: Leaf },
  { label: "SST", color: "#FFEA00", icon: HardHat },
  { label: "Seguridad Vial", color: "#BF40FF", icon: Car },
];

export default function Dashboard({
  profiles,
  onSelectProfile,
}: DashboardProps) {
  const [revealedIdentity, setRevealedIdentity] = useState<Partial<Record<EmotionKey, boolean>>>({});

  const toggleIdentity = (key: EmotionKey, e: React.MouseEvent) => {
    e.stopPropagation();
    setRevealedIdentity((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Helper to retrieve emotion icon/emoji
  const getEmotionIcon = (key: EmotionKey) => {
    switch (key) {
      case EmotionKey.Alegria:
        return <Smile className="h-4 w-4 text-yellow-300" />;
      case EmotionKey.Ansiedad:
        return <AlertCircle className="h-4 w-4 text-orange-400 animate-pulse" />;
      case EmotionKey.Calma:
        return <Heart className="h-4 w-4 text-sky-400" />;
      case EmotionKey.Desagrado:
        return <Eye className="h-4 w-4 text-green-400" />;
      case EmotionKey.Nostalgia:
        return <Globe className="h-4 w-4 text-purple-400" />;
      case EmotionKey.Furia:
        return <Activity className="h-4 w-4 text-red-500 animate-ping" />;
      default:
        return <Shield className="h-4 w-4" />;
    }
  };

  // Helper to render the glow effect styling
  const getGlowClass = (key: EmotionKey) => {
    switch (key) {
      case EmotionKey.Alegria:
        return "hover:border-yellow-400/60 hover:shadow-yellow-400/20 glow-yellow";
      case EmotionKey.Ansiedad:
        return "hover:border-orange-500/60 hover:shadow-orange-500/20 glow-orange";
      case EmotionKey.Calma:
        return "hover:border-sky-500/60 hover:shadow-sky-500/20 glow-blue";
      case EmotionKey.Desagrado:
        return "hover:border-green-500/60 hover:shadow-green-500/20 glow-green";
      case EmotionKey.Nostalgia:
        return "hover:border-purple-500/60 hover:shadow-purple-500/20 glow-purple";
      case EmotionKey.Furia:
        return "hover:border-red-500/60 hover:shadow-red-500/20 glow-red";
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8" id="sgi-dashboard-wrapper">
      {/* Hero — Cuartel General (centro de control) */}
      <div className="relative rounded-2xl overflow-hidden border border-purple-500/35 shadow-2xl shadow-purple-900/30 min-h-[300px] md:min-h-[380px]">
        <img
          src="/images/cuartel-general-intensamente.jpg"
          alt="Cuartel General Intensamente"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-purple-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/25 to-slate-950/50" />
        <div className="absolute inset-0 hq-scanlines pointer-events-none opacity-40" />

        <div className="relative flex flex-col justify-end min-h-[300px] md:min-h-[380px] p-6 md:p-8">
          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-purple-200/90 block mb-2">
            Tablero de Control SGI
          </span>
          <h2 className="font-display font-bold text-2xl md:text-4xl tracking-tight uppercase leading-tight drop-shadow-lg">
            <span className="text-white">Centro de </span>
            <span className="neon-title-control">Control</span>{" "}
            <span className="neon-title-sgi">SGI</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-200 mt-3 max-w-2xl leading-relaxed drop-shadow-md">
            Juntos hacemos que los procesos funcionen, los riesgos se controlen y la mejora continua sea una realidad.
          </p>
          <p className="text-[10px] font-mono text-purple-200/70 mt-1 uppercase tracking-wider">
            Un equipo, una meta, mejora continua
          </p>

          <div className="flex flex-wrap gap-2 mt-5">
            {profiles.map((profile) => (
              <button
                key={profile.key}
                onClick={() => onSelectProfile(profile)}
                className="text-[10px] font-mono font-bold uppercase px-3 py-1.5 rounded-full border cursor-pointer transition-all hover:scale-105 backdrop-blur-sm"
                style={{
                  backgroundColor: `${profile.colorHex}25`,
                  borderColor: `${profile.colorHex}80`,
                  color: profile.colorHex,
                  boxShadow: `0 0 14px ${profile.colorHex}35`,
                }}
              >
                {profile.emotionName}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-5 pt-4 border-t border-white/15">
            {hseqBadges.map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase px-3 py-1.5 rounded-lg border backdrop-blur-sm"
                style={{
                  backgroundColor: `${badge.color}20`,
                  borderColor: `${badge.color}50`,
                  color: badge.color,
                }}
              >
                <badge.icon className="h-3.5 w-3.5" />
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of 6 emotional cards */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="font-display font-bold text-lg text-white tracking-tight">
              Módulos Procesadores Emocionales Activos
            </h3>
            <div className="flex items-center gap-1.5 mt-1">
              {profiles.map((p) => (
                <span
                  key={p.key}
                  className="h-1.5 flex-1 max-w-8 rounded-full"
                  style={{ backgroundColor: p.colorHex, boxShadow: `0 0 6px ${p.colorHex}` }}
                />
              ))}
            </div>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            Selecciona un procesador para ver y ajustar parámetros
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="emotions-bento-grid">
          {profiles.map((profile) => {
            const details = emotionDetails[profile.key];
            const isRevealed = revealedIdentity[profile.key] ?? !profile.images.animated;
            return (
            <motion.div
              key={profile.key}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ duration: 0.2 }}
              onClick={() => onSelectProfile(profile)}
              className={`relative glass-panel rounded-2xl border p-5 cursor-pointer flex flex-col justify-between gap-3 transition-all duration-300 overflow-hidden ${getGlowClass(
                profile.key
              )}`}
              style={{
                borderColor: `${profile.colorHex}35`,
                background: `linear-gradient(160deg, ${profile.colorHex}12 0%, rgba(15,23,42,0.85) 45%)`,
              }}
              id={`card-emotion-${profile.key}`}
            >
              <div
                className="emotion-card-accent"
                style={{ backgroundColor: profile.colorHex, boxShadow: `0 0 12px ${profile.colorHex}` }}
              />

              {/* Sticky note */}
              <div
                className="self-start text-[9px] font-mono font-bold uppercase px-2 py-1 rounded rotate-[-1deg] border"
                style={{
                  backgroundColor: `${profile.colorHex}30`,
                  borderColor: `${profile.colorHex}50`,
                  color: profile.colorHex,
                }}
              >
                {details.stickyNote}
              </div>

              {/* Header inside Card */}
              <div className="flex items-center">
                <span
                  className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded border flex items-center gap-1.5"
                  style={{
                    backgroundColor: `${profile.colorHex}30`,
                    borderColor: `${profile.colorHex}70`,
                    color: profile.colorHex,
                    boxShadow: `0 0 10px ${profile.colorHex}25`,
                  }}
                >
                  {getEmotionIcon(profile.key)}
                  {profile.emotionName}
                </span>
              </div>

              {/* Interactive identity: animated character ↔ person photo */}
              <div onClick={(e) => e.stopPropagation()}>
                <EmotionCardIdentity
                  profile={profile}
                  revealed={isRevealed}
                  onToggle={(e) => toggleIdentity(profile.key, e)}
                />
              </div>

              {/* Trait pills — visible once identity is revealed */}
              {isRevealed && (
                <div className="flex flex-wrap gap-1">
                  {details.traits.map((trait) => (
                    <span
                      key={trait}
                      className="emotion-trait-pill"
                      style={{
                        backgroundColor: `${profile.colorHex}15`,
                        borderColor: `${profile.colorHex}40`,
                        color: profile.colorHex,
                      }}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Button */}
              <div
                className="flex items-center justify-between text-xs font-semibold pt-2 border-t text-slate-400 transition-colors"
                style={{ borderColor: `${profile.colorHex}20` }}
              >
                <span>Ver Ficha Técnica</span>
                <ChevronRight className="h-4 w-4" style={{ color: profile.colorHex }} />
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
