import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Cart({ cart }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div style={{ padding: '40px 20px', minHeight: '80vh', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#ffc107', marginBottom: '30px' }}>{t('cartTitle')}</h2>

      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#fff', marginTop: '50px' }}>
          <span style={{ fontSize: '50px' }}>🛍️</span>
          <p style={{ fontSize: '20px', marginTop: '10px' }}>{t('cartEmpty')}</p>
          <Link to="/store" style={{ display: 'inline-block', marginTop: '20px', padding: '10px 20px', backgroundColor: '#f0b429', color: '#0f1f35', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
            {t('cartBrowseStore')}
          </Link>
        </div>
      ) : (
        <div>
          <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
            {cart.map((item, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', padding: '15px 0', color: '#fff' }}>
                <span style={{ fontSize: '18px' }}>{item.name}</span>
                <span style={{ color: '#f0b429', fontWeight: 'bold', fontSize: '18px' }}>{item.price} {t('currency')}</span>
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '2px dashed #555', color: '#ffc107', fontSize: '22px', fontWeight: 'bold' }}>
              <span>{t('cartTotal')}</span>
              <span>{cartTotal.toFixed(2)} {t('currency')}</span>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '30px' }}>
            <button onClick={() => navigate('/checkout')} style={{ padding: '15px 40px', backgroundColor: '#f0b429', color: '#0f1f35', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>
              {t('cartCheckout')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
