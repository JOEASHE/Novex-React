import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Footer({ onContactClick }) {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="main-footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-col footer-brand">
            <Link to="/" className="footer-logo-link">
              <img src="/novex-logo.png" alt="NOVEX" className="footer-logo-img" />
            </Link>
            <p className="footer-desc">{t('footerDesc')}</p>
            <div className="footer-social">
              <a href="#!" className="footer-social-link" aria-label="Facebook">f</a>
              <a href="#!" className="footer-social-link" aria-label="WhatsApp">w</a>
              <a href="#!" className="footer-social-link" aria-label="Telegram">t</a>
            </div>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">{t('footerQuickLinks')}</h3>
            <ul className="footer-links">
              <li><Link to="/">{t('navHome')}</Link></li>
              <li><Link to="/store">{t('navStore')}</Link></li>
              <li><Link to="/ai">{t('navAi')}</Link></li>
              <li><Link to="/request-project">{t('footerProjectRequest')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">{t('footerCustomer')}</h3>
            <ul className="footer-links">
              <li><Link to="/track-projects">{t('footerTrackProjects')}</Link></li>
              <li><Link to="/track">{t('footerTrackOrder')}</Link></li>
              <li><Link to="/cart">{t('footerCart')}</Link></li>
              <li><Link to="/checkout">{t('footerCheckout')}</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">{t('footerContact')}</h3>
            <ul className="footer-contact">
              <li>
                <button type="button" className="footer-contact-button" onClick={onContactClick}>
                  <span className="contact-icon">📞</span> +201027026634
                </button>
              </li>
              <li><span className="contact-icon">📧</span> support@novex.com</li>
              <li><span className="contact-icon">📍</span> {t('footerLocation')}</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-container footer-bottom-content">
          <p>© {currentYear} NOVEX. {t('footerRights')}</p>
          <div className="footer-bottom-links">
            <Link to="/admin" className="footer-admin-btn">{t('footerAdmin')}</Link>
            <span className="footer-divider">|</span>
            <a href="#!">{t('footerPrivacy')}</a>
            <span className="footer-divider">|</span>
            <a href="#!">{t('footerTerms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
