import usePreferences from '../hooks/usePreferences.js';
import {
  Sun,
  Moon,
  Languages,
  Check,
  Palette,
  Globe,
} from 'lucide-react';

function SettingsPage() {
  const { language, setLanguage, darkMode, toggleDarkMode } = usePreferences();

  const content = {
    en: {
      title: 'Settings',
      subtitle: 'Personalize your workspace and make KINEORA yours.',
      appearance: 'Appearance',
      appearanceDesc: 'Choose the visual theme that feels right for you.',
      light: 'Light mode',
      lightDesc: 'A clean and bright interface.',
      dark: 'Dark mode',
      darkDesc: 'A comfortable interface for low-light environments.',
      language: 'Language',
      languageDesc: 'Choose the language used throughout your workspace.',
      active: 'Active',
      preferences: 'YOUR PREFERENCES',
      theme: 'Display theme',
      languageSetting: 'Interface language',
    },
    fr: {
      title: 'Paramètres',
      subtitle: 'Personnalisez votre espace de travail KINEORA.',
      appearance: 'Apparence',
      appearanceDesc: 'Choisissez le thème qui vous convient.',
      light: 'Mode clair',
      lightDesc: 'Une interface lumineuse et épurée.',
      dark: 'Mode sombre',
      darkDesc: 'Une interface confortable dans un environnement sombre.',
      language: 'Langue',
      languageDesc: 'Choisissez la langue de votre espace de travail.',
      active: 'Actif',
      preferences: 'VOS PRÉFÉRENCES',
      theme: 'Thème d’affichage',
      languageSetting: 'Langue de l’interface',
    },
    ar: {
      title: 'الإعدادات',
      subtitle: 'خصص مساحة عملك واجعل KINEORA تناسب تفضيلاتك.',
      appearance: 'المظهر',
      appearanceDesc: 'اختر المظهر الذي يناسبك.',
      light: 'الوضع النهاري',
      lightDesc: 'واجهة مشرقة ومريحة للعين.',
      dark: 'الوضع الليلي',
      darkDesc: 'واجهة مريحة في الإضاءة المنخفضة.',
      language: 'اللغة',
      languageDesc: 'اختر لغة واجهة الاستخدام.',
      active: 'مفعّل',
      preferences: 'تفضيلاتك',
      theme: 'مظهر العرض',
      languageSetting: 'لغة الواجهة',
    },
  };

  const labels = content[language] || content.en;

  const languages = [
    { code: 'en', name: 'English', native: 'English', short: 'EN' },
    { code: 'fr', name: 'French', native: 'Français', short: 'FR' },
    { code: 'ar', name: 'Arabic', native: 'العربية', short: 'AR' },
  ];

  return (
    <main className="settings-page preferences-settings-page">
      <header className="preferences-page-header">
        <div className="preferences-heading-icon">
          <Palette size={25} />
        </div>
        <div>
          <span className="preferences-eyebrow">{labels.preferences}</span>
          <h1>{labels.title}</h1>
          <p>{labels.subtitle}</p>
        </div>
      </header>

      <section className="preferences-section">
        <div className="preferences-section-heading">
          <div className="preferences-section-icon">
            <Sun size={20} />
          </div>
          <div>
            <h2>{labels.appearance}</h2>
            <p>{labels.appearanceDesc}</p>
          </div>
        </div>

        <div className="preferences-options-grid">
          <button
            type="button"
            className={`preferences-option ${!darkMode ? 'is-selected' : ''}`}
            onClick={() => {
              if (darkMode) toggleDarkMode();
            }}
            aria-pressed={!darkMode}
          >
            <span className="preferences-option-icon light-icon">
              <Sun size={25} />
            </span>
            <span className="preferences-option-content">
              <strong>{labels.light}</strong>
              <small>{labels.lightDesc}</small>
            </span>
            <span className="preferences-option-check">
              {!darkMode && <Check size={16} />}
            </span>
          </button>

          <button
            type="button"
            className={`preferences-option ${darkMode ? 'is-selected' : ''}`}
            onClick={() => {
              if (!darkMode) toggleDarkMode();
            }}
            aria-pressed={darkMode}
          >
            <span className="preferences-option-icon dark-icon">
              <Moon size={25} />
            </span>
            <span className="preferences-option-content">
              <strong>{labels.dark}</strong>
              <small>{labels.darkDesc}</small>
            </span>
            <span className="preferences-option-check">
              {darkMode && <Check size={16} />}
            </span>
          </button>
        </div>
      </section>

      <section className="preferences-section">
        <div className="preferences-section-heading">
          <div className="preferences-section-icon">
            <Languages size={20} />
          </div>
          <div>
            <h2>{labels.language}</h2>
            <p>{labels.languageDesc}</p>
          </div>
        </div>

        <div className="preferences-language-list">
          {languages.map((item) => (
            <button
              type="button"
              key={item.code}
              className={`preferences-language-option ${
                language === item.code ? 'is-selected' : ''
              }`}
              onClick={() => setLanguage(item.code)}
              aria-pressed={language === item.code}
            >
              <span className="preferences-language-code">{item.short}</span>
              <span className="preferences-language-name">
                <strong>{item.native}</strong>
                <small>{item.name}</small>
              </span>
              <span className="preferences-language-check">
                {language === item.code && <Check size={17} />}
              </span>
            </button>
          ))}
        </div>
      </section>

      <div className="preferences-footer">
        <Globe size={15} />
        <span>{labels.theme} · {darkMode ? labels.dark : labels.light}</span>
        <span className="preferences-footer-separator">|</span>
        <span>{labels.languageSetting} · {language.toUpperCase()}</span>
      </div>
    </main>
  );
}

export default SettingsPage;
