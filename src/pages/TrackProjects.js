import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function TrackProjects({ orders }) {
  const location = useLocation();
  const { t } = useLanguage();
  const [trackingCode, setTrackingCode] = useState(location.state?.code || '');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const projectOrders = orders.filter((o) => o.code?.startsWith('PRJ-'));

  useEffect(() => {
    if (location.state?.code) {
      handleSearch(null, location.state.code);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const handleSearch = (e, autoCode = null) => {
    if (e) e.preventDefault();
    const codeToSearch = autoCode || trackingCode;
    if (!codeToSearch.trim()) return;

    const found = projectOrders.find((o) => o.code === codeToSearch);
    if (found) {
      // Add progress steps if not exists
      if (!found.progressSteps) {
        found.progressSteps = [
          { id: 1, title: 'تم استلام الفكرة', completed: true },
          { id: 2, title: 'جاري رسم المخططات والتصميم', completed: found.status === 'قيد التصميم' || found.status === 'جاري التقفيل' || found.status === 'جاري البرمجة' || found.status === 'مكتمل' },
          { id: 3, title: 'جاري تقفيل الهاردوير', completed: found.status === 'جاري التقفيل' || found.status === 'جاري البرمجة' || found.status === 'مكتمل' },
          { id: 4, title: 'جاري كتابة الأكواد والتجربة', completed: found.status === 'جاري البرمجة' || found.status === 'مكتمل' },
          { id: 5, title: 'تم التسليم', completed: found.status === 'مكتمل' }
        ];
      }
    }
    setResult(found || null);
    setHasSearched(true);
  };

  return (
    <div className="page-container track-projects-page">
      <div className="page-header">
        <h2>{t('trackProjectsTitle')}</h2>
        <p>{t('trackProjectsSubtitle')}</p>
      </div>

      <form className="track-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          placeholder={t('trackProjectsPlaceholder')}
          required
        />
        <button type="submit" className="btn-primary">{t('trackBtn')}</button>
      </form>

      {hasSearched && (
        <div className={`track-result ${result ? 'success' : 'error'}`}>
          {result ? (
            <div>
              <h3>
                {t('trackProject')} <span className="highlight">{result.projectName || result.code}</span>
              </h3>
              <div className="track-details">
                <div><strong>{t('trackCode')}</strong> {result.code}</div>
                <div><strong>{t('trackDate')}</strong> {result.date}</div>
                <div><strong>{t('trackTotal')}</strong> {result.total} {t('currency')}</div>
                {result.customerDetails?.university && (
                  <div><strong>{t('trackUniversity')}</strong> {result.customerDetails.university}</div>
                )}
              </div>
              
              {/* Progress Steps */}
              <div className="progress-tracker">
                <h4>مراحل تنفيذ المشروع:</h4>
                <div className="progress-steps">
                  {result.progressSteps?.map((step, index) => (
                    <div key={step.id} className={`progress-step ${step.completed ? 'completed' : 'pending'}`}>
                      <div className="step-number">
                        {step.completed ? '✔️' : index + 1}
                      </div>
                      <div className="step-content">
                        <span className="step-title">{step.title}</span>
                      </div>
                      {index < result.progressSteps.length - 1 && (
                        <div className={`step-line ${step.completed ? 'completed' : ''}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="status-box">
                <strong>{t('trackProjectStatus')}</strong>
                <span className="status-badge">⏳ {result.status}</span>
              </div>
            </div>
          ) : (
            <p className="error-msg">{t('trackNotFoundProject')}</p>
          )}
        </div>
      )}

      {projectOrders.length > 0 && (
        <div className="projects-list">
          <h3>{t('recentProjects')}</h3>
          <div className="projects-grid">
            {projectOrders.map((project) => (
              <button
                key={project.code}
                type="button"
                className="project-card-mini"
                onClick={() => {
                  setTrackingCode(project.code);
                  handleSearch(null, project.code);
                }}
              >
                <span className="project-code">{project.code}</span>
                <span className="project-name">{project.projectName || t('defaultProjectName')}</span>
                <span className="project-status">{project.status}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {projectOrders.length === 0 && !hasSearched && (
        <div className="empty-state">
          <p>{t('noProjects')}</p>
          <Link to="/ai" className="btn-primary">{t('startPricing')}</Link>
        </div>
      )}
    </div>
  );
}

export default TrackProjects;
