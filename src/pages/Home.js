import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Home({ addToCart }) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const featuredProducts = [
    { id: 1, name: t('homeProduct1'), price: 450, oldPrice: 530, image: '🎛️', discount: '15%' },
    { id: 2, name: t('homeProduct2'), price: 120, image: '📟' },
    { id: 3, name: t('homeProduct3'), price: 0, image: '🤖', isTool: true, desc: t('homeProduct3Desc') },
    { id: 4, name: t('homeProduct4'), price: 350, image: '🏎️' }
  ];

  const categories = [
    { id: 1, name: 'أدوات قياس', icon: '📏', count: 24 },
    { id: 2, name: 'معدات كهربائية', icon: '⚡', count: 18 },
    { id: 3, name: 'أدوات يدوية', icon: '🔧', count: 32 },
    { id: 4, name: 'معدات سلامة', icon: '⛑️', count: 15 }
  ];

  const specialOffers = [
    { id: 1, name: 'طقم أدوات احترافي', price: 899, oldPrice: 1200, image: '🧰', discount: '25%' },
    { id: 2, name: 'جهاز قياس دقيق', price: 650, oldPrice: 850, image: '📊', discount: '24%' }
  ];

  return (
    <div>
      <div className="hero-banner">
        <div className="banner-content">
          <h2>{t('homeWelcome')}</h2>
          <p>{t('homeSubtitle')}</p>
          <button className="shop-now-btn" onClick={() => navigate('/store')}>
            {t('homeShopNow')}
          </button>
        </div>
      </div>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="section-title">
          <h3>تصفح حسب الفئة</h3>
        </div>
        <div className="categories-grid">
          {categories.map((category) => (
            <div key={category.id} className="category-card" onClick={() => navigate('/store')}>
              <div className="category-icon">{category.icon}</div>
              <h4 className="category-name">{category.name}</h4>
              <span className="category-count">{category.count} منتج</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="products-section">
        <div className="section-title">
          <h3>{t('homeFeatured')}</h3>
          <a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }}>{t('homeViewAll')}</a>
        </div>

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className={`product-card ${product.isTool ? 'special-tool' : ''}`}>
              {product.discount && <div className="discount-badge">{product.discount}</div>}
              <div className="product-image">
                <div className="placeholder-img">{product.image}</div>
              </div>
              <div className="product-info">
                <h4 className="product-name">{product.name}</h4>
                {product.desc && <p className="product-desc">{product.desc}</p>}
                <div className="product-price">
                  <span className="current-price">{product.price > 0 ? `${product.price} ${t('currency')}` : t('free')}</span>
                  {product.oldPrice && <span className="old-price">{product.oldPrice} {t('currency')}</span>}
                </div>
              </div>
              {product.isTool ? (
                <button className="add-to-cart-btn special-btn" onClick={() => navigate('/ai')}>
                  {t('homeOpenTool')}
                </button>
              ) : (
                <button 
                  className="add-to-cart-btn" 
                  onClick={() => handleAddToCart({ ...product, cartId: Math.random() })}
                >
                  {t('homeAddToCart')}
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="offers-section">
        <div className="section-title">
          <h3>عروض خاصة</h3>
          <a href="/store" onClick={(e) => { e.preventDefault(); navigate('/store'); }}>عرض الكل</a>
        </div>
        <div className="offers-grid">
          {specialOffers.map((offer) => (
            <div key={offer.id} className="offer-card">
              <div className="discount-badge">{offer.discount}</div>
              <div className="offer-image">
                <div className="placeholder-img">{offer.image}</div>
              </div>
              <div className="offer-info">
                <h4 className="offer-name">{offer.name}</h4>
                <div className="offer-price">
                  <span className="current-price">{offer.price} {t('currency')}</span>
                  <span className="old-price">{offer.oldPrice} {t('currency')}</span>
                </div>
              </div>
              <button 
                className="add-to-cart-btn" 
                onClick={() => handleAddToCart({ ...offer, cartId: Math.random() })}
              >
                {t('homeAddToCart')}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
