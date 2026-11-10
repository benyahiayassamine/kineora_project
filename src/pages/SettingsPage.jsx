import { useState } from 'react';
import { useDoctorProfile } from '../hooks/useDoctorProfile';


function SettingsPage() {
  const { doctor, updateDoctor } = useDoctorProfile();

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

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();
    updateDoctor(formData);
  };

   return (
    <main className="settings-page">
      <div className="settings-header">
        <div>
          <h1>Doctor Settings</h1>
          <p>Manage your professional profile and personal information.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="settings-form">
        <section className="settings-card">
          <h2>Professional Information</h2>

          <div className="settings-grid">
            <label>
              Full Name
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              Specialty
              <input
                type="text"
                name="specialty"
                value={formData.specialty}
                onChange={handleChange}
              />
            </label>

            <label>
              Professional License Number
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={handleChange}
              />
            </label>

            <label>
              Hospital / Clinic
              <input
                type="text"
                name="hospital"
                value={formData.hospital}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <h2>Contact Information</h2>

          <div className="settings-grid">
            <label>
              Email
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label>
              Phone Number
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>

            <label className="settings-full-width">
              Address
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </label>
          </div>
        </section>

        <section className="settings-card">
          <h2>About Me</h2>

          <label>
            Professional Biography
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Write a short professional biography..."
            />
          </label>
        </section>

        <div className="settings-actions">
          <button type="submit" className="settings-save">
            Save Changes
          </button>
        </div>
      </form>
    </main>
  );
}

export default SettingsPage;