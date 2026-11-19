import { useMemo, useState } from 'react';
import {
  UserRound, Stethoscope, BriefcaseBusiness, Mail, Phone,
  MapPin, Building2, IdCard, FileText, Save, Pencil,
  X, UsersRound, CalendarDays, Activity, Bell,
  ShieldCheck, Clock3, ArrowUpRight, CheckCircle2,
  ClipboardList, Award
} from 'lucide-react';

import { useDoctorProfile } from '../hooks/useDoctorProfile';
import usePreferences from '../hooks/usePreferences.js';
import { statsData, todayAppointments } from '../data/mockData.js';

function ProfilePage() {
  const { doctor, updateDoctor } = useDoctorProfile();
  const { language, dir } = usePreferences();

  const translations = {
    en: {
      eyebrow: 'DOCTOR WORKSPACE',
      title: 'My Profile',
      subtitle: 'Your professional identity, activity and personal information.',
      edit: 'Edit Profile',
      cancel: 'Cancel',
      save: 'Save Changes',
      saved: 'Changes saved successfully',
      overview: 'Professional Overview',
      patients: 'Total Patients',
      sessions: 'Sessions Today',
      adherence: 'Average Adherence',
      alerts: 'Active Alerts',
      completion: 'Profile Completion',
      completionText: 'Complete your profile to build trust with your patients.',
      about: 'About Me',
      aboutText: 'Professional biography and personal introduction.',
      noBio: 'Add a short biography to introduce yourself to your patients.',
      professional: 'Professional Information',
      contact: 'Contact Information',
      activity: 'Today’s Appointments',
      activityText: 'Your scheduled sessions and patient visits.',
      noAppointments: 'No appointments scheduled for today.',
      name: 'Full Name',
      specialty: 'Medical Specialty',
      hospital: 'Hospital / Clinic',
      license: 'Professional License',
      email: 'Email Address',
      phone: 'Phone Number',
      address: 'Office Address',
      verified: 'Medical Professional',
      member: 'KINEORA Healthcare',
      appointment: 'Appointment',
      patient: 'Patient',
      time: 'Scheduled time',
      profile: 'Profile',
      complete: 'Complete',
      fields: 'completed fields',
      welcome: 'Welcome back,',
      identity: 'Professional identity',
      noInfo: 'Not provided yet',
    },
    fr: {
      eyebrow: 'ESPACE MÉDECIN',
      title: 'Mon profil',
      subtitle: 'Votre identité professionnelle, votre activité et vos informations personnelles.',
      edit: 'Modifier le profil',
      cancel: 'Annuler',
      save: 'Enregistrer',
      saved: 'Modifications enregistrées avec succès',
      overview: 'Aperçu professionnel',
      patients: 'Total des patients',
      sessions: 'Séances aujourd’hui',
      adherence: 'Adhérence moyenne',
      alerts: 'Alertes actives',
      completion: 'Complétion du profil',
      completionText: 'Complétez votre profil pour renforcer la confiance de vos patients.',
      about: 'À propos de moi',
      aboutText: 'Biographie professionnelle et présentation.',
      noBio: 'Ajoutez une courte biographie pour vous présenter à vos patients.',
      professional: 'Informations professionnelles',
      contact: 'Coordonnées',
      activity: 'Rendez-vous du jour',
      activityText: 'Vos séances et visites programmées.',
      noAppointments: 'Aucun rendez-vous prévu aujourd’hui.',
      name: 'Nom complet',
      specialty: 'Spécialité médicale',
      hospital: 'Hôpital / Clinique',
      license: 'Licence professionnelle',
      email: 'Adresse e-mail',
      phone: 'Téléphone',
      address: 'Adresse du cabinet',
      verified: 'Professionnel de santé',
      member: 'KINEORA Healthcare',
      appointment: 'Rendez-vous',
      patient: 'Patient',
      time: 'Heure prévue',
      profile: 'Profil',
      complete: 'Complété',
      fields: 'champs renseignés',
      welcome: 'Bienvenue,',
      identity: 'Identité professionnelle',
      noInfo: 'Non renseigné',
    },
    ar: {
      eyebrow: 'مساحة الطبيب',
      title: 'ملفي الشخصي',
      subtitle: 'هويتك المهنية ونشاطك ومعلوماتك الشخصية.',
      edit: 'تعديل الملف',
      cancel: 'إلغاء',
      save: 'حفظ التغييرات',
      saved: 'تم حفظ التغييرات بنجاح',
      overview: 'نظرة عامة مهنية',
      patients: 'إجمالي المرضى',
      sessions: 'جلسات اليوم',
      adherence: 'متوسط الالتزام',
      alerts: 'التنبيهات النشطة',
      completion: 'اكتمال الملف الشخصي',
      completionText: 'أكمل معلومات ملفك لتعزيز ثقة المرضى بك.',
      about: 'نبذة عني',
      aboutText: 'السيرة المهنية والتعريف الشخصي.',
      noBio: 'أضف نبذة قصيرة لتعريف المرضى بك.',
      professional: 'المعلومات المهنية',
      contact: 'معلومات الاتصال',
      activity: 'مواعيد اليوم',
      activityText: 'الجلسات والزيارات المبرمجة.',
      noAppointments: 'لا توجد مواعيد مبرمجة لهذا اليوم.',
      name: 'الاسم الكامل',
      specialty: 'التخصص الطبي',
      hospital: 'المستشفى / العيادة',
      license: 'رقم الترخيص المهني',
      email: 'البريد الإلكتروني',
      phone: 'رقم الهاتف',
      address: 'عنوان العيادة',
      verified: 'ممارس صحي',
      member: 'KINEORA Healthcare',
      appointment: 'موعد',
      patient: 'المريض',
      time: 'التوقيت',
      profile: 'الملف الشخصي',
      complete: 'مكتمل',
      fields: 'حقول مكتملة',
      welcome: 'مرحباً،',
      identity: 'الهوية المهنية',
      noInfo: 'غير متوفر',
    },
  };

  const t = translations[language] || translations.en;
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: doctor.name || '',
    specialty: doctor.specialty || '',
    email: doctor.email || '',
    hospital: doctor.hospital || '',
    phone: doctor.phone || '',
    address: doctor.address || '',
    licenseNumber: doctor.licenseNumber || '',
    bio: doctor.bio || '',
  });

  const profileFields = [
    'name', 'specialty', 'email', 'hospital',
    'phone', 'address', 'licenseNumber', 'bio',
  ];

  const completedFields = profileFields.filter(
    (key) => String(formData[key] || '').trim().length > 0,
  ).length;

  const completion = Math.round(
    (completedFields / profileFields.length) * 100,
  );

  const stats = [
    {
      label: t.patients,
      value: statsData.totalPatients,
      icon: UsersRound,
      color: 'blue',
      detail: t.overview,
    },
    {
      label: t.sessions,
      value: statsData.sessionsToday,
      icon: CalendarDays,
      color: 'violet',
      detail: t.activity,
    },
    {
      label: t.adherence,
      value: statsData.avgAdherence,
      icon: Activity,
      color: 'green',
      detail: t.overview,
    },
    {
      label: t.alerts,
      value: statsData.alertsCount,
      icon: Bell,
      color: 'orange',
      detail: t.overview,
    },
  ];

  const appointments = useMemo(
    () => todayAppointments.slice(0, 4),
    [],
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setSaved(false);
  };

  const handleCancel = () => {
    setFormData({
      name: doctor.name || '',
      specialty: doctor.specialty || '',
      email: doctor.email || '',
      hospital: doctor.hospital || '',
      phone: doctor.phone || '',
      address: doctor.address || '',
      licenseNumber: doctor.licenseNumber || '',
      bio: doctor.bio || '',
    });
    setEditing(false);
    setSaved(false);
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateDoctor(formData);
    setEditing(false);
    setSaved(true);
  };

  const displayValue = (value) => value || t.noInfo;

  const field = (label, name, Icon, type = 'text') => (
    <label className="rich-profile-field">
      <span>{label}</span>
      <div className="rich-profile-input">
        <Icon size={17} />
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          readOnly={!editing}
          placeholder={label}
        />
      </div>
    </label>
  );

  return (
    <main className="rich-profile-page" dir={dir}>
      <div className="rich-profile-top">
        <div>
          <span className="rich-profile-eyebrow">{t.eyebrow}</span>
          <h1>{t.title}</h1>
          <p>{t.subtitle}</p>
        </div>

        {!editing ? (
          <button
            type="button"
            className="rich-profile-edit"
            onClick={() => {
              setEditing(true);
              setSaved(false);
            }}
          >
            <Pencil size={17} />
            {t.edit}
          </button>
        ) : (
          <div className="rich-profile-top-actions">
            <button type="button" className="rich-profile-cancel" onClick={handleCancel}>
              <X size={17} />
              {t.cancel}
            </button>
            <button type="submit" form="rich-profile-form" className="rich-profile-edit">
              <Save size={17} />
              {t.save}
            </button>
          </div>
        )}
      </div>

      {saved && (
        <div className="rich-profile-saved">
          <CheckCircle2 size={18} />
          {t.saved}
        </div>
      )}

      <section className="rich-profile-hero">
        <div className="rich-profile-hero-decoration rich-profile-decoration-one" />
        <div className="rich-profile-hero-decoration rich-profile-decoration-two" />

        <div className="rich-profile-hero-content">
          <div className="rich-profile-avatar">
            <UserRound size={45} />
            <span className="rich-profile-online" />
          </div>

          <div className="rich-profile-hero-info">
            <span className="rich-profile-welcome">{t.welcome}</span>
            <h2>{displayValue(formData.name)}</h2>
            <p className="rich-profile-specialty">
              <Stethoscope size={17} />
              {displayValue(formData.specialty)}
            </p>
            <div className="rich-profile-hero-tags">
              <span><ShieldCheck size={15} /> {t.verified}</span>
              <span><Building2 size={15} /> {displayValue(formData.hospital)}</span>
            </div>
          </div>

          <div className="rich-profile-member">
            <span>{t.identity}</span>
            <strong>{t.member}</strong>
            <Award size={30} />
          </div>
        </div>
      </section>

      <section className="rich-profile-stats">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <article className={`rich-profile-stat ${stat.color}`} key={stat.label}>
              <div className="rich-profile-stat-top">
                <span className="rich-profile-stat-icon"><Icon size={21} /></span>
                <ArrowUpRight size={17} className="rich-profile-stat-arrow" />
              </div>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          );
        })}
      </section>

      <div className="rich-profile-layout">
        <div className="rich-profile-main-column">
          <section className="rich-profile-panel rich-profile-completion">
            <div className="rich-profile-panel-heading">
              <div className="rich-profile-heading-icon"><ShieldCheck size={20} /></div>
              <div>
                <h2>{t.completion}</h2>
                <p>{t.completionText}</p>
              </div>
              <strong>{completion}%</strong>
            </div>
            <div className="rich-profile-progress-track">
              <div className="rich-profile-progress-value" style={{ width: `${completion}%` }} />
            </div>
            <div className="rich-profile-progress-footer">
              <span>{completedFields} / {profileFields.length} {t.fields}</span>
              <span>{completion === 100 ? t.complete : t.profile}</span>
            </div>
          </section>

          <form id="rich-profile-form" onSubmit={handleSave}>
            <section className="rich-profile-panel">
              <div className="rich-profile-section-heading">
                <div className="rich-profile-heading-icon"><FileText size={20} /></div>
                <div>
                  <h2>{t.about}</h2>
                  <p>{t.aboutText}</p>
                </div>
              </div>

              {editing ? (
                <textarea
                  className="rich-profile-bio-input"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={5}
                  placeholder={t.noBio}
                />
              ) : (
                <p className="rich-profile-bio">
                  {formData.bio || t.noBio}
                </p>
              )}
            </section>

            <section className="rich-profile-panel">
              <div className="rich-profile-section-heading">
                <div className="rich-profile-heading-icon"><BriefcaseBusiness size={20} /></div>
                <div>
                  <h2>{t.professional}</h2>
                  <p>{t.identity}</p>
                </div>
              </div>

              <div className="rich-profile-fields-grid">
                {field(t.name, 'name', UserRound)}
                {field(t.specialty, 'specialty', Stethoscope)}
                {field(t.hospital, 'hospital', Building2)}
                {field(t.license, 'licenseNumber', IdCard)}
              </div>
            </section>

            <section className="rich-profile-panel">
              <div className="rich-profile-section-heading">
                <div className="rich-profile-heading-icon"><Mail size={20} /></div>
                <div>
                  <h2>{t.contact}</h2>
                  <p>{t.contact}</p>
                </div>
              </div>

              <div className="rich-profile-fields-grid">
                {field(t.email, 'email', Mail, 'email')}
                {field(t.phone, 'phone', Phone, 'tel')}
                <div className="rich-profile-field-wide">
                  {field(t.address, 'address', MapPin)}
                </div>
              </div>
            </section>

            {editing && (
              <div className="rich-profile-bottom-actions">
                <button type="button" className="rich-profile-cancel" onClick={handleCancel}>
                  <X size={17} />
                  {t.cancel}
                </button>
                <button type="submit" className="rich-profile-edit">
                  <Save size={17} />
                  {t.save}
                </button>
              </div>
            )}
          </form>
        </div>

        <aside className="rich-profile-side-column">
          <section className="rich-profile-panel rich-profile-appointments">
            <div className="rich-profile-section-heading">
              <div className="rich-profile-heading-icon"><CalendarDays size={20} /></div>
              <div>
                <h2>{t.activity}</h2>
                <p>{t.activityText}</p>
              </div>
            </div>

            {appointments.length ? (
              <div className="rich-profile-appointment-list">
                {appointments.map((appointment) => (
                  <article className="rich-profile-appointment" key={appointment.id}>
                    <div className="rich-profile-appointment-time">
                      <Clock3 size={17} />
                      <strong>{appointment.time}</strong>
                    </div>
                    <div className="rich-profile-appointment-details">
                      <strong>{appointment.patientName || t.patient}</strong>
                      <span>{t.appointment} · {appointment.id}</span>
                    </div>
                    <span className={`rich-profile-appointment-status ${appointment.statusKey || ''}`}>
                      {appointment.statusKey === 'confirmed' ? '✓' : '•'}
                    </span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="rich-profile-empty">{t.noAppointments}</p>
            )}
          </section>

          <section className="rich-profile-panel rich-profile-quick-card">
            <div className="rich-profile-quick-icon"><ClipboardList size={23} /></div>
            <h3>{t.completion}</h3>
            <p>{t.completionText}</p>
            <div className="rich-profile-mini-progress">
              <span style={{ width: `${completion}%` }} />
            </div>
            <strong>{completion}%</strong>
          </section>
        </aside>
      </div>
    </main>
  );
}

export default ProfilePage;
