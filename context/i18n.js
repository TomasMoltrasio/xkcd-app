import { useRouter } from "next/router";
import { createContext, useCallback, useContext } from "react";
import es from "../translation/es.json";
import en from "../translation/en.json";

const I18nContext = createContext();

const languages = { es, en };

export function I18nProvider({ children }) {
  const { locale } = useRouter();
  const t = (key) => {
    return languages[locale][key] || key;
  };
  return <I18nContext.Provider value={{ t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within a I18nProvider");
  }
  return context;
}
