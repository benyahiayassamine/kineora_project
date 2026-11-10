import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { currentDoctor } from '../data/mockData.js';
import { DoctorProfileContext } from './DoctorProfileContext.js';

const STORAGE_KEY = 'kineora_doctor_profile';

const EDITABLE_FIELDS = [
  'name',
  'specialty',
  'email',
  'hospital',
  'phone',
  'address',
  'licenseNumber',
  'bio',
];

function getInitialProfile() {
  try {
    const savedProfile = localStorage.getItem(STORAGE_KEY);

    if (savedProfile) {
      return {
        ...currentDoctor,
        ...JSON.parse(savedProfile),
      };
    }
  } catch {
    console.error('Could not load doctor profile.');
  }

  return currentDoctor;
}

export function DoctorProfileProvider({ children }) {
  const [doctor, setDoctor] = useState(getInitialProfile);

  const updateDoctor = useCallback((updates) => {
    setDoctor((previous) => ({
      ...previous,
      ...Object.fromEntries(
        Object.entries(updates).filter(([key]) =>
          EDITABLE_FIELDS.includes(key),
        ),
      ),
    }));
  }, []);

  useEffect(() => {
    const profileToSave = Object.fromEntries(
      EDITABLE_FIELDS.map((key) => [key, doctor[key] || '']),
    );

    localStorage.setItem(STORAGE_KEY, JSON.stringify(profileToSave));
  }, [doctor]);

  const value = useMemo(
    () => ({ doctor, updateDoctor }),
    [doctor, updateDoctor],
  );

  return (
    <DoctorProfileContext.Provider value={value}>
      {children}
    </DoctorProfileContext.Provider>
  );
}
