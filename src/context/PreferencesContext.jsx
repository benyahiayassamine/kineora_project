import { useCallback, useEffect, useMemo, useState } from 'react';
import translations from '../i18n/translations.js';
import { PreferencesContext } from './PreferencesContext.js';

function getInitialLanguage() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('kineora_language');
    if (saved && ['en', 'fr', 'ar'].includes(saved)) {
      return saved;
    }
  }
  return 'en';
}

function getInitialTheme() {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem('kineora_theme');
    if (saved) {
      return saved === 'dark';
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
  }
  return false;
}

export function PreferencesProvider({ children }) {
  const [language, setLanguageState] = useState(getInitialLanguage);
  const [darkMode, setDarkModeState] = useState(getInitialTheme);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  const setLanguage = useCallback((newLang) => {
    if (['en', 'fr', 'ar'].includes(newLang)) {
      setLanguageState(newLang);
    }
  }, []);

  const toggleDarkMode = useCallback(() => {
    setDarkModeState((prev) => !prev);
  }, []);

  const setDarkMode = useCallback((val) => {
    setDarkModeState(Boolean(val));
  }, []);

  // Synchronisation du document HTML (lang, dir et localStorage)
  useEffect(() => {
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('dir', dir);
    try {
      localStorage.setItem('kineora_language', language);
    } catch {
      // Ignorer si localStorage restreint
    }
  }, [language, dir]);

  // Synchronisation du thème (data-theme, body.dark-mode et localStorage)
  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    try {
      localStorage.setItem('kineora_theme', darkMode ? 'dark' : 'light');
    } catch {
      // Ignorer si localStorage restreint
    }
  }, [darkMode]);

  // Helper de traduction unifié : supporte t.cle ET t('cle')
  const currentDict = translations[language] || translations.en;
  const t = useMemo(() => {
    const tFn = (key, fallback) => currentDict[key] ?? fallback ?? key;
    return new Proxy(tFn, {
      get(target, prop) {
        if (prop in target) return target[prop];
        return currentDict[prop];
      },
    });
  }, [currentDict]);

  const value = useMemo(() => ({
    language,
    setLanguage,
    darkMode,
    setDarkMode,
    toggleDarkMode,
    dir,
    t,
    translations: currentDict,
  }), [language, setLanguage, darkMode, setDarkMode, toggleDarkMode, dir, t, currentDict]);

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export default PreferencesProvider;
