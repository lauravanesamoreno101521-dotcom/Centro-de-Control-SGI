import React from "react";
import {
  Briefcase,
  Clock,
  ClipboardList,
  PawPrint,
  Sparkles,
  Music,
  Utensils,
  Palette,
  MessageCircle,
  Tv,
  Target,
  Star,
  Heart,
  Users,
  Globe,
  Award,
} from "lucide-react";
import { EmotionalProfile, TechnicalSheet } from "../types";

interface TechnicalSheetViewProps {
  profile: EmotionalProfile;
}

const buildFallbackSheet = (profile: EmotionalProfile): TechnicalSheet => ({
  introQuote: `Soy ${profile.emotionName}. ${profile.familyDetails || profile.quote}`,
  presentation: {
    funciones: profile.customDetails?.map((d) => `${d.label}: ${d.value}`) || [profile.role],
    mascotas: profile.pets.name,
  },
  motivation: [profile.stats.extraValue || "Compromiso con el SGI"],
  footerMessage: `EN EL SGI, ${profile.emotionName.toUpperCase()} GUÍA NUESTROS PROCESOS HSEQ.`,
  sobreMi: {
    fraseCaracteriza: profile.quote,
  },
});

function Panel({
  title,
  children,
  colorHex,
  className = "",
}: {
  title: string;
  children: React.ReactNode;
  colorHex: string;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl p-4 border backdrop-blur-sm ${className}`}
      style={{
        borderColor: `${colorHex}50`,
        background: `linear-gradient(145deg, ${colorHex}12 0%, rgba(15,23,42,0.92) 60%)`,
        boxShadow: `0 0 24px -8px ${colorHex}40`,
      }}
    >
      <h4
        className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-3"
        style={{ color: colorHex }}
      >
        {title}
      </h4>
      {children}
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
  colorHex,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  colorHex: string;
}) {
  return (
    <div className="flex items-start gap-2 text-xs">
      <Icon className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: colorHex }} />
      <div>
        <span className="text-slate-500 font-mono text-[10px] uppercase block">{label}</span>
        <span className="text-slate-200 leading-relaxed">{value}</span>
      </div>
    </div>
  );
}

function GalleryPhoto({
  src,
  alt,
  borderColor,
  aspect = "landscape",
}: {
  src: string;
  alt: string;
  borderColor: string;
  aspect?: "landscape" | "portrait" | "square";
}) {
  const aspectClass =
    aspect === "portrait"
      ? "aspect-[3/4] min-h-[320px] max-h-[480px]"
      : aspect === "square"
        ? "aspect-square min-h-[300px] max-h-[480px]"
        : "aspect-[4/3] min-h-[280px] max-h-[420px]";

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden border bg-slate-950/90 ${aspectClass}`}
      style={{ borderColor }}
    >
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-contain object-center"
      />
    </div>
  );
}

type GallerySlide = {
  kind: "infancia" | "familia" | "extra" | "mascotas";
  src: string;
  title: string;
  aspect: "landscape" | "portrait" | "square";
  borderColor: string;
  titleColor: string;
};

function buildGallerySlides(profile: EmotionalProfile, colorHex: string): GallerySlide[] {
  const labels = profile.images.labels ?? {};
  const slides: GallerySlide[] = [];

  const infanciaSrc =
    profile.images.childhood ??
    (labels.secondary === "Infancia" || labels.secondary === "Mi infancia"
      ? profile.images.secondary
      : undefined);

  const extraSrc =
    profile.images.secondary &&
    labels.secondary !== "Infancia" &&
    labels.secondary !== "Mi infancia"
      ? profile.images.secondary
      : undefined;

  if (infanciaSrc) {
    slides.push({
      kind: "infancia",
      src: infanciaSrc,
      title: labels.childhood ?? (labels.secondary === "Infancia" || labels.secondary === "Mi infancia" ? labels.secondary : "Mi infancia"),
      aspect: "portrait",
      borderColor: `${colorHex}40`,
      titleColor: colorHex,
    });
  }

  if (profile.images.team) {
    slides.push({
      kind: "familia",
      src: profile.images.team,
      title: labels.team ?? "Mi familia",
      aspect: "landscape",
      borderColor: "#38bdf850",
      titleColor: "#38bdf8",
    });
  }

  if (extraSrc) {
    slides.push({
      kind: "extra",
      src: extraSrc,
      title: labels.secondary ?? "Mi pequeña",
      aspect: "portrait",
      borderColor: "#c084fc50",
      titleColor: "#c084fc",
    });
  }

  if (profile.pets.imageUrl) {
    slides.push({
      kind: "mascotas",
      src: profile.pets.imageUrl,
      title: labels.mascotas ?? "Mis mascotas",
      aspect: "landscape",
      borderColor: `${colorHex}40`,
      titleColor: colorHex,
    });
  }

  return slides;
}

