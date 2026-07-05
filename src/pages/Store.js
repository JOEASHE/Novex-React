import React from 'react';
import { productsData, getProductName } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

function Store({ addToCart }) {
  const { t, language } = useLanguage();

  return (
    <div style={{ padding: '40px 20px', minHeight: '80vh' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#ffc107' }}>{t('storeTitle')}</h2>

      <div className="products-grid">
        {productsData.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <div className="placeholder-img" style={{ fontSize: '50px' }}>{product.image}</div>
            </div>
            <div className="product-info">
              <h4 className="product-name">{getProductName(product, language)}</h4>
              <div className="product-price">
                <span className="current-price">{product.price} {t('currency')}</span>
              </div>
            </div>
            <button
              className="add-to-cart-btn"
              onClick={() => addToCart({ ...product, name: getProductName(product, language) })}
            >
              {t('homeAddToCart')}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
