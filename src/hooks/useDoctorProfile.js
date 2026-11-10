import { useContext } from 'react';
import { DoctorProfileContext } from '../context/DoctorProfileContext.js';

export function useDoctorProfile() {
  const context = useContext(DoctorProfileContext);

  if (!context) {
    throw new Error(
      'useDoctorProfile must be used inside DoctorProfileProvider',
    );
  }

  return context;
}

