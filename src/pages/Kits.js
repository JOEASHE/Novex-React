import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function Kits({ addToCart }) {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const kits = [
    {
      id: 1,
      name: 'باقة المبتدئين في الأردوينو',
      description: 'كل ما تحتاجه للبدء في عالم الأردوينو والبرمجة',
      image: '🎯',
      originalPrice: 850,
      kitPrice: 699,
      items: [
        'Arduino Uno R3 Board',
        'USB Cable',
        'Breadboard 400 points',
        'Jumper Wires (M-M)',
        'LEDs (5 colors)',
        'Resistors Pack',
        'Push Buttons',
        'Buzzer',
        'Temperature Sensor',
        'Servo Motor SG90'
      ],
      category: 'مبتدئين',
      difficulty: 'سهل'
    },
    {
      id: 2,
      name: 'باقة الروبوتكس المتقدمة',
      description: 'لبناء روبوت متحرك كامل مع حساسات وتحكم',
      image: '🤖',
      originalPrice: 1800,
      kitPrice: 1499,
      items: [
        'Arduino Mega Board',
        'Motor Driver L298N',
        '2x DC Motors with Wheels',
        'Chassis Frame',
        'Ultrasonic Sensor',
        'IR Sensor Line Follower',
        'Bluetooth Module HC-05',
        'Battery Pack 18650',
        'Servo Motors (2x)',
        'Jumper Wires Set'
      ],
      category: 'روبوتات',
      difficulty: 'متوسط'
    },
    {
      id: 3,
      name: 'باقة المنزل الذكي IoT',
      description: 'نظام تحكم منزلي كامل مع تطبيق موبايل',
      image: '🏠',
      originalPrice: 2200,
      kitPrice: 1799,
      items: [
        'ESP32 Board',
        'Relay Module (4-channel)',
        'DHT11 Temperature Sensor',
        'PIR Motion Sensor',
        'Smart Bulb RGB',
        'LCD Display 16x2',
        'Push Buttons',
        'Resistors Pack',
        'Power Supply 5V',
        'Jumper Wires'
      ],
      category: 'IoT',
      difficulty: 'متوسط'
    },
    {
      id: 4,
      name: 'باقة المشاريع الكهربائية',
      description: 'للمشاريع الكهربائية والتحكم الآلي',
      image: '⚡',
      originalPrice: 1200,
      kitPrice: 999,
      items: [
        'Arduino Uno Board',
        'Relay Module (8-channel)',
        'AC Light Bulbs (3x)',
        'Power Adapter',
        'Optocouplers',
        'Diodes Pack',
        'Transistors',
        'Capacitors Pack',
        'PCB Board',
        'Terminal Blocks'
      ],
      category: 'كهرباء',
      difficulty: 'سهل'
    },
    {
      id: 5,
      name: 'باقة الأمن والحماية',
      description: 'نظام أمان متكامل مع بصمة وكاميرا',
      image: '🔐',
      originalPrice: 2500,
      kitPrice: 1999,
      items: [
        'ESP32 Camera Board',
        'Fingerprint Sensor',
        'PIR Motion Sensor',
        'RFID Module RC522',
        'Buzzer Alarm',
        'LED Indicators',
        'Servo Lock Motor',
        'Power Supply 12V',
        'SD Card Module',
        'Jumper Wires'
      ],
      category: 'أمن',
      difficulty: 'متقدم'
    },
    {
      id: 6,
      name: 'باقة السيارات الكهربائية',
      description: 'للمشاريع الخاصة بالسيارات الكهربائية',
      image: '🏎️',
      originalPrice: 3500,
      kitPrice: 2799,
      items: [
        '48V DC Motor',
        'ESC Speed Controller',
        'Hall Effect Sensors (3x)',
        'Steering System',
        'Battery Pack 48V',
        'Charger Module',
        'Display Dashboard',
        'Throttle Control',
        'Brake System',
        'Wiring Harness'
      ],
      category: 'مركبات',
      difficulty: 'متقدم'
    }
  ];

  const handleAddToCart = (kit) => {
    addToCart({ ...kit, cartId: Math.random(), type: 'kit' });
  };

  return (
    <div className="page-container kits-container">
      <div className="page-header">
        <h2>📦 باقات Novex الجاهزة</h2>
        <p>بوكسات متقفلة توفّر عليك الوقت والجهد - كل ما تحتاجه في باقة واحدة</p>
      </div>

      <div className="kits-grid">
        {kits.map((kit) => (
          <div key={kit.id} className="kit-card">
            <div className="kit-header">
              <div className="kit-image">{kit.image}</div>
              <div className="kit-badge">{kit.category}</div>
              <div className="kit-difficulty">{kit.difficulty}</div>
            </div>
            
            <div className="kit-content">
              <h3>{kit.name}</h3>
              <p className="kit-description">{kit.description}</p>
              
              <div className="kit-items">
                <h4>🔧 يحتوي على:</h4>
                <ul>
                  {kit.items.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="kit-pricing">
                <div className="kit-savings">
                  <span className="original-price">{kit.originalPrice} {t('currency')}</span>
                  <span className="savings-badge">وفر {kit.originalPrice - kit.kitPrice} {t('currency')}</span>
                </div>
                <div className="kit-price">
                  <span className="price">{kit.kitPrice} {t('currency')}</span>
                </div>
              </div>
              
              <button 
                className="kit-add-btn"
                onClick={() => handleAddToCart(kit)}
              >
                أضف الباقة للسلة 🛒
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kits;
