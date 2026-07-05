import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function TrackOrder({ orders }) {
  const location = useLocation();
  const { t } = useLanguage();
  const [trackingCode, setTrackingCode] = useState(location.state?.code || '');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

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

    const foundOrder = orders.find((o) => o.code === codeToSearch);
    setResult(foundOrder || null);
    setHasSearched(true);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>{t('trackTitle')}</h2>
        <p>{t('trackSubtitle')}</p>
      </div>

      <form className="track-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={trackingCode}
          onChange={(e) => setTrackingCode(e.target.value)}
          placeholder={t('trackPlaceholder')}
          required
        />
        <button type="submit" className="btn-primary">{t('trackBtn')}</button>
      </form>

      {hasSearched && (
        <div className={`track-result ${result ? 'success' : 'error'}`}>
          {result ? (
            <div>
              <h3>
                {t('trackDetails')} <span className="highlight">{result.code}</span>
              </h3>
              <div className="track-details">
                <div><strong>{t('trackType')}</strong> {result.type}</div>
                <div><strong>{t('trackDate')}</strong> {result.date}</div>
                <div><strong>{t('trackTotal')}</strong> {result.total} {t('currency')}</div>
                {result.projectName && <div><strong>{t('trackProjectName')}</strong> {result.projectName}</div>}
                <div className="status-box">
                  <strong>{t('trackStatus')}</strong>
                  <span className="status-badge">⏳ {result.status}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="error-msg">{t('trackNotFound')}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default TrackOrder;