export default function TechnicalSheetView({ profile }: TechnicalSheetViewProps) {
  const sheet = profile.technicalSheet || buildFallbackSheet(profile);
  const c = profile.colorHex;

  return (
    <div className="space-y-5" id={`technical-sheet-${profile.key}`}>
      {/* Header tipo cartel HQ */}
      <div
        className="relative overflow-hidden rounded-2xl border p-5 md:p-6"
        style={{
          borderColor: `${c}55`,
          background: `radial-gradient(ellipse at top, ${c}22 0%, rgba(11,15,25,0.98) 55%)`,
          boxShadow: `0 0 40px -10px ${c}50`,
        }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1"
          style={{ background: `linear-gradient(90deg, transparent, ${c}, transparent)` }}
        />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2">
          <div>
            <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-1">
              Ficha Técnica SGI — Procesador Emocional
            </p>
            <h2 className="font-display font-bold text-xl md:text-2xl text-white uppercase tracking-wide">
              {profile.name}
            </h2>
            {sheet.subtitle && (
              <p className="text-xs mt-1 italic" style={{ color: `${c}cc` }}>
                {sheet.subtitle}
              </p>
            )}
          </div>
          <h3
            className="font-display font-bold text-3xl md:text-5xl uppercase tracking-tight"
            style={{
              color: c,
              textShadow: `0 0 20px ${c}80, 0 0 40px ${c}40`,
            }}
          >
            {profile.emotionName}
          </h3>
        </div>
      </div>

      {/* Grid principal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Columna izquierda */}
        <div className="lg:col-span-3 space-y-4">
          <Panel title="Puede decir" colorHex={c}>
            <p className="text-xs text-slate-300 italic leading-relaxed">&ldquo;{sheet.introQuote}&rdquo;</p>
          </Panel>

          {sheet.mission && (
            <Panel title="Mi misión" colorHex={c}>
              <p className="text-xs text-white font-semibold leading-relaxed">{sheet.mission}</p>
            </Panel>
          )}

          {sheet.missionItems && (
            <div className="space-y-2">
              {sheet.missionItems.map((item) => (
                <div
                  key={item}
                  className="text-[10px] font-mono font-bold uppercase text-center px-3 py-2 rounded-xl border"
                  style={{
                    color: c,
                    borderColor: `${c}50`,
                    backgroundColor: `${c}15`,
                    boxShadow: `0 0 12px ${c}25`,
                  }}
                >
                  <Target className="h-3 w-3 inline mr-1.5 -mt-0.5" />
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Centro — imagen hero */}
        <div className="lg:col-span-5 space-y-4">
          <div
            className="relative rounded-2xl overflow-hidden border min-h-[280px] flex items-center justify-center p-3"
            style={{
              borderColor: `${c}45`,
              background: `radial-gradient(circle at center, ${c}18 0%, rgba(15,23,42,0.95) 70%)`,
            }}
          >
            <img
              src={profile.images.corporate}
              alt={profile.name}
              className="max-h-[320px] w-auto max-w-full object-contain rounded-xl"
              style={{ filter: `drop-shadow(0 8px 24px ${c}45)` }}
            />
            {profile.images.animated && (
              <img
                src={profile.images.animated}
                alt={profile.emotionName}
                className="absolute bottom-3 right-3 h-20 w-auto object-contain opacity-90"
                style={{ filter: `drop-shadow(0 0 12px ${c}60)` }}
              />
            )}
          </div>

          {sheet.sobreMi && (
            <Panel title="Sobre mí" colorHex={c}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sheet.sobreMi.generoMusical && (
                  <InfoRow icon={Music} label="Género musical" value={sheet.sobreMi.generoMusical} colorHex={c} />
                )}
                {sheet.sobreMi.comidaFavorita && (
                  <InfoRow icon={Utensils} label="Comida favorita" value={sheet.sobreMi.comidaFavorita} colorHex={c} />
                )}
                {sheet.sobreMi.colorFavorito && (
                  <InfoRow icon={Palette} label="Color" value={sheet.sobreMi.colorFavorito} colorHex={c} />
                )}
                {sheet.sobreMi.generoTvSerie && (
                  <InfoRow icon={Tv} label="TV / Series" value={sheet.sobreMi.generoTvSerie} colorHex={c} />
                )}
                {sheet.sobreMi.fraseCaracteriza && (
                  <InfoRow icon={MessageCircle} label="Frase que la caracteriza" value={sheet.sobreMi.fraseCaracteriza} colorHex={c} />
                )}
                {sheet.sobreMi.lugarDeseado && (
                  <InfoRow icon={Globe} label="Lugar que le gustaría conocer" value={sheet.sobreMi.lugarDeseado} colorHex={c} />
                )}
                {sheet.sobreMi.anecdota && sheet.layout !== "headquarters" && (
                  <InfoRow icon={Sparkles} label="Anécdota en la empresa" value={sheet.sobreMi.anecdota} colorHex={c} />
                )}
              </div>
            </Panel>
          )}
        </div>

        {/* Columna derecha */}
        <div className="lg:col-span-4 space-y-4">
          <Panel title="Presentación" colorHex={c}>
            <div className="space-y-3">
              <InfoRow icon={Briefcase} label="Cargo" value={profile.role} colorHex={c} />
              <InfoRow icon={Clock} label="Tiempo en la empresa" value={profile.experience} colorHex={c} />
              <div className="flex items-start gap-2 text-xs">
                <ClipboardList className="h-3.5 w-3.5 shrink-0 mt-0.5" style={{ color: c }} />
                <div>
                  <span className="text-slate-500 font-mono text-[10px] uppercase block">Funciones</span>
                  <ul className="text-slate-200 leading-relaxed list-disc list-inside space-y-0.5">
                    {sheet.presentation.funciones.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
              {sheet.presentation.mascotas && (
                <InfoRow icon={PawPrint} label="Mascotas" value={sheet.presentation.mascotas} colorHex={c} />
              )}
              {sheet.presentation.datoCurioso && (
                <InfoRow icon={Sparkles} label="Dato curioso" value={sheet.presentation.datoCurioso} colorHex={c} />
              )}
            </div>
          </Panel>

          <Panel title="Lo que me motiva" colorHex="#22d3ee">
            <ul className="space-y-2">
              {sheet.motivation.map((m) => (
                <li key={m} className="flex items-start gap-2 text-xs text-slate-200">
                  <Star className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  {m}
                </li>
              ))}
            </ul>
          </Panel>

          {sheet.valores && (
            <Panel title="Mis valores" colorHex={c}>
              <div className="flex flex-wrap gap-2">
                {sheet.valores.map((v) => (
                  <span
                    key={v}
                    className="text-[9px] font-mono font-bold uppercase px-2.5 py-1 rounded-lg border"
                    style={{
                      color: c,
                      borderColor: `${c}45`,
                      backgroundColor: `${c}12`,
                    }}
                  >
                    <Award className="h-3 w-3 inline mr-1 -mt-0.5" />
                    {v}
                  </span>
                ))}
              </div>
            </Panel>
          )}

          {profile.pets.imageUrl && sheet.layout !== "headquarters" && (
          <Panel title="Mascotas / Co-terapeutas" colorHex={c}>
            <img
              src={profile.pets.imageUrl}
              alt={profile.pets.name}
              className="w-full h-48 object-cover rounded-xl border mb-2"
              style={{ borderColor: `${c}35` }}
            />
            <p className="text-sm font-semibold text-white">{profile.pets.name}</p>
            <p className="text-[10px] text-slate-400 italic">{profile.pets.species}</p>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{profile.pets.description}</p>
          </Panel>
          )}
        </div>
      </div>

      {/* Galería de imágenes: Infancia → Familia/Hijas → Mascotas */}
      {sheet.layout === "headquarters" && (() => {
        const slides = buildGallerySlides(profile, c);
        if (slides.length === 0) return null;
        const cols =
          slides.length === 2
            ? "md:grid-cols-2"
            : slides.length >= 4
              ? "md:grid-cols-2 lg:grid-cols-4"
              : "md:grid-cols-3";
        return (
          <div
            className={`grid grid-cols-1 ${cols} gap-4 rounded-2xl p-4 border`}
            style={{
              borderColor: `${c}50`,
              background: `linear-gradient(145deg, ${c}12 0%, rgba(15,23,42,0.92) 60%)`,
              boxShadow: `0 0 24px -8px ${c}40`,
            }}
          >
            {slides.map((slide) => (
              <div key={`${slide.kind}-${slide.src}`} className="flex flex-col">
                <h4
                  className="text-[10px] font-mono font-bold uppercase tracking-[0.15em] mb-3"
                  style={{ color: slide.titleColor }}
                >
                  {slide.title}
                </h4>
                <GalleryPhoto
                  src={slide.src}
                  alt={slide.title}
                  borderColor={slide.borderColor}
                  aspect={slide.aspect}
                />
              </div>
            ))}
          </div>
        );
      })()}

      {/* Barra inferior estilo Ansiedad (headquarters) */}
      {sheet.layout === "headquarters" && sheet.sobreMi && (
        <div
          className="rounded-2xl border p-4 overflow-x-auto"
          style={{
            borderColor: `${c}45`,
            background: `linear-gradient(90deg, ${c}10, rgba(15,23,42,0.95), ${c}10)`,
          }}
        >
          <p className="text-[10px] font-mono font-bold uppercase tracking-widest mb-3 text-center" style={{ color: c }}>
            Cosas que me definen
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {sheet.sobreMi.anecdota && (
              <div className="text-center px-2">
                <Sparkles className="h-4 w-4 mx-auto mb-1" style={{ color: c }} />
                <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Anécdota</p>
                <p className="text-sm text-slate-200 leading-snug">{sheet.sobreMi.anecdota}</p>
              </div>
            )}
            {sheet.sobreMi.colorFavorito && (
              <div className="text-center px-2">
                <Palette className="h-4 w-4 mx-auto mb-1" style={{ color: c }} />
                <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Color</p>
                <p className="text-sm text-slate-200">{sheet.sobreMi.colorFavorito}</p>
              </div>
            )}
            {sheet.sobreMi.generoMusical && (
              <div className="text-center px-2">
                <Music className="h-4 w-4 mx-auto mb-1" style={{ color: c }} />
                <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Música</p>
                <p className="text-sm text-slate-200 leading-snug">{sheet.sobreMi.generoMusical}</p>
              </div>
            )}
            {sheet.sobreMi.generoTvSerie && (
              <div className="text-center px-2">
                <Tv className="h-4 w-4 mx-auto mb-1" style={{ color: c }} />
                <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Series</p>
                <p className="text-sm text-slate-200 leading-snug">{sheet.sobreMi.generoTvSerie}</p>
              </div>
            )}
            {sheet.sobreMi.comidaFavorita && (
              <div className="text-center px-2">
                <Utensils className="h-4 w-4 mx-auto mb-1" style={{ color: c }} />
                <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Comida</p>
                <p className="text-sm text-slate-200">{sheet.sobreMi.comidaFavorita}</p>
              </div>
            )}
            {sheet.sobreMi.fraseCaracteriza && (
              <div className="text-center px-2">
                <MessageCircle className="h-4 w-4 mx-auto mb-1" style={{ color: c }} />
                <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Frase</p>
                <p className="text-sm text-slate-200 italic">&ldquo;{sheet.sobreMi.fraseCaracteriza}&rdquo;</p>
              </div>
            )}
            {sheet.sobreMi.lugarDeseado && (
              <div className="text-center px-2">
                <Globe className="h-4 w-4 mx-auto mb-1" style={{ color: c }} />
                <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Lugar soñado</p>
                <p className="text-sm text-slate-200">{sheet.sobreMi.lugarDeseado}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer banner */}
      <div
        className="rounded-2xl border px-5 py-4 flex items-center justify-center gap-3 text-center"
        style={{
          borderColor: `${c}50`,
          background: `linear-gradient(90deg, ${c}15, rgba(15,23,42,0.9), ${c}15)`,
          boxShadow: `0 0 30px -10px ${c}45`,
        }}
      >
        <Heart className="h-4 w-4 shrink-0" style={{ color: c }} />
        <p className="text-[11px] font-mono font-bold uppercase tracking-wide" style={{ color: c }}>
          {sheet.footerMessage}
        </p>
        <Users className="h-4 w-4 shrink-0" style={{ color: c }} />
      </div>
    </div>
  );
}
