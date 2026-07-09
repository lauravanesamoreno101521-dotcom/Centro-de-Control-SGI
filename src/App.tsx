import React, { useState, useEffect } from "react";
import SGIHeader from "./components/SGIHeader";
import Dashboard from "./components/Dashboard";
import ProfilePage from "./components/ProfilePage";
import { initialProfiles, initialSGIState } from "./data";
import { EmotionalProfile, EmotionKey, SGIState, ProfileLog } from "./types";
import { AnimatePresence, motion } from "motion/react";
import { Bell, Check, Info, ShieldCheck } from "lucide-react";

// Storage keys
const PROFILES_STORAGE_KEY = "sgi_emotional_profiles_v1";
const SYSTEM_STORAGE_KEY = "sgi_system_state_v1";

// Helper to calculate SGI metrics based on profile parameters
const calculateSGIState = (currentProfiles: EmotionalProfile[]): SGIState => {
  const findP = (key: EmotionKey) =>
    currentProfiles.find((p) => p.key === key)?.parameters || {
      empathy: 50,
      riskBarrier: 50,
      changeTolerance: 50,
      responseSpeed: 50,
    };

  const pAlegria = findP(EmotionKey.Alegria);
  const pAnsiedad = findP(EmotionKey.Ansiedad);
  const pCalma = findP(EmotionKey.Calma);
  const pDesagrado = findP(EmotionKey.Desagrado);
  const pNostalgia = findP(EmotionKey.Nostalgia);
  const pFuria = findP(EmotionKey.Furia);

  // Calidad (ISO 9001)
  const calidad = Math.round(
    pAlegria.empathy * 0.35 + pDesagrado.riskBarrier * 0.4 + pCalma.responseSpeed * 0.25
  );

  // Ambiental (ISO 14001)
  const ambiental = Math.round(
    pCalma.empathy * 0.4 + pNostalgia.changeTolerance * 0.3 + pDesagrado.responseSpeed * 0.3
  );

  // SST (ISO 45001)
  const sst = Math.round(
    pFuria.riskBarrier * 0.5 + pAnsiedad.riskBarrier * 0.3 + pAnsiedad.responseSpeed * 0.2
  );

  // Seguridad Vial (PESV)
  const seguridadVial = Math.round(
    pFuria.responseSpeed * 0.3 + pAlegria.changeTolerance * 0.3 + pAnsiedad.riskBarrier * 0.4
  );

  const clamp = (val: number) => Math.min(100, Math.max(60, val));

  const finalCalidad = clamp(calidad);
  const finalAmbiental = clamp(ambiental);
  const finalSst = clamp(sst);
  const finalVial = clamp(seguridadVial);

  const efficiencyIndex = Math.round(
    (finalCalidad + finalAmbiental + finalSst + finalVial) / 4
  );
  
  // Overall stability is the average stability parameter of the active profiles
  const systemStability = Math.round(
    currentProfiles.reduce((acc, p) => acc + p.stats.stability, 0) / currentProfiles.length
  );

  return {
    calidad: finalCalidad,
    ambiental: finalAmbiental,
    sst: finalSst,
    seguridadVial: finalVial,
    efficiencyIndex,
    systemStability,
  };
};

const PROFILE_ORDER: EmotionKey[] = [
  EmotionKey.Alegria,
  EmotionKey.Ansiedad,
  EmotionKey.Calma,
  EmotionKey.Furia,
  EmotionKey.Desagrado,
  EmotionKey.Nostalgia,
];

const sortProfiles = (profiles: EmotionalProfile[]): EmotionalProfile[] =>
  PROFILE_ORDER.map((key) => profiles.find((p) => p.key === key)).filter(
    (p): p is EmotionalProfile => Boolean(p)
  );

