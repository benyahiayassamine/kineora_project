/**
 * Centralized Mock Entity Data for KINEORA
 * 
 * GLOBAL INTERNATIONALIZATION RULE:
 * Entity records (doctor names, patient names, guardian names, medication names,
 * hospital/clinic names, and IDs) are stored in their canonical original form.
 * They must NEVER be translated, transliterated, or modified when switching languages.
 */

export const currentDoctor = {
  id: 'DOC-001',
  name: 'Dr. Ahmed Ben Ali',
  specialty: 'Traumatology & Functional Rehabilitation',
  role: 'doctor',
  email: 'ahmed.benali@kineora.com',
  hospital: 'CHU de Traumatologie',
};

export const statsData = {
  totalPatients: 24,
  sessionsToday: 6,
  avgAdherence: '82%',
  alertsCount: 3,
};

export const todayAppointments = [
  {
    id: 'APT-101',
    patientName: 'Yacine',
    time: '09:30',
    date: { day: '03', month: 'Nov' },
    typeKey: 'checkup',
    statusKey: 'confirmed',
    
  },
  {
    id: 'APT-102',
    patientName: 'Amira',
    time: '11:00',
    date: { day: '03', month: 'Nov' },
    typeKey: 'xray',
    statusKey: 'pending',
    
  },
];

export const followUpPatients = [
  {
    id: 'PAT-201',
    name: 'Yacine',
    guardian: 'Fatima',
    avatar: 'Y',
    statusKey: 'followUpStatus',
    currentWeek: 4,
    totalWeeks: 6,
    progressPercent: 68,
    medication: 'Paracetamol 500mg',
    conditionKey: 'forearmFracture',
  },
  {
    id: 'PAT-202',
    name: 'Amira',
    guardian: 'Farid',
    avatar: 'A',
    statusKey: 'deviceInactive',
    currentWeek: 3,
    totalWeeks: 6,
    progressPercent: 38,
    medication: 'Ibuprofen 400mg',
    conditionKey: 'clavicleFracture',
  },
  {
    id: 'PAT-203',
    name: 'Mohamed',
    guardian: 'Rachid',
    avatar: 'M',
    statusKey: 'followUpStatus',
    currentWeek: 2,
    totalWeeks: 12,
    progressPercent: 18,
    medication: '',
    conditionKey: 'hipFracture',
  },
  {
    id: 'PAT-204',
    name: 'Salim',
    guardian: 'Personal patient',
    avatar: 'S',
    statusKey: 'followUpStatus',
    currentWeek: 5,
    totalWeeks: 6,
    progressPercent: 84,
    medication: '',
    conditionKey: 'wristFracture',
  },
];