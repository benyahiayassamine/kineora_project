
import { Download, TrendingUp } from 'lucide-react';
import usePreferences from '../hooks/usePreferences.js';
import { followUpPatients } from '../data/mockData.js';

const weeklyActivity = [
  { day: 'Mon', value: 42 },
  { day: 'Tue', value: 68 },
  { day: 'Wed', value: 52 },
  { day: 'Thu', value: 88 },
  { day: 'Fri', value: 64 },
  { day: 'Sat', value: 76 },
  { day: 'Sun', value: 94 },
];

const adherenceValues = [92, 78, 64, 95];

export default function ReportsPage() {
  const { t } = usePreferences();

  const handleExport = () => {
    window.print();
  };

  return (
    <section className="reports-page">
      <div className="reports-heading">
        <div>
          <h1>{t.reports}</h1>
          <p>{t.reportsSubtitle}</p>
        </div>

        <button
          type="button"
          className="reports-export"
          onClick={handleExport}
        >
          <Download size={17} />
          {t.exportPdf}
        </button>
      </div>

      <div className="reports-grid">
        <article className="report-card">
          <div className="report-card-header">
            <div>
              <h2>{t.weeklyActivity}</h2>
              <p>{t.weeklyActivitySubtitle}</p>
            </div>

            <span className="report-growth">
              <TrendingUp size={15} />
              +12%
            </span>
          </div>

          <div className="weekly-chart">
            {weeklyActivity.map((item) => (
              <div className="chart-column" key={item.day}>
                <div className="chart-bar-area">
                  <div
                    className="chart-bar"
                    style={{ height: `${item.value}%` }}
                    title={`${item.value}%`}
                  />
                </div>
                <span>{t[item.day.toLowerCase()]}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="report-card">
          <div className="report-card-header">
            <div>
              <h2>{t.patientAdherence}</h2>
              <p>{t.patientAdherenceSubtitle}</p>
            </div>
          </div>

          <div className="adherence-list">
            {followUpPatients.map((patient, index) => (
              <div className="adherence-item" key={patient.id}>
                <div className="adherence-info">
                  <div className="adherence-avatar">
                    {patient.avatar}
                  </div>

                  <bdi className="adherence-name">
                    {patient.name}
                  </bdi>

                  <strong>{adherenceValues[index]}%</strong>
                </div>

                <div className="adherence-track">
                  <div
                    className="adherence-fill"
                    style={{ width: `${adherenceValues[index]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
