import React from "react";
import { EmotionalProfile } from "../types";
import { AnimatePresence, motion } from "motion/react";

interface EmotionCardIdentityProps {
  profile: EmotionalProfile;
  revealed: boolean;
  onToggle: (e: React.MouseEvent) => void;
}

export default function EmotionCardIdentity({
  profile,
  revealed,
  onToggle,
}: EmotionCardIdentityProps) {
  const hasAnimated = Boolean(profile.images.animated);

  return (
    <div className={revealed || !hasAnimated ? "min-h-0" : "min-h-[168px]"}>
      <AnimatePresence mode="wait">
        {!revealed && hasAnimated ? (
          <motion.button
            key="animated"
            type="button"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            onClick={onToggle}
            className="w-full flex flex-col items-center justify-center gap-2 py-2 cursor-pointer group"
            aria-label={`Activar procesador ${profile.emotionName}`}
          >
            <div
              className="relative flex items-center justify-center w-full h-44 rounded-xl border border-dashed transition-all group-hover:scale-[1.02]"
              style={{
                borderColor: `${profile.colorHex}50`,
                background: `radial-gradient(circle at center, ${profile.colorHex}18 0%, transparent 70%)`,
              }}
            >
              <img
                src={profile.images.animated}
                alt={`Personaje animado ${profile.emotionName}`}
                className="emotion-animated-float max-h-40 w-auto max-w-full object-contain drop-shadow-lg"
                style={{ filter: `drop-shadow(0 0 16px ${profile.colorHex}60)` }}
              />
            </div>
            <span
              className="text-[10px] font-mono uppercase tracking-wider opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ color: profile.colorHex }}
            >
              Toca para conocer al procesador
            </span>
          </motion.button>
        ) : (
          <motion.div
            key="identity"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-3"
          >
            <button
              type="button"
              onClick={hasAnimated ? onToggle : undefined}
              className={`relative w-full rounded-xl group ${hasAnimated ? "cursor-pointer" : "cursor-default"}`}
              title={hasAnimated ? "Volver al personaje animado" : undefined}
            >
              <div
                className="flex items-center justify-center w-full min-h-[230px] rounded-xl px-2 py-3"
                style={{
                  background: `radial-gradient(ellipse at center, ${profile.colorHex}20 0%, rgba(15,23,42,0.95) 70%)`,
                  boxShadow: `inset 0 0 0 1px ${profile.colorHex}25`,
                }}
              >
                <img
                  src={profile.images.corporate}
                  alt={profile.name}
                  className="max-w-full max-h-[220px] w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    filter: `drop-shadow(0 4px 20px ${profile.colorHex}35)`,
                  }}
                />
              </div>
              {hasAnimated && (
                <span
                  className="absolute top-2 right-2 text-[8px] font-mono uppercase px-2 py-0.5 rounded-full border backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    backgroundColor: `${profile.colorHex}25`,
                    borderColor: `${profile.colorHex}50`,
                    color: profile.colorHex,
                  }}
                >
                  Ver personaje
                </span>
              )}
            </button>

            <div className="px-0.5">
              <h4 className="text-base font-semibold text-white leading-tight">{profile.name}</h4>
              <p
                className="text-[11px] font-medium mt-0.5"
                style={{ color: `${profile.colorHex}cc` }}
              >
                {profile.role}
              </p>
            </div>

            <blockquote
              className="text-xs text-slate-300 italic leading-relaxed px-3 py-2.5 rounded-lg"
              style={{
                backgroundColor: `${profile.colorHex}08`,
              }}
            >
              &ldquo;{profile.quote}&rdquo;
            </blockquote>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
