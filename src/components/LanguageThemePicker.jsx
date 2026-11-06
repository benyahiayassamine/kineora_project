import usePreferences from '../hooks/usePreferences.js';

export function LanguageThemePicker({ className = 'language-picker' }) {
  const { language, setLanguage, darkMode, toggleDarkMode, t } = usePreferences();

  const isNav = className === 'language-picker';
  const Container = isNav ? 'nav' : 'div';

  const languages = [
    { code: 'ar', flag: '🇩🇿', title: 'العربية', aria: t.switchToAr || 'العربية' },
    { code: 'fr', flag: '🇫🇷', title: 'Français', aria: t.switchToFr || 'Français' },
    { code: 'en', flag: '🇬🇧', title: 'English', aria: t.switchToEn || 'English' },
  ];

  return (
    <Container
      className={className}
      aria-label={t.langPickerAria || 'Language and theme selector'}
    >
      {languages.map(({ code, flag, title, aria }) => {
        const isSelected = language === code;
        return (
          <button
            key={code}
            type="button"
            className={isSelected ? 'selected active' : ''}
            onClick={() => setLanguage(code)}
            title={title}
            aria-label={aria}
            aria-pressed={isSelected}
          >
            {flag}
          </button>
        );
      })}

      <button
        type="button"
        onClick={toggleDarkMode}
        aria-label={darkMode ? (t.switchToLight || 'Switch to light mode') : (t.switchToDark || 'Switch to dark mode')}
        title={darkMode ? (t.switchToLight || 'Switch to light mode') : (t.switchToDark || 'Switch to dark mode')}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>
    </Container>
  );
}

export default LanguageThemePicker;
