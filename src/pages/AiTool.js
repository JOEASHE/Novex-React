import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const aiProjectBrain = [
  {
    keywords: ['بيت ذكي', 'سمارت هوم', 'smart home', 'منزل'],
    projectKey: 'aiSmartHome',
    estimatedHours: 15,
    components: [
      { nameKey: 'aiCompEsp32', price: 350 },
      { nameKey: 'aiCompRelay', price: 120 },
      { nameKey: 'aiCompLock', price: 420 },
      { nameKey: 'aiCompWiring', price: 80 },
    ],
  },
  {
    keywords: ['حريق', 'اطفاء', 'لهب', 'نار', 'fire'],
    projectKey: 'aiFireRobot',
    estimatedHours: 12,
    components: [
      { nameKey: 'aiCompArduino', price: 450 },
      { nameKey: 'aiCompFlame', price: 90 },
      { nameKey: 'aiCompPump', price: 160 },
      { nameKey: 'aiCompChassis', price: 260 },
    ],
  },
  {
    keywords: ['عربية', 'عربيه', 'جو كارت', 'go-kart', 'سيارة', 'توجيه', 'kart'],
    projectKey: 'aiGoKart',
    estimatedHours: 30,
    components: [
      { nameKey: 'aiCompMotor', price: 3800 },
      { nameKey: 'aiCompEsc', price: 1950 },
      { nameKey: 'aiCompSteering', price: 1250 },
      { nameKey: 'aiCompHall', price: 350 },
    ],
  },
];

function AiTool({ addToCart }) {
  const [projectDescription, setProjectDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [chatHistory, setChatHistory] = useState([
    { type: 'system', text: 'NOVEX AI Terminal v2.0' },
    { type: 'system', text: 'Connected to Novex Engineering Database...' },
    { type: 'ai', text: 'مرحباً! أنا مساعد الذكاء الاصطناعي الخاص بـ Novex. اشرح فكرة مشروعك وسأساعدك في تحديد المكونات والتكلفة.' }
  ]);
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();
  const { t } = useLanguage();

  const analyzeProjectWithAI = (e) => {
    e.preventDefault();
    if (!projectDescription.trim()) return;
    
    // Add user message to chat
    setChatHistory(prev => [...prev, { type: 'user', text: projectDescription }]);
    setIsLoading(true);

    setTimeout(() => {
      const text = projectDescription.toLowerCase();
      const matchedProject = aiProjectBrain.find((item) =>
        item.keywords.some((keyword) => text.includes(keyword))
      );

      const componentsList = matchedProject
        ? matchedProject.components.map((c) => ({ name: t(c.nameKey), price: c.price }))
        : [
            { name: t('aiCompBoard'), price: 500 },
            { name: t('aiCompSensors'), price: 400 },
          ];

      const baseComponentsCost = componentsList.reduce((sum, c) => sum + c.price, 0);
      const hoursNeeded = matchedProject ? matchedProject.estimatedHours : 12;
      const projectName = matchedProject ? t(matchedProject.projectKey) : t('aiCustomProject');

      const laborCost = hoursNeeded * 150;
      const subTotal = baseComponentsCost + laborCost;
      const platformCommission = subTotal * 0.15;
      const finalPrice = subTotal + platformCommission;

      const result = {
        projectName,
        components: componentsList,
        componentsCost: baseComponentsCost,
        laborCost,
        commission: platformCommission,
        finalPrice: finalPrice.toFixed(2),
      };
      
      setAiResult(result);
      setIsLoading(false);
      setProjectDescription('');
      
      // Add AI response to chat
      const aiResponse = `تم تحليل مشروعك! 🎯\n\nالمشروع: ${projectName}\n\nالمكونات المطلوبة:\n${componentsList.map(c => `• ${c.name}: ${c.price} ${t('currency')}`).join('\n')}\n\n💰 التكلفة التقريبية: ${finalPrice.toFixed(2)} ${t('currency')}`;
      setChatHistory(prev => [...prev, { type: 'ai', text: aiResponse }]);
    }, 1500);
  };
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setChatHistory(prev => [...prev, { type: 'system', text: `📎 تم رفع الملف: ${file.name}` }]);
    }
  };

  const handleBuyComponentsOnly = () => {
    aiResult.components.forEach((comp) => addToCart(comp));
    navigate('/store');
  };

  const handleRequestFullProject = () => {
    navigate('/request-project', { state: { project: aiResult } });
  };

  return (
    <div className="ai-terminal-container">
      <div className="terminal-header">
        <div className="terminal-buttons">
          <span className="terminal-btn close"></span>
          <span className="terminal-btn minimize"></span>
          <span className="terminal-btn maximize"></span>
        </div>
        <div className="terminal-title">NOVEX AI Terminal - Engineering Assistant</div>
      </div>
      
      <div className="terminal-body">
        <div className="chat-history">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat-message ${msg.type}`}>
              {msg.type === 'system' && <span className="message-prefix">[SYSTEM]</span>}
              {msg.type === 'ai' && <span className="message-prefix">[NOVEX-AI]</span>}
              {msg.type === 'user' && <span className="message-prefix">[USER]</span>}
              <span className="message-text">{msg.text}</span>
            </div>
          ))}
          {isLoading && (
            <div className="chat-message ai">
              <span className="message-prefix">[NOVEX-AI]</span>
              <span className="message-text loading">جاري التحليل...</span>
            </div>
          )}
        </div>
        
        <div className="terminal-input-area">
          <div className="input-prefix">➜</div>
          <form onSubmit={analyzeProjectWithAI} className="input-form">
            <input
              type="text"
              value={projectDescription}
              onChange={(e) => setProjectDescription(e.target.value)}
              placeholder="اكتب فكرة مشروعك هنا..."
              className="terminal-input"
              disabled={isLoading}
            />
            <button type="submit" className="send-btn" disabled={isLoading}>
              ⏎
            </button>
          </form>
          <label className="file-upload-btn">
            📎 رفع ملف
            <input type="file" onChange={handleFileUpload} accept=".pdf,.jpg,.png,.txt,.c" />
          </label>
        </div>
      </div>
      
      {aiResult && (
        <div className="ai-result-panel">
          <div className="result-header">
            <h3>🎯 {t('aiAssessment')}: <span className="highlight">{aiResult.projectName}</span></h3>
          </div>
          
          <div className="result-section">
            <h4>🔧 المكونات المطلوبة:</h4>
            <ul className="components-list">
              {aiResult.components.map((comp, index) => (
                <li key={index}>
                  <span className="comp-name">{comp.name}</span>
                  <span className="comp-price">{comp.price} {t('currency')}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="result-section pricing">
            <div className="price-row">
              <span>تكلفة المكونات:</span>
              <span>{aiResult.componentsCost} {t('currency')}</span>
            </div>
            <div className="price-row">
              <span>تكلفة العمالة:</span>
              <span>{aiResult.laborCost} {t('currency')}</span>
            </div>
            <div className="price-row">
              <span>عمولة المنصة:</span>
              <span>{aiResult.commission.toFixed(2)} {t('currency')}</span>
            </div>
            <div className="price-row total">
              <span>الإجمالي النهائي:</span>
              <span className="total-price">{aiResult.finalPrice} {t('currency')}</span>
            </div>
          </div>
          
          <div className="result-actions">
            <button onClick={handleBuyComponentsOnly} className="action-btn secondary">
              {t('aiBuyComponents')}
            </button>
            <button onClick={handleRequestFullProject} className="action-btn primary">
              {t('aiFullProject')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AiTool;
