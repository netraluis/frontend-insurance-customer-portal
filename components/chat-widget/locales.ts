// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const translations: Record<string, any> = {
  ca: {
    starters: [
      "Declaració d’un sinistre",
      "Vull demanar un pressupost",
      "Donar de baixa una pòlissa",
      "Fraccionar el rebut de la pòlissa",
      "Quin és l’horari d’oficina?",
    ],
    suggestions: "Sugerències",
    agentWelcome:
      "Sóc l'assistent d'IA de Globalrisc, pregunta'm el que vulguis! Com et puc ajudar?",
    inputPlaceholder: "Escriu el teu missatge",
    fileUploadDrop:
      "Arrossega i deixa anar fitxers aquí, o fes clic per seleccionar fitxers",
    fileUploadButton: "Selecciona fitxers",
    fileUploadLabel: "Pujar fitxers",
    agentDisclaimer:
      "Aquest agent pot cometre errors. Si us plau, utilitza'l amb precaució.",
    openChat: "Obrir el xat",
    closeChat: "Tancar xat",
  },
  es: {
    starters: [
      "Declaración de un siniestro",
      "Solicitar un presupuesto",
      "Dar de baja una póliza",
      "Fraccionar el recibo de la póliza",
      "¿Cuál es el horario de oficina?",
    ],
    suggestions: "Sugerencias",
    agentWelcome:
      "Soy el asistente de IA de Globalrisc, ¡pregúntame lo que quieras! ¿En qué puedo ayudarte?",
    inputPlaceholder: "Escribe tu mensaje",
    fileUploadDrop:
      "Arrastra y suelta archivos aquí, o haz clic para seleccionarlos",
    fileUploadButton: "Seleccionar archivos",
    fileUploadLabel: "Subir archivos",
    agentDisclaimer:
      "Este agente puede cometer errores. Por favor, úsalo con precaución.",
    openChat: "Abrir Chat",
    closeChat: "Cerrar chat",
  },
  en: {
    starters: [
      "Claim declaration",
      "Request a quote",
      "Cancel a policy",
      "Split the policy payment",
      "What are the office hours?",
    ],
    suggestions: "Suggestions",
    agentWelcome:
      "I'm the Globalrisc AI assistant, ask me anything! How can I help you?",
    inputPlaceholder: "Type your message",
    fileUploadDrop: "Drag and drop files here, or click to select files",
    fileUploadButton: "Select Files",
    fileUploadLabel: "Upload files",
    agentDisclaimer:
      "This agent may make mistakes. Please use with discretion.",
    openChat: "Open Chat Widget",
    closeChat: "Close chat",
  },
  fr: {
    starters: [
      "Déclaration d’un sinistre",
      "Demander un devis",
      "Résilier une police",
      "Fractionner le paiement de la police",
      "Quels sont les horaires du bureau ?",
    ],
    suggestions: "Suggestions",
    agentWelcome:
      "Je suis l'assistant IA de Globalrisc, posez-moi vos questions ! Comment puis-je vous aider ?",
    inputPlaceholder: "Écrivez votre message",
    fileUploadDrop:
      "Glissez-déposez des fichiers ici, ou cliquez pour sélectionner des fichiers",
    fileUploadButton: "Sélectionner des fichiers",
    fileUploadLabel: "Télécharger des fichiers",
    agentDisclaimer:
      "Cet agent peut faire des erreurs. Veuillez l'utiliser avec précaution.",
    openChat: "Ouvrir le chat",
    closeChat: "Fermer le chat",
  },
};

export function getT(lang: string) {
  return function t(key: string) {
    return translations[lang]?.[key] ?? translations["es"]?.[key] ?? key;
  };
}
