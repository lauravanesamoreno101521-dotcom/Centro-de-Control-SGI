import React, { useState } from "react";
import { CheckCircle2, RefreshCw, Award, ArrowRight, ArrowLeft, Heart, AlertTriangle } from "lucide-react";
import { EmotionKey } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface DiagnosticWizardProps {
  onActivateModule: (key: EmotionKey) => void;
  emotionNames: Record<EmotionKey, string>;
  emotionColors: Record<EmotionKey, string>;
}

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    key: EmotionKey;
    desc: string;
  }[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Cómo calificarías el nivel de orden, aseo y cumplimiento estético en tu entorno de trabajo actual?",
    options: [
      { text: "Óptimo y limpio", key: EmotionKey.Alegria, desc: "Me inspira energía y motivación para colaborar con el equipo." },
      { text: "Suficiente pero mejorable", key: EmotionKey.Calma, desc: "Prefiero un ambiente pacífico y sin ruidos innecesarios." },
      { text: "Me causa molestia visual", key: EmotionKey.Desagrado, desc: "La falta de higiene y simetría altera mi concentración." },
      { text: "Requiere control inmediato", key: EmotionKey.Furia, desc: "Es un acto inseguro y una falta de disciplina intolerable." }
    ]
  },
  {
    id: 2,
    text: "¿Cuál es tu primer pensamiento al enterarte de una auditoría interna de control documental?",
    options: [
      { text: "¡Preparación absoluta!", key: EmotionKey.Ansiedad, desc: "Reviso todas las matrices 4 veces por si hay alguna inconsistencia." },
      { text: "Confianza en el histórico", key: EmotionKey.Nostalgia, desc: "Nuestras lecciones aprendidas nos respaldan, todo está documentado." },
      { text: "Calma analítica", key: EmotionKey.Calma, desc: "Es una gran oportunidad para pulir y balancear nuestros flujos." },
      { text: "Entusiasmo colaborativo", key: EmotionKey.Alegria, desc: "¡Genial! Vamos a mostrar el excelente desempeño HSEQ de nuestra área." }
    ]
  },
  {
    id: 3,
    text: "Si observas a un compañero omitiendo el uso de sus Elementos de Protección Personal (EPP):",
    options: [
      { text: "Detención y exigencia", key: EmotionKey.Furia, desc: "Exijo el uso correcto de inmediato; la seguridad de la vida no se negocia." },
      { text: "Preocupación inmediata", key: EmotionKey.Ansiedad, desc: "Siento inquietud por su bienestar y le pido con prisa que se proteja." },
      { text: "Disgusto profesional", key: EmotionKey.Desagrado, desc: "Me desagrada ver conductas descuidadas que rompen las normas de calidad." },
      { text: "Consejo reflexivo", key: EmotionKey.Nostalgia, desc: "Le recuerdo con cariño que su familia lo espera sano y salvo en casa." }
    ]
  },
  {
    id: 4,
    text: "¿Cuál de estas actividades prefieres para recuperar el equilibrio después de un reto laboral severo?",
    options: [
      { text: "Compartir y festejar", key: EmotionKey.Alegria, desc: "Hornear bizcochuelos, reír con amigos o planear actividades dinámicas." },
      { text: "Reflexión y descanso", key: EmotionKey.Calma, desc: "Luz tenue, música lo-fi, té caliente y caricias a mis mascotas en silencio." },
      { text: "Lectura y melancolía", key: EmotionKey.Nostalgia, desc: "Ver documentales antiguos, fotos de época o escuchar discos clásicos." },
      { text: "Deporte de alta intensidad", key: EmotionKey.Furia, desc: "Liberar toda la tensión acumulada mediante actividad física rigurosa." }
    ]
  }
];

