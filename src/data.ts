import { EmotionalProfile, EmotionKey, SGIState } from "./types";

export const initialProfiles: EmotionalProfile[] = [
  {
    key: EmotionKey.Alegria,
    name: "Alejandra Betancur",
    emotionName: "Alegría",
    role: "Directora HSEQ",
    experience: "10 años",
    quote: "Dos Bizcochuelos y un pan",
    colorHex: "#FFEA00", // amarillo vibrante
    colorClasses: {
      text: "text-yellow-300",
      bg: "bg-yellow-400/15",
      border: "border-yellow-400/40",
      glow: "shadow-yellow-400/30",
      accent: "bg-yellow-400",
      gradient: "from-yellow-400/25 to-amber-400/15"
    },
    stats: {
      cycles: "2,450 ciclos",
      stability: 99.8,
      extraLabel: "Factor Serotonina",
      extraValue: "Excelente"
    },
    parameters: {
      empathy: 95,
      riskBarrier: 70,
      changeTolerance: 90,
      responseSpeed: 85
    },
    pets: {
      name: "Anny & Luna",
      species: "Perras (Anny 17 años y Luna 15 años)",
      description: "Compañeras inseparables de aventuras, encargadas de activar la alegría y regular el estrés laboral en el hogar.",
      imageUrl: "/images/emotions/alegria/mascotas.png"
    },
    familyDetails: "Círculo familiar colmado de sonrisas, viajes, repostería casera (los famosos bizcochuelos) y amor incondicional.",
    customDetails: [
      { label: "Estilo Directivo", value: "Liderazgo Inspiracional" },
      { label: "Aniversario SGI", value: "Septiembre (Fundadora)" },
      { label: "Hobby Clave", value: "Cocina y Senderismo" }
    ],
    images: {
      corporate: "/images/emotions/alejandra-betancur-alegria.jpg",
      animated: "/images/emotions/png-alegria.png",
      childhood: "/images/emotions/alegria/infancia.jpg",
      team: "/images/emotions/alegria/hijas.png",
      labels: { childhood: "Mi infancia", team: "Mis hijas" },
    },
    logs: [
      {
        id: "al-1",
        timestamp: "Hace 2 horas",
        message: "Celebración y socialización de la recertificación de Calidad ISO 9001 con pastel para todo el equipo.",
        category: "calidad"
      },
      {
        id: "al-2",
        timestamp: "Ayer",
        message: "Taller interactivo de integración de procesos logrando el 100% de participación activa y buen clima.",
        category: "general"
      },
      {
        id: "al-3",
        timestamp: "Hace 3 días",
        message: "Campaña vial 'Sonríe a la vía' redujo en 15% las infracciones de parqueo interno de vehículos.",
        category: "seguridad_vial"
      }
    ],
    technicalSheet: {
      layout: "headquarters",
      introQuote:
        "Soy Alegría. Llevo 10 años en la empresa. Me encanta celebrar cada auditoría aprobada y recordar que detrás de cada indicador hay un esfuerzo del equipo. Tengo dos perras llamadas Anny y Luna.",
      presentation: {
        funciones: [
          "Dirección estratégica del SGI",
          "Formulación e implementación del sistema integrado",
          "Liderazgo cultural y toma de decisiones clave",
          "Impulso a la mejora continua y representación institucional",
        ],
        mascotas: "2 perras Anny y Luna",
        datoCurioso: "Miedo a las alturas y a los ratones",
      },
      missionItems: ["CELEBRAR CADA LOGRO", "RECORDAR CADA ESFUERZO", "IMPULSAR AL EQUIPO"],
      motivation: [
        "Enfoque en los detalles",
        "Compromiso con la calidad y la seguridad",
        "Ver resultados que hacen la diferencia",
      ],
      valores: ["PASIÓN", "COMPROMISO", "TRABAJO EN EQUIPO", "INTEGRIDAD", "MEJORA CONTINUA"],
      sobreMi: {
        generoMusical: "Más fácil les cuento lo que no me gusta: la música popular y rock pesado",
        comidaFavorita: "Comida de mar",
        colorFavorito: "Últimamente he notado que el amarillo me cae bien",
        fraseCaracteriza: "Dos Bizcochuelos y un pan",
        generoTvSerie: "Juego de Tronos y Los X Men",
      },
      footerMessage:
        "EN EL SGI, LA ALEGRÍA SE REFLEJA EN CADA LOGRO, EN CADA INDICADOR Y EN CADA PERSONA.",
    },
  },
  {
    key: EmotionKey.Ansiedad,
    name: "Dalila Anaya",
    emotionName: "Ansiedad",
    role: "Profesional en Gestión del Riesgo de la ARL",
    experience: "2 años",
    education: "Especialización en Gerencia de la SST y Riesgo Corporativo",
    quote: "Jodaaaa",
    colorHex: "#FF6B00", // naranja vibrante
    colorClasses: {
      text: "text-orange-400",
      bg: "bg-orange-500/15",
      border: "border-orange-500/40",
      glow: "shadow-orange-500/30",
      accent: "bg-orange-500",
      gradient: "from-orange-500/25 to-amber-500/15"
    },
    stats: {
      cycles: "850 matrices",
      stability: 87.5,
      extraLabel: "Nivel de Alerta",
      extraValue: "Proactiva/Hipervigilante"
    },
    parameters: {
      empathy: 80,
      riskBarrier: 95,
      changeTolerance: 45,
      responseSpeed: 98
    },
    pets: {
      name: "Mara & Zeus",
      species: "2 perros guardianes del hogar",
      description: "Alertas, juguetones y sobreprotectores. Especialistas en reportar ruidos extraños y asegurar el perímetro del hogar.",
      imageUrl: "/images/emotions/ansiedad/mascotas.png"
    },
    familyDetails: "Madre dedicada. Su hija es el motor central de todas sus precauciones de seguridad y su mayor orgullo de vida.",
    customDetails: [
      { label: "Enfoque de Riesgo", value: "Hiper-Prevención SGI" },
      { label: "Género Favorito", value: "Cine de Terror y Suspenso" },
      { label: "Combustible", value: "Café doble sin azúcar" }
    ],
    images: {
      corporate: "/images/emotions/ansiedad-portrait.jpg",
      animated: "/images/emotions/png-ansiedad.png",
      team: "/images/emotions/ansiedad/familia.png",
      secondary: "/images/emotions/ansiedad/mi-pequena.jpg",
      labels: { team: "Mi familia", secondary: "Mi pequeña" },
    },
    logs: [
      {
        id: "an-1",
        timestamp: "Hace 30 mins",
        message: "Identificación de potencial fisura en rampa de acceso norte. Reportada para mantenimiento urgente.",
        category: "sst"
      },
      {
        id: "an-2",
        timestamp: "Hace 4 horas",
        message: "Revisión milimétrica de la matriz de riesgos operacionales frente al nuevo marco legal HSEQ.",
        category: "calidad"
      },
      {
        id: "an-3",
        timestamp: "Ayer",
        message: "Monitoreo exhaustivo de índices de accidentalidad del contratista. Generación de 3 alertas preventivas.",
        category: "sst"
      }
    ],
    technicalSheet: {
      layout: "headquarters",
      subtitle: "La que siempre piensa en los riesgos (ideal para SGI)",
      introQuote:
        "Soy Ansiedad. Algunos creen que exagero... pero gracias a mí identificamos los riesgos antes de que se conviertan en problemas. Llevo 2 años en la empresa y soy la encargada de la gestión del riesgo.",
      presentation: {
        funciones: ["Caracterización de accidentalidad", "Gestión de siniestros viales"],
        mascotas: "2 perros Mara y Zeus",
      },
      mission: "Identifico, evalúo, prevengo y protejo.",
      motivation: ["Identifico, analizo y prevengo para que todos regresen seguros a casa."],
      sobreMi: {
        anecdota: "Me caí de las escaleras de la casa el día que iba a ingresar",
        colorFavorito: "Turquesa",
        generoMusical: "Todo tipo de música",
        generoTvSerie: "Terror, suspenso, investigación, anime",
        comidaFavorita: "Pescado",
        fraseCaracteriza: "Jodaaaa",
        lugarDeseado: "Grecia",
      },
      footerMessage:
        "EN EL SGI, LA ANSIEDAD ES NUESTRA ALIADA PORQUE PREVENIR HOY, ES PROTEGER SIEMPRE.",
    },
  },
  {
    key: EmotionKey.Calma,
    name: "Dayana Restrepo",
    emotionName: "Calma",
    role: "Auxiliar SGI",
    experience: "2 años 4 meses",
    quote: "Mientras todas corren, yo reviso los detalles. Porque antes de actuar debemos entender qué ocurrió.",
    colorHex: "#00A8FF", // azul vibrante
    colorClasses: {
      text: "text-sky-400",
      bg: "bg-sky-500/15",
      border: "border-sky-500/40",
      glow: "shadow-sky-500/30",
      accent: "bg-sky-500",
      gradient: "from-sky-500/25 to-blue-500/15"
    },
    stats: {
      cycles: "1,200 ciclos",
      stability: 98.0,
      extraLabel: "Estado Gota",
      extraValue: "Cristalizado / Resguardado"
    },
    parameters: {
      empathy: 90,
      riskBarrier: 80,
      changeTolerance: 75,
      responseSpeed: 60
    },
    pets: {
      name: "Romeo & Julietha",
      species: "2 gatos",
      description: "Compañeros tranquilos del hogar. Romeo y Julietha acompañan el análisis con su calma felina.",
      imageUrl: "/images/emotions/calma/mascotas.jpg"
    },
    familyDetails: "Familia unida, momentos de reflexión y creatividad. Le gusta pintar cuadros en su tiempo libre.",
    customDetails: [
      { label: "Rol en SGI", value: "Representa el análisis" },
      { label: "Dato curioso", value: "Pinta cuadros" },
      { label: "Combustible", value: "Salsa y sushi" }
    ],
    images: {
      corporate: "/images/emotions/tristeza-portrait.jpg",
      animated: "/images/emotions/png-tristeza.png",
      childhood: "/images/emotions/calma/infancia.png",
      team: "/images/emotions/calma/familia.jpg",
      labels: { childhood: "Mi infancia", team: "Mi familia", mascotas: "Mi pequeña" },
    },
    logs: [
      {
        id: "ca-1",
        timestamp: "Hace 5 horas",
        message: "Análisis reflexivo y consolidado sobre la huella de carbono trimestral. Identificación de áreas de mejora.",
        category: "ambiental"
      },
      {
        id: "ca-2",
        timestamp: "Ayer",
        message: "Auditoría documental pasiva. Corregidos 14 errores menores en la nomenclatura de archivos históricos.",
        category: "calidad"
      },
      {
        id: "ca-3",
        timestamp: "Hace 2 días",
        message: "Sustentación calmada y exitosa de no-conformidades ante el ente auditor externo, desactivando tensiones.",
        category: "calidad"
      }
    ],
    technicalSheet: {
      layout: "headquarters",
      introQuote:
        "Soy Calma. En el SGI represento el análisis. Mientras todas corren, yo reviso los detalles. Porque antes de actuar debemos entender qué ocurrió. Llevo 2 años y 4 meses en la empresa.",
      presentation: {
        funciones: [
          "Programación de exámenes médicos",
          "Gestión de infractores",
          "Seguimiento de salud",
        ],
        mascotas: "2 gatos Romeo y Julietha",
        datoCurioso: "Pinto cuadros",
      },
      missionItems: ["RESPIRA", "SUELTA", "CONFÍA", "TODO ESTÁ BIEN"],
      motivation: [
        "Enfoque en lo que importa",
        "Revisar los detalles antes de actuar",
        "Claridad en cada análisis",
      ],
      valores: ["PRESENCIA", "SERENIDAD", "ANÁLISIS", "CONFIANZA"],
      sobreMi: {
        generoMusical: "Salsa",
        comidaFavorita: "Sushi",
        colorFavorito: "Morado",
        generoTvSerie: "Drama, caricaturas",
        anecdota: "Envié la hoja de vida 4 veces",
      },
      footerMessage:
        "EN EL SGI, LA CALMA NOS PERMITE VER CON CLARIDAD LO QUE REALMENTE IMPORTA.",
    },
  },
  {
    key: EmotionKey.Furia,
    name: "Angie Arzuza",
    emotionName: "Furia",
    role: "Profesional SST",
    experience: "4 años",
    quote: "Uuuu pacho...",
    colorHex: "#FF1744", // rojo vibrante
    colorClasses: {
      text: "text-red-500",
      bg: "bg-red-500/15",
      border: "border-red-500/40",
      glow: "shadow-red-500/30",
      accent: "bg-red-500",
      gradient: "from-red-500/25 to-rose-500/15"
    },
    stats: {
      cycles: "410 eventos",
      stability: 100.0,
      extraLabel: "Efectividad Barrera",
      extraValue: "Tolerancia Cero"
    },
    parameters: {
      empathy: 40,
      riskBarrier: 100,
      changeTolerance: 50,
      responseSpeed: 99
    },
    pets: {
      name: "—",
      species: "",
      description: "",
      imageUrl: ""
    },
    familyDetails: "Familia unida, celebraciones y recuerdos en la plaza. Su papá es el único que la llama Anyellis.",
    customDetails: [
      { label: "Proyecto", value: "Isagen — SST" },
      { label: "Nombre real", value: "Anyellis (solo su papá la llama así)" },
      { label: "Gatillo", value: "'Eso siempre se ha hecho así'" }
    ],
    images: {
      corporate: "/images/emotions/furia-portrait.jpg",
      animated: "/images/emotions/png-furia.png",
      childhood: "/images/emotions/furia/infancia.jpg",
      team: "/images/emotions/furia/familia.jpg",
      secondary: "/images/emotions/furia/recuerdos.jpg",
      labels: { childhood: "Mi infancia", team: "Mi familia", secondary: "Recuerdos" },
    },
    logs: [
      {
        id: "fu-1",
        timestamp: "Hace 15 mins",
        message: "Suspensión de inmediato de maniobra de izaje de cargas por presencia de ráfagas de viento mayores a 40 km/h.",
        category: "sst"
      },
      {
        id: "fu-2",
        timestamp: "Hace 3 horas",
        message: "Bloqueo preventivo de equipo de montacargas por fallo detectado en el switch de seguridad de pedal.",
        category: "seguridad_vial"
      },
      {
        id: "fu-3",
        timestamp: "Ayer",
        message: "Sanción y reporte de contratista que omitió el uso de arnés anticaídas en zona de andamios del ala oeste.",
        category: "sst"
      }
    ],
    technicalSheet: {
      layout: "headquarters",
      introQuote:
        "Soy Furia. Me activo cuando alguien dice: 'eso siempre se ha hecho así'. Llevo 4 años en la empresa, a cargo de Isagen con el cumplimiento de seguridad y salud en el trabajo.",
      presentation: {
        funciones: [
          "Cumplimiento de seguridad y salud en el trabajo en Isagen",
          "Vigilancia y respuesta ante actos inseguros",
          "Protección del equipo con tolerancia cero",
        ],
        datoCurioso: "Me llamo Anyellis y no Angie; la única persona que me dice así es mi papá",
      },
      missionItems: ["¡EL CASCO SE USA SÍ O SÍ!", "TOLERANCIA CERO", "SEGURIDAD PRIMERO"],
      motivation: [
        "Cumplimiento estricto de SST",
        "Evitar accidentes graves",
        "Que nadie diga 'siempre se ha hecho así'",
      ],
      valores: ["DISCIPLINA", "FIRMEZA", "PROTECCIÓN", "CUMPLIMIENTO"],
      sobreMi: {
        generoMusical: "Salsa",
        comidaFavorita: "Sushi y arroz de pollo",
        colorFavorito: "Café",
        fraseCaracteriza: "Uuuu pacho...",
        generoTvSerie: "Series coreanas, documentales y películas basadas en hechos reales",
      },
      footerMessage:
        "EN EL SGI, LA FURIA PROTEGE AL EQUIPO: CERO TOLERANCIA A LO INSEGURO.",
    },
  },
  {
    key: EmotionKey.Desagrado,
    name: "Daniela Vergara",
    emotionName: "Desagrado",
    role: "Analista Integral HSEQ",
    experience: "4 años",
    quote: "Sagrado rostro",
    colorHex: "#00FF88", // verde vibrante
    colorClasses: {
      text: "text-green-400",
      bg: "bg-green-500/15",
      border: "border-green-500/40",
      glow: "shadow-green-500/30",
      accent: "bg-green-500",
      gradient: "from-green-500/25 to-emerald-500/15"
    },
    stats: {
      cycles: "920 auditorías",
      stability: 98.4,
      extraLabel: "Filtro de Desviaciones",
      extraValue: "Tolerancia Cero (Activo)"
    },
    parameters: {
      empathy: 50,
      riskBarrier: 85,
      changeTolerance: 65,
      responseSpeed: 75
    },
    pets: {
      name: "—",
      species: "",
      description: "",
      imageUrl: ""
    },
    familyDetails: "Familia unida en momentos de celebración. Representa los estándares de calidad en el SGI.",
    customDetails: [
      { label: "Rol en SGI", value: "Estándares de calidad" },
      { label: "Detractor", value: "Documentos desactualizados e incumplimientos" },
      { label: "Dato curioso", value: "Le votó la coca a don Pedro" }
    ],
    images: {
      corporate: "/images/emotions/desagrado-portrait.jpg",
      animated: "/images/emotions/png-desagrado.png",
      childhood: "/images/emotions/desagrado/infancia.jpg",
      team: "/images/emotions/desagrado/familia.jpg",
      labels: { childhood: "Mi infancia", team: "Mi familia" },
    },
    logs: [
      {
        id: "de-1",
        timestamp: "Hace 1 hora",
        message: "Rechazo contundente de lote de etiquetas impresas por ligera desviación del tono de marca PANTONE.",
        category: "calidad"
      },
      {
        id: "de-2",
        timestamp: "Hace 6 horas",
        message: "Inspección de orden en cafetería: Se emitió boletín de mejora inmediata por desorden en gabinetes.",
        category: "ambiental"
      },
      {
        id: "de-3",
        timestamp: "Ayer",
        message: "Eliminación de flujos de correo duplicados en la mesa de ayuda SGI. Un proceso eficiente debe ser limpio.",
        category: "calidad"
      }
    ],
    technicalSheet: {
      layout: "headquarters",
      introQuote:
        "Soy Desagrado. No soporto los documentos desactualizados, los registros incompletos ni los incumplimientos. En el SGI represento los estándares de calidad.",
      presentation: {
        funciones: [
          "Informes y requerimientos de clientes",
          "Plan de formación general",
          "Inspecciones de seguridad",
        ],
        datoCurioso: "Le voté la coca a don Pedro",
      },
      missionItems: ["ESTÁNDARES ALTOS", "CERO INCUMPLIMIENTOS", "CALIDAD IMPECABLE"],
      motivation: [
        "Mantener los estándares de calidad",
        "Rechazar lo incompleto o desactualizado",
        "Formación y cumplimiento en el equipo",
      ],
      valores: ["ORDEN", "PRECISIÓN", "EXIGENCIA", "INTEGRIDAD"],
      sobreMi: {
        generoMusical: "Salsa y vallenato",
        comidaFavorita: "Pastas",
        colorFavorito: "Rosado",
        fraseCaracteriza: "Sagrado rostro / Ni negros son tus ojos",
        generoTvSerie: "Series coreanas, Ralph el Demoledor",
      },
      footerMessage:
        "EN EL SGI, EL DESAGRADO MANTIENE LOS ESTÁNDARES: SIN ATAJOS, SIN EXCUSAS.",
    },
  },
  {
    key: EmotionKey.Nostalgia,
    name: "Sebastián Cardona",
    emotionName: "Nostalgia",
    role: "Médico Laboral",
    experience: "4 años",
    quote: "Dicen que vivo del pasado, pero gracias a los recuerdos evitamos cometer los mismos errores.",
    colorHex: "#BF40FF", // morado vibrante
    colorClasses: {
      text: "text-purple-400",
      bg: "bg-purple-500/15",
      border: "border-purple-500/40",
      glow: "shadow-purple-500/30",
      accent: "bg-purple-500",
      gradient: "from-purple-500/25 to-violet-500/15"
    },
    stats: {
      cycles: "1.2 PB Data",
      stability: 95.0,
      extraLabel: "Fidelidad Archivo",
      extraValue: "Histórico Seguro"
    },
    parameters: {
      empathy: 85,
      riskBarrier: 75,
      changeTolerance: 30,
      responseSpeed: 50
    },
    pets: {
      name: "Amaia, Hipp & Melele",
      species: "Pastor holandés y 2 gatos criollos",
      description: "Amaia (pastora holandesa), Hipp y Melele (gatos criollos). Compañeros del hogar que guardan los mejores recuerdos.",
      imageUrl: "/images/emotions/nostalgia/mascotas.jpg"
    },
    familyDetails: "Familia unida, recuerdos compartidos y tradición. La nostalgia evita repetir los mismos errores.",
    customDetails: [
      { label: "Función principal", value: "Vigilancia de la salud de empleados" },
      { label: "Dato curioso", value: "No tiene puesto de trabajo fijo" },
      { label: "Estilo", value: "Rock 80tero y son cubano" }
    ],
    images: {
      corporate: "/images/emotions/nostalgia-portrait.jpg",
      animated: "/images/emotions/png-nostalgia.png",
      childhood: "/images/emotions/nostalgia/infancia.png",
      team: "/images/emotions/nostalgia/familia.jpg",
      labels: { childhood: "Mi infancia", team: "Mi familia" },
    },
    logs: [
      {
        id: "no-1",
        timestamp: "Hace 8 horas",
        message: "Digitalización e indexación de los planos originales de la primera bodega de distribución de la empresa (Año 2012).",
        category: "calidad"
      },
      {
        id: "no-2",
        timestamp: "Ayer",
        message: "Sincronización mensual de la base de conocimientos históricos del SGI. Guardadas 4 lecciones aprendidas.",
        category: "general"
      },
      {
        id: "no-3",
        timestamp: "Hace 4 días",
        message: "Elaboración del informe de memoria histórica sobre la mitigación del derrame ambiental histórico en cuenca fluvial.",
        category: "ambiental"
      }
    ],
    technicalSheet: {
      layout: "headquarters",
      introQuote:
        "Dicen que vivo del pasado, pero gracias a los recuerdos evitamos cometer los mismos errores. Llevo 4 años en la empresa como médico laboral, a cargo de la vigilancia de la salud de los empleados.",
      presentation: {
        funciones: ["Vigilancia de la salud de empleados"],
        mascotas: "Pastora holandesa Amaia y 2 gatos criollos Hipp y Melele",
        datoCurioso: "No tengo puesto de trabajo fijo",
      },
      missionItems: ["GUARDAR LECCIONES", "EVITAR ERRORES", "CUIDAR LA MEMORIA"],
      motivation: [
        "Aprender del pasado para no repetir errores",
        "Vigilar la salud con perspectiva histórica",
        "Preservar lo que el equipo ha construido",
      ],
      valores: ["MEMORIA", "CUIDADO", "APRENDIZAJE", "LEGADO"],
      sobreMi: {
        generoMusical: "Rock 80tero y son cubano",
        comidaFavorita: "El asado",
        colorFavorito: "Naranja",
        generoTvSerie: "No veo series; película favorita: El Guasón (la 1ra)",
      },
      footerMessage:
        "EN EL SGI, LA NOSTALGIA NOS RECUERDA DE DÓNDE VENIMOS PARA NO PERDER EL CAMINO.",
    },
  }
];

export const initialSGIState: SGIState = {
  calidad: 94,
  ambiental: 89,
  sst: 97,
  seguridadVial: 92,
  efficiencyIndex: 93,
  systemStability: 96
};
