import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const shippingRates = {
  govCairo: 50,
  govGiza: 50,
  govAlex: 60,
  govDakahlia: 45,
  govUpper: 100,
  govOther: 75,
};

function Checkout({ cart, handleAddOrder, setCart }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', governorate: '' });
  const [shippingCost, setShippingCost] = useState(0);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  useEffect(() => {
    if (formData.governorate) {
      setShippingCost(shippingRates[formData.governorate] || 75);
    } else {
      setShippingCost(0);
    }
  }, [formData.governorate]);

  const finalTotal = cartTotal + shippingCost;

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>
        <h2>{t('checkoutEmpty')}</h2>
        <button onClick={() => navigate('/store')} style={{ padding: '10px 20px', backgroundColor: '#f0b429', cursor: 'pointer', border: 'none', borderRadius: '5px' }}>
          {t('checkoutBackStore')}
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.governorate) {
      alert(t('checkoutAlertGov'));
      return;
    }
    const trackingCode = 'NVX-' + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      code: trackingCode,
      type: t('checkoutOrderType'),
      total: finalTotal.toFixed(2),
      customerDetails: formData,
      status: t('checkoutOrderStatus'),
      date: new Date().toLocaleDateString(),
    };
    handleAddOrder(newOrder);
    setCart([]);
    navigate('/track', { state: { code: trackingCode } });
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' };
  const governorates = ['govCairo', 'govGiza', 'govAlex', 'govDakahlia', 'govUpper', 'govOther'];

  return (
    <div style={{ padding: '40px 20px', minHeight: '80vh', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#f0b429', marginBottom: '10px' }}>{t('checkoutTitle')}</h2>
      <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px' }}>{t('checkoutSubtitle')}</p>

      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333', marginBottom: '30px' }}>
        <h4 style={{ color: '#fff', margin: '0 0 15px 0' }}>{t('checkoutSummary')} ({cart.length} {t('checkoutProductsCount')}):</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', marginBottom: '10px' }}>
          <span>{t('checkoutProductsTotal')}</span> <span>{cartTotal.toFixed(2)} {t('currency')}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#aaa', marginBottom: '10px' }}>
          <span>{t('checkoutShipping')}</span>
          <span style={{ color: shippingCost > 0 ? '#fff' : '#aaa' }}>
            {shippingCost > 0 ? `+ ${shippingCost} ${t('currency')}` : t('checkoutShippingTbd')}
          </span>
        </div>
        <hr style={{ borderColor: '#333' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f0b429', fontWeight: 'bold', fontSize: '20px', marginTop: '10px' }}>
          <span>{t('checkoutFinalTotal')}</span> <span>{finalTotal.toFixed(2)} {t('currency')}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" required placeholder={t('checkoutName')} style={inputStyle} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="tel" required placeholder={t('checkoutPhone')} style={inputStyle} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />

        <select required style={inputStyle} defaultValue="" onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}>
          <option value="" disabled>{t('checkoutGovernorate')}</option>
          {governorates.map((key) => (
            <option key={key} value={key}>{t(key)}</option>
          ))}
        </select>

        <textarea required placeholder={t('checkoutAddress')} rows="3" style={{ ...inputStyle, resize: 'none' }} onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

        <button type="submit" style={{ padding: '15px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          {t('checkoutSubmit')}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
