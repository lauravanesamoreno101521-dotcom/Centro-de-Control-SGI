import React from "react";
import { ArrowLeft } from "lucide-react";
import { EmotionalProfile } from "../types";
import { motion } from "motion/react";
import TechnicalSheetView from "./TechnicalSheetView";

interface ProfilePageProps {
  profile: EmotionalProfile;
  onBack: () => void;
}

export default function ProfilePage({ profile, onBack }: ProfilePageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto px-4 py-6"
      id={`profile-container-${profile.key}`}
    >
      <div className="mb-6">
        <button
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white bg-slate-900 border border-white/5 hover:border-white/10 px-3.5 py-2 rounded-xl cursor-pointer transition-all duration-200"
          id="profile-back-btn"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          REGRESAR AL PANEL PRINCIPAL
        </button>
      </div>

      <div id="panel-tecnico">
        <TechnicalSheetView profile={profile} />
      </div>
    </motion.div>
  );
}
