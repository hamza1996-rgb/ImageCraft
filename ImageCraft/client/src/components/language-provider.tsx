import { createContext, useContext, ReactNode } from "react";
import { useTranslations, type Language, type Translations } from "@/hooks/use-translations";

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const translations = useTranslations();

  return (
    <LanguageContext.Provider value={translations}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
