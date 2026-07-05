import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Home from './pages/Home';
import Store from './pages/Store';
import AiTool from './pages/AiTool';
import ProjectRequest from './pages/ProjectRequest';
import TrackOrder from './pages/TrackOrder';
import TrackProjects from './pages/TrackProjects';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Account from './pages/Account';
import Footer from './components/Footer';
import AdminPanel from './pages/AdminPanel';
import Showcase from './pages/Showcase';
import Kits from './pages/Kits';
import './App.css';

function AppContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cart, setCart] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const phoneNumber = '+201027026634';
  const whatsappUrl = 'https://wa.me/201027026634';
  const { language, toggleLanguage, t, isRtl } = useLanguage();

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem('novex_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('novex_orders', JSON.stringify(orders));
  }, [orders]);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);
  const addToCart = (product) => setCart([...cart, { ...product, cartId: Math.random() }]);
  const handleAddOrder = (newOrder) => setOrders([...orders, newOrder]);

  useEffect(() => {
    if (isDarkMode) document.body.classList.add('dark-mode');
    else document.body.classList.remove('dark-mode');
  }, [isDarkMode]);

  const toggleTheme = (e) => { e.preventDefault(); setIsDarkMode(!isDarkMode); };
  const handleLangToggle = (e) => { e.preventDefault(); toggleLanguage(); };
  const openContactModal = (e) => { e.preventDefault(); setContactModalOpen(true); };
  const closeMenu = () => setMenuOpen(false);
  const closeContactModal = () => setContactModalOpen(false);

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} lang={language}>
      <div className="top-bar">
        <div className="top-bar-content">
          <div className="contact-info">
            <button type="button" className="contact-item" onClick={openContactModal}>
              <span className="contact-icon-wrap">📞</span>
              <span>{phoneNumber}</span>
            </button>
            <span className="contact-separator" />
            <a href="mailto:novextech0@gmail.com" className="contact-item">
              <span className="contact-icon-wrap">📧</span>
              <span>novextech0@gmail.com</span>
            </a>
          </div>
          <div className="user-links">
            <button type="button" onClick={handleLangToggle} className="top-link lang-link top-btn">
              {t('langSwitch')}
            </button>
            <a href="#!" onClick={toggleTheme} className="top-link theme-link">
              {isDarkMode ? t('themeLight') : t('themeDark')}
            </a>
            <span className="top-divider">|</span>
            <Link to="/track" className="top-link track-link" onClick={closeMenu}>{t('trackOrder')}</Link>
          </div>
        </div>
      </div>

      <header className="main-header">
        <div className="header-container">
          <div className="header-search-group">
            <div className="logo">
              <Link to="/" onClick={closeMenu}>
                <img src="/novex-logo.png" alt="NOVEX" className="logo-img" />
              </Link>
            </div>

            <div className="search-container">
              <input type="text" placeholder={t('searchPlaceholder')} />
              <button className="search-btn">{t('searchBtn')}</button>
            </div>
          </div>

          <div className="header-actions">
            <Link to="/cart" className="action-item cart" onClick={closeMenu}>
              <span className="icon">🛒</span>
              <span className="cart-count">{cart.length}</span>
              <div className="text">
                <small>{t('cartLabel')}</small>
                <span>{cartTotal.toFixed(2)} {t('currency')}</span>
              </div>
            </Link>

            <Link to="/account" className="action-item account" onClick={closeMenu}>
              <span className="icon">👤</span>
              <div className="text">
                <small>{t('myAccount')}</small>
              </div>
            </Link>

            <button
              type="button"
              className={`menu-toggle ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t('menuLabel')}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <nav className={`main-nav ${menuOpen ? 'nav-open' : ''}`}>
        <div className="nav-container">
          <ul className="nav-links">
            <li><Link to="/" onClick={closeMenu}>{t('navHome')}</Link></li>
            <li><Link to="/store" onClick={closeMenu}>{t('navStore')}</Link></li>
            <li><Link to="/kits" onClick={closeMenu}>الباقات الجاهزة</Link></li>
            <li><Link to="/showcase" onClick={closeMenu}>المشاريع المنفذة</Link></li>
            <li><Link to="/ai" onClick={closeMenu}>{t('navAi')}</Link></li>
            <li><Link to="/track-projects" onClick={closeMenu} className="nav-highlight">{t('navTrackProjects')}</Link></li>
          </ul>
        </div>
      </nav>

      {menuOpen && <div className="nav-overlay" onClick={closeMenu} role="presentation" />}

      {contactModalOpen && (
        <div className="modal-backdrop" onClick={closeContactModal} role="presentation">
          <div className="contact-modal" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="close-modal" onClick={closeContactModal} aria-label="Close">×</button>
            <h2>اختر طريقة التواصل</h2>
            <p>اضغط واتساب لفتح المحادثة أو زر اتصال لإجراء مكالمة.</p>
            <div className="contact-modal-actions">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="modal-btn modal-whatsapp">
                واتساب
              </a>
              <a href={`tel:${phoneNumber}`} className="modal-btn modal-call">
                اتصال
              </a>
            </div>
          </div>
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/store" element={<Store addToCart={addToCart} />} />
        <Route path="/ai" element={<AiTool addToCart={addToCart} />} />
        <Route path="/request-project" element={<ProjectRequest handleAddOrder={handleAddOrder} />} />
        <Route path="/track" element={<TrackOrder orders={orders} />} />
        <Route path="/track-projects" element={<TrackProjects orders={orders} />} />
        <Route path="/cart" element={<Cart cart={cart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} handleAddOrder={handleAddOrder} setCart={setCart} />} />
        <Route path="/account" element={<Account />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/showcase" element={<Showcase />} />
        <Route path="/kits" element={<Kits addToCart={addToCart} />} />
      </Routes>

      <Footer onContactClick={openContactModal} />

      <div className="floating-social">
        <a href="#!" className="social-icon social-fb">f</a>
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="social-icon social-wa">w</a>
        <a href="#!" className="social-icon social-tg">t</a>
      </div>
      <Link to="/ai" className="floating-ai">🤖</Link>
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="floating-support">
        💬
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </Router>
  );
}

export default App;
