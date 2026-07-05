import React from 'react';
import { useLanguage } from '../context/LanguageContext';

function Showcase() {
  const { t } = useLanguage();

  const projects = [
    {
      id: 1,
      title: 'قفل ذكي بصممة',
      image: '🔐',
      problem: 'العميل محتاج نظام أمان يفتح بالبصمة بس مش لاقي حل موثوق',
      solution: 'Novex صمم نظام قفل ذكي باستخدام ESP32 مع حساس بصمة عالي الدقة',
      components: ['ESP32 Board', 'Fingerprint Sensor', 'Servo Motor', 'Relay Module', 'Power Supply'],
      category: 'أمن المنازل'
    },
    {
      id: 2,
      title: 'روبوت إخماد الحرائق',
      image: '🔥',
      problem: 'مشروع تخرج محتاج روبوت يكتشف النار ويطفئها أوتوماتيك',
      solution: 'نظام متكامل مع مصفوفة حساسات لهب ومضخة مياه ذكية',
      components: ['Arduino Mega', 'Flame Sensor Array', 'Water Pump', 'Motor Driver', 'Chassis'],
      category: 'الروبوتات'
    },
    {
      id: 3,
      title: 'نظام تحكم سيارة Go-Kart',
      image: '🏎️',
      problem: 'سيارة Go-Kart محتاج نظام تحكم إلكتروني للسرعة والتوجيه',
      solution: 'نظام ESC كامل مع توجيه ذكي وحساسات سرعة',
      components: ['48V DC Motor', 'ESC Controller', 'Steering System', 'Hall Sensors', 'Battery Pack'],
      category: 'المركبات'
    },
    {
      id: 4,
      title: 'منظومة المنزل الذكي',
      image: '🏠',
      problem: 'تحكم في كل بيت من الموبايل مع إضاءة ذكية',
      solution: 'IoT كامل مع تطبيق موبايل وتحكم صوتي',
      components: ['ESP32', 'Relay Board', 'Smart Bulbs', 'Temperature Sensors', 'Mobile App'],
      category: 'الإنترنت of Things'
    }
  ];

  return (
    <div className="page-container showcase-container">
      <div className="page-header">
        <h2>🏆 مشاريع تم تنفيذها</h2>
        <p>شاهد بنفسك جودة عملنا في مشاريع حقيقية لعملاء سعداء</p>
      </div>

      <div className="showcase-grid">
        {projects.map((project) => (
          <div key={project.id} className="showcase-card">
            <div className="showcase-image">
              <div className="project-emoji">{project.image}</div>
              <span className="project-category">{project.category}</span>
            </div>
            <div className="showcase-content">
              <h3>{project.title}</h3>
              
              <div className="showcase-section">
                <h4>❓ المشكلة:</h4>
                <p>{project.problem}</p>
              </div>
              
              <div className="showcase-section">
                <h4>✅ حل Novex:</h4>
                <p>{project.solution}</p>
              </div>
              
              <div className="showcase-section">
                <h4>🔧 القطع المستخدمة:</h4>
                <div className="components-list">
                  {project.components.map((comp, index) => (
                    <span key={index} className="component-tag">{comp}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Showcase;