const syncProfileTheme = (saved: EmotionalProfile[]): EmotionalProfile[] =>
  sortProfiles(
    saved.map((p) => {
    const initial = initialProfiles.find((ip) => ip.key === p.key);
    if (!initial) return p;
    return {
      ...p,
      name: initial.name,
      emotionName: initial.emotionName,
      colorHex: initial.colorHex,
      colorClasses: initial.colorClasses,
      technicalSheet: initial.technicalSheet ?? p.technicalSheet,
      pets: initial.pets ?? p.pets,
      role: initial.role,
      experience: initial.experience,
      quote: initial.quote,
      images: {
        corporate: initial.images.corporate,
        animated: initial.images.animated,
        childhood: initial.images.childhood,
        team: initial.images.team,
        secondary: initial.images.secondary,
        labels: initial.images.labels,
      },
    };
  })
  );

export default function App() {
  const [profiles, setProfiles] = useState<EmotionalProfile[]>([]);
  const [systemState, setSystemState] = useState<SGIState>(initialSGIState);
  const [activeProfile, setActiveProfile] = useState<EmotionalProfile | null>(null);
  
  // Toast notifications for user feedback
  const [notifications, setNotifications] = useState<{ id: string; text: string; type: "success" | "info" }[]>([]);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
    const savedSystem = localStorage.getItem(SYSTEM_STORAGE_KEY);

    if (savedProfiles) {
      try {
        const parsed = syncProfileTheme(JSON.parse(savedProfiles) as EmotionalProfile[]);
        setProfiles(parsed);
        setSystemState(calculateSGIState(parsed));
        localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(parsed));
        localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(parsed));
      } catch (e) {
        setProfiles(initialProfiles);
        setSystemState(initialSGIState);
      }
    } else {
      setProfiles(initialProfiles);
      setSystemState(initialSGIState);
    }
  }, []);

  // Sync state with localStorage whenever changes occur
  const saveStateToStorage = (updatedProfiles: EmotionalProfile[]) => {
    localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
    const nextSystem = calculateSGIState(updatedProfiles);
    setSystemState(nextSystem);
    localStorage.setItem(SYSTEM_STORAGE_KEY, JSON.stringify(nextSystem));
  };

  const addNotification = (text: string, type: "success" | "info" = "success") => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  // Reset SGI values back to defaults
  const handleResetSystem = () => {
    localStorage.removeItem(PROFILES_STORAGE_KEY);
    localStorage.removeItem(SYSTEM_STORAGE_KEY);
    setProfiles(initialProfiles);
    setSystemState(initialSGIState);
    if (activeProfile) {
      const resetProfile = initialProfiles.find((p) => p.key === activeProfile.key);
      if (resetProfile) setActiveProfile(resetProfile);
    }
    addNotification("Servidores SGI re-sincronizados con éxito.", "info");
  };

  // Update a profile's tuning parameters (sliders)
  const handleUpdateParameters = (key: EmotionKey, nextParams: EmotionalProfile["parameters"]) => {
    const updated = profiles.map((p) => {
      if (p.key === key) {
        // Recalculate stability metric based on parameter dispersion (hyper-extreme adjustments lower stability)
        const diff = Math.abs(nextParams.empathy - 50) + Math.abs(nextParams.riskBarrier - 50);
        const nextStability = Math.min(100, Math.max(70, 100 - diff * 0.15));

        return {
          ...p,
          parameters: nextParams,
          stats: {
            ...p.stats,
            stability: Math.round(nextStability * 10) / 10,
          },
        };
      }
      return p;
    });

    setProfiles(updated);
    saveStateToStorage(updated);

    // Keep active profile view synchronized with modified parameters
    if (activeProfile && activeProfile.key === key) {
      const match = updated.find((p) => p.key === key);
      if (match) setActiveProfile(match);
    }
  };

  // Add event logs inside the profile view
  const handleAddLog = (key: EmotionKey, logInput: Omit<ProfileLog, "id" | "timestamp">) => {
    const timestamp = new Date().toLocaleTimeString("es-ES", { hour12: false }) + " (Hoy)";
    const newLogItem: ProfileLog = {
      id: "user-" + Date.now().toString(),
      timestamp,
      message: logInput.message,
      category: logInput.category,
    };

    const updated = profiles.map((p) => {
      if (p.key === key) {
        return {
          ...p,
          logs: [newLogItem, ...p.logs],
        };
      }
      return p;
    });

    setProfiles(updated);
    saveStateToStorage(updated);

    // Sync active profile
    if (activeProfile && activeProfile.key === key) {
      const match = updated.find((p) => p.key === key);
      if (match) setActiveProfile(match);
    }

    addNotification(`Acción de ${logInput.category.toUpperCase().replace("_", " ")} registrada.`);
  };

  // Delete a log item
  const handleDeleteLog = (key: EmotionKey, logId: string) => {
    const updated = profiles.map((p) => {
      if (p.key === key) {
        return {
          ...p,
          logs: p.logs.filter((log) => log.id !== logId),
        };
      }
      return p;
    });

    setProfiles(updated);
    saveStateToStorage(updated);

    if (activeProfile && activeProfile.key === key) {
      const match = updated.find((p) => p.key === key);
      if (match) setActiveProfile(match);
    }

    addNotification("Registro HSEQ eliminado.", "info");
  };

  // Trigger simulated audit surprise from the dashboard
  const handleTriggerAudit = (subsystem: keyof SGIState) => {
    const nameMap: Record<string, string> = {
      calidad: "Calidad ISO 9001",
      ambiental: "Gestión Ambiental ISO 14001",
      sst: "Salud y Seguridad en el Trabajo ISO 45001",
      seguridadVial: "Seguridad Vial PESV",
    };

    // Calculate a temporary change or simulation result
    addNotification(`Iniciando simulación de auditoría para ${nameMap[subsystem]}...`, "info");

    setTimeout(() => {
      // Small random boost or delta to show activity
      const boost = Math.floor(Math.random() * 4) + 1;
      
      setSystemState((prev) => {
        const currentVal = prev[subsystem] as number;
        const newVal = Math.min(100, currentVal + boost);
        return {
          ...prev,
          [subsystem]: newVal,
          efficiencyIndex: Math.round(
            (prev.calidad + prev.ambiental + prev.sst + prev.seguridadVial + boost) / 4
          ),
        };
      });

      addNotification(`¡Auditoría aprobada! El subsistema ${nameMap[subsystem]} subió +${boost}%.`, "success");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] flex flex-col justify-between" id="applet-viewport">
      {/* Top Banner and System indicators */}
      <SGIHeader onResetSystem={handleResetSystem} />

      {/* Main Container */}
      <main className="flex-1 pb-12">
        <AnimatePresence mode="wait">
          {activeProfile ? (
            <motion.div
              key="profile-view"
              initial={{ opacity: 0, x: 15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -15 }}
              transition={{ duration: 0.25 }}
            >
              <ProfilePage
                profile={activeProfile}
                onBack={() => setActiveProfile(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="dashboard-view"
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 15 }}
              transition={{ duration: 0.25 }}
            >
              <Dashboard
                profiles={profiles}
                onSelectProfile={(p) => setActiveProfile(p)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-4 px-6 text-center text-slate-500 text-xs font-mono flex flex-col md:flex-row md:justify-between items-center gap-2 max-w-6xl mx-auto w-full">
        <span>&copy; {new Date().getFullYear()} Centro de Control SGI. Todos los derechos reservados.</span>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            Certificaciones HSEQ Vigentes
          </span>
          <span className="text-[10px] bg-slate-900 border border-white/5 px-2 py-0.5 rounded text-indigo-400">
            HSEQ-SYSTEM ACTIVE
          </span>
        </div>
      </footer>

      {/* Floating toast notifications stack */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none" id="toast-notifications-container">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="pointer-events-auto bg-slate-950 border border-white/10 rounded-xl p-3.5 shadow-2xl flex items-start gap-3 glow-indigo"
            >
              <div className={`p-1 rounded-lg shrink-0 ${notif.type === "success" ? "bg-emerald-500/10 text-emerald-400" : "bg-indigo-500/10 text-indigo-400"}`}>
                {notif.type === "success" ? <Check className="h-4 w-4" /> : <Info className="h-4 w-4" />}
              </div>
              <div className="flex-1">
                <p className="text-xs text-slate-200 font-medium leading-relaxed">
                  {notif.text}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
