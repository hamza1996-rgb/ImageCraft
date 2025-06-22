import { useState, useEffect } from "react";

export type Language = "es" | "en";

export interface Translations {
  prompt_title: string;
  prompt_label: string;
  mask_type: string;
  mask_medical: string;
  mask_fashion: string;
  mask_carnival: string;
  mask_sports: string;
  mask_artistic: string;
  mask_custom: string;
  advanced_options: string;
  image_size: string;
  image_style: string;
  generate_button: string;
  suggestions_title: string;
  gallery_title: string;
  generating: string;
  generating_desc: string;
  no_images: string;
  no_images_desc: string;
  start_creating: string;
  image_details: string;
  download: string;
  share: string;
  delete: string;
  error_occurred: string;
  success_generated: string;
}

const translations: Record<Language, Translations> = {
  es: {
    prompt_title: "Describe tu imagen",
    prompt_label: "Descripción de la imagen",
    mask_type: "Tipo de máscara",
    mask_medical: "Médica",
    mask_fashion: "Moda",
    mask_carnival: "Carnaval",
    mask_sports: "Deportiva",
    mask_artistic: "Artística",
    mask_custom: "Personalizada",
    advanced_options: "Opciones avanzadas",
    image_size: "Tamaño de imagen",
    image_style: "Estilo artístico",
    generate_button: "Generar Imagen",
    suggestions_title: "Sugerencias rápidas",
    gallery_title: "Imágenes Generadas",
    generating: "Generando imagen...",
    generating_desc: "Esto puede tomar unos segundos",
    no_images: "No hay imágenes aún",
    no_images_desc: "Comienza describiendo la imagen que quieres generar en el panel de la izquierda",
    start_creating: "Comenzar a crear",
    image_details: "Detalles de la imagen",
    download: "Descargar",
    share: "Compartir",
    delete: "Eliminar",
    error_occurred: "Ocurrió un error",
    success_generated: "¡Imagen generada exitosamente!"
  },
  en: {
    prompt_title: "Describe your image",
    prompt_label: "Image description",
    mask_type: "Mask type",
    mask_medical: "Medical",
    mask_fashion: "Fashion",
    mask_carnival: "Carnival",
    mask_sports: "Sports",
    mask_artistic: "Artistic",
    mask_custom: "Custom",
    advanced_options: "Advanced options",
    image_size: "Image size",
    image_style: "Art style",
    generate_button: "Generate Image",
    suggestions_title: "Quick suggestions",
    gallery_title: "Generated Images",
    generating: "Generating image...",
    generating_desc: "This may take a few seconds",
    no_images: "No images yet",
    no_images_desc: "Start by describing the image you want to generate in the left panel",
    start_creating: "Start creating",
    image_details: "Image details",
    download: "Download",
    share: "Share",
    delete: "Delete",
    error_occurred: "An error occurred",
    success_generated: "Image generated successfully!"
  }
};

export function useTranslations() {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "es" || saved === "en")) {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return {
    language,
    changeLanguage,
    t: translations[language]
  };
}
