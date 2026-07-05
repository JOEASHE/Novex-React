export const productsData = [
  { id: 1, name: { ar: 'بوردة أردوينو ميجا (Arduino Mega)', en: 'Arduino Mega Board' }, price: 650, category: { ar: 'أردوينو', en: 'Arduino' }, image: '🎛️' },
  { id: 2, name: { ar: 'حساس لهب (Flame Sensor)', en: 'Flame Sensor' }, price: 45, category: { ar: 'حساسات', en: 'Sensors' }, image: '🔥' },
  { id: 3, name: { ar: 'حساس ضوء (LDR Module)', en: 'LDR Light Sensor Module' }, price: 30, category: { ar: 'حساسات', en: 'Sensors' }, image: '☀️' },
  { id: 4, name: { ar: 'نظام توجيه (طارة قيادة) لسيارات Go-Kart', en: 'Steering System for Go-Kart' }, price: 1200, category: { ar: 'ميكانيكا', en: 'Mechanics' }, image: '🏎️' },
  { id: 5, name: { ar: 'شاشة LCD 16x2', en: 'LCD 16x2 Display' }, price: 120, category: { ar: 'شاشات', en: 'Displays' }, image: '📟' },
  { id: 6, name: { ar: 'موديول ESP32 للـ IoT', en: 'ESP32 IoT Module' }, price: 350, category: { ar: 'إنترنت الأشياء', en: 'IoT' }, image: '🌐' },
];

export function getProductName(product, language) {
  return product.name[language] || product.name.ar;
}
