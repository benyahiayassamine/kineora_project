import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { PreferencesProvider } from './context/PreferencesContext.jsx';
import { DoctorProfileProvider } from './context/DoctorProfileContext.jsx';
import './styles/styles.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PreferencesProvider>
      <DoctorProfileProvider>
        <App />
      </DoctorProfileProvider>
    </PreferencesProvider>
  </StrictMode>,
);