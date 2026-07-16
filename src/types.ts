export enum EmotionKey {
  Alegria = "alegria",
  Ansiedad = "ansiedad",
  Calma = "calma",
  Desagrado = "desagrado",
  Nostalgia = "nostalgia",
  Furia = "furia"
}

export interface Pet {
  name: string;
  species: string;
  description: string;
  imageUrl: string;
}

export interface ProfileLog {
  id: string;
  timestamp: string;
  message: string;
  category: "calidad" | "ambiental" | "sst" | "seguridad_vial" | "general";
}

export interface TechnicalSheet {
  subtitle?: string;
  introQuote: string;
  presentation: {
    funciones: string[];
    mascotas?: string;
    datoCurioso?: string;
  };
  missionItems?: string[];
  mission?: string;
  motivation: string[];
  valores?: string[];
  sobreMi?: {
    generoMusical?: string;
    comidaFavorita?: string;
    colorFavorito?: string;
    fraseCaracteriza?: string;
    generoTvSerie?: string;
    anecdota?: string;
    lugarDeseado?: string;
  };
  footerMessage: string;
  layout?: "console" | "headquarters";
}

export interface EmotionalProfile {
  key: EmotionKey;
  name: string;
  emotionName: string;
  role: string;
  experience: string;
  education?: string;
  quote: string;
  colorHex: string;
  colorClasses: {
    text: string;
    bg: string;
    border: string;
    glow: string;
    accent: string;
    gradient: string;
  };
  stats: {
    cycles: string;
    stability: number;
    extraLabel?: string;
    extraValue?: string;
  };
  parameters: {
    empathy: number;
    riskBarrier: number;
    changeTolerance: number;
    responseSpeed: number;
  };
  pets: Pet;
  familyDetails?: string;
  customDetails?: {
    label: string;
    value: string;
  }[];
  images: {
    corporate: string;
    animated?: string;
    childhood?: string;
    team?: string;
    secondary?: string;
    labels?: {
      childhood?: string;
      team?: string;
      secondary?: string;
      mascotas?: string;
    };
  };
  logs: ProfileLog[];
  technicalSheet?: TechnicalSheet;
}

export interface SGIState {
  calidad: number;
  ambiental: number;
  sst: number;
  seguridadVial: number;
  efficiencyIndex: number;
  systemStability: number;
}
