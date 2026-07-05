import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function Account() {
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <div className="page-header">
        <h2>👤 {t('myAccount')}</h2>
        <p>{t('accountSubtitle')}</p>
      </div>

      <div className="account-card">
        <p className="account-placeholder">{t('accountComingSoon')}</p>
      </div>
    </div>
  );
}

export default Account;
