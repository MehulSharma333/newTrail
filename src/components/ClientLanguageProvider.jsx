"use client";

import { useEffect } from "react";
import i18n from "@/app/i18n"; // Ensure the path is correct for your project

const ClientLanguageProvider = ({ children }) => {
  useEffect(() => {
    const currentLang = localStorage.getItem('language');
    if (currentLang) {
      i18n.changeLanguage(currentLang);
    }
  }, []);

  return <>{children}</>;
};

export default ClientLanguageProvider;