export default function DiagnosticWizard({ onActivateModule, emotionNames, emotionColors }: DiagnosticWizardProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, EmotionKey>>({});
  const [result, setResult] = useState<EmotionKey | null>(null);

  const handleSelectOption = (key: EmotionKey) => {
    setAnswers({ ...answers, [currentStep]: key });
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate recommended module (most selected emotion)
      const counts: Record<EmotionKey, number> = {
        [EmotionKey.Alegria]: 0,
        [EmotionKey.Ansiedad]: 0,
        [EmotionKey.Calma]: 0,
        [EmotionKey.Desagrado]: 0,
        [EmotionKey.Nostalgia]: 0,
        [EmotionKey.Furia]: 0,
      };

      (Object.values(answers) as EmotionKey[]).forEach((key) => {
        counts[key] = (counts[key] || 0) + 1;
      });

      // Find key with highest count
      let recommended: EmotionKey = EmotionKey.Calma;
      let maxCount = -1;
      (Object.keys(counts) as EmotionKey[]).forEach((key) => {
        if (counts[key] > maxCount) {
          maxCount = counts[key];
          recommended = key;
        }
      });

      setResult(recommended);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="glass-panel rounded-2xl border border-white/10 overflow-hidden shadow-2xl" id="diagnostic-card-wizard">
      <div className="bg-gradient-to-r from-indigo-950/40 via-slate-900/60 to-purple-950/40 px-6 py-4 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-indigo-400 animate-pulse" />
          <h3 className="font-display font-semibold text-white text-sm uppercase tracking-wider">
            Evaluación de Clima Emocional SGI
          </h3>
        </div>
        {!result && (
          <span className="text-xs text-indigo-400 font-mono font-bold bg-indigo-500/10 border border-indigo-500/30 px-2 py-0.5 rounded">
            Paso {currentStep + 1} de {questions.length}
          </span>
        )}
      </div>

      <div className="p-6 min-h-[280px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col gap-4"
            >
              <h4 className="text-base text-slate-100 font-medium tracking-tight">
                {questions[currentStep].text}
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                {questions[currentStep].options.map((opt, idx) => {
                  const isSelected = answers[currentStep] === opt.key;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(opt.key)}
                      className={`flex flex-col items-start text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "bg-indigo-500/15 border-indigo-500 text-white shadow-lg shadow-indigo-500/5"
                          : "bg-slate-900/50 hover:bg-slate-900 border-white/5 hover:border-white/10 text-slate-300"
                      }`}
                    >
                      <span className="font-semibold text-xs mb-0.5 flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full`}
                          style={{ backgroundColor: emotionColors[opt.key] }}
                        ></span>
                        {opt.text}
                      </span>
                      <span className="text-[11px] text-slate-400 leading-relaxed">
                        {opt.desc}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Steps control footer */}
              <div className="flex items-center justify-between border-t border-white/5 pt-4 mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Anterior
                </button>

                <button
                  onClick={handleNext}
                  disabled={!answers[currentStep]}
                  className="flex items-center gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium px-4 py-2 rounded-lg disabled:opacity-50 disabled:pointer-events-none cursor-pointer transition-all shadow-md hover:shadow-indigo-500/15"
                >
                  {currentStep === questions.length - 1 ? "Analizar Resultados" : "Siguiente"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="text-center py-4 flex flex-col items-center gap-4"
              id="diagnostic-wizard-result"
            >
              <div className="relative">
                <div className="absolute -inset-2 rounded-full blur bg-indigo-500/20 animate-ping"></div>
                <div className="relative h-14 w-14 rounded-full bg-indigo-500/10 border-2 border-indigo-400/50 flex items-center justify-center text-indigo-400">
                  <Award className="h-8 w-8" />
                </div>
              </div>

              <div>
                <span className="text-[10px] text-indigo-400 font-mono font-bold tracking-widest uppercase block mb-1">
                  Diagnóstico Completado
                </span>
                <h4 className="text-lg font-display font-bold text-white tracking-tight">
                  Módulo Recomendado: <span style={{ color: emotionColors[result] }}>{emotionNames[result].toUpperCase()}</span>
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                  Tus respuestas sugieren un clima que se integra óptimamente con las salvaguardas y
                  dinámicas de este procesador SGI. Puedes activar o ingresar a este módulo para ajustar parámetros.
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3 mt-2">
                <button
                  onClick={handleRestart}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white bg-slate-900 border border-white/5 hover:border-white/10 px-4 py-2 rounded-lg cursor-pointer transition-all"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                  Repetir Evaluación
                </button>

                <button
                  onClick={() => onActivateModule(result)}
                  className="flex items-center gap-1.5 text-xs font-semibold px-5 py-2 rounded-lg cursor-pointer transition-all shadow-lg text-slate-900"
                  style={{
                    backgroundColor: emotionColors[result],
                    boxShadow: `0 4px 12px ${emotionColors[result]}25`
                  }}
                >
                  Ingresar al Módulo {emotionNames[result]}
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
