import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function AdminPanel() {
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>⚙️ {t('adminTitle')}</h2>
        <p>{t('adminSubtitle')}</p>
      </div>

      <div className="admin-panel-card">
        <div className="admin-panel-row">
          <div className="admin-panel-box">
            <h3>{t('adminOrdersTitle')}</h3>
            <p>{t('adminOrdersDesc')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
