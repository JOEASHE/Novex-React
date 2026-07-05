import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

function ProjectRequest({ handleAddOrder }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const projectData = location.state?.project;

  const [formData, setFormData] = useState({ name: '', whatsapp: '', university: '', notes: '' });

  const ADMIN_WHATSAPP = '201000000000';

  if (!projectData) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#fff' }}>
        <h2>{t('projectNoData')}</h2>
        <button onClick={() => navigate('/ai')} style={{ padding: '10px 20px', backgroundColor: '#f0b429', cursor: 'pointer', border: 'none', borderRadius: '5px' }}>
          {t('projectBackToAi')}
        </button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const trackingCode = 'PRJ-' + Math.floor(100000 + Math.random() * 900000);

    const newOrder = {
      code: trackingCode,
      type: t('projectType'),
      projectName: projectData.projectName,
      total: projectData.finalPrice,
      customerDetails: formData,
      status: t('projectStatus'),
      date: new Date().toLocaleDateString(),
    };

    handleAddOrder(newOrder);

    const whatsappMessage = `
${t('projectWhatsappGreeting')}
*${t('trackCode')}* ${trackingCode}
*${t('trackProjectName')}* ${projectData.projectName}
*${t('projectName')}* ${formData.name}
*${t('trackUniversity')}* ${formData.university}
*${t('projectWhatsapp')}* ${formData.whatsapp}
*${t('trackTotal')}* ${projectData.finalPrice} ${t('currency')}
*${t('projectNotes')}* ${formData.notes || t('projectWhatsappNoNotes')}
    `.trim();

    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');

    navigate('/track-projects', { state: { code: trackingCode } });
  };

  const inputStyle = { width: '100%', padding: '12px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#222', color: '#fff' };

  return (
    <div style={{ padding: '40px 20px', minHeight: '80vh', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', color: '#f0b429', marginBottom: '10px' }}>{t('projectTitle')}</h2>
      <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '30px' }}>{t('projectSubtitle')}</p>

      <div style={{ backgroundColor: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333', marginBottom: '30px' }}>
        <h4 style={{ color: '#fff', margin: '0 0 15px 0' }}>{t('projectSummary')}</h4>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f0b429', fontWeight: 'bold', fontSize: '18px' }}>
          <span>{t('projectTotal')}</span> <span>{projectData.finalPrice} {t('currency')}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input type="text" required placeholder={t('projectName')} style={inputStyle} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        <input type="tel" required placeholder={t('projectWhatsapp')} style={inputStyle} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} />
        <input type="text" required placeholder={t('projectUniversity')} style={inputStyle} onChange={(e) => setFormData({ ...formData, university: e.target.value })} />
        <textarea placeholder={t('projectNotes')} rows="3" style={{ ...inputStyle, resize: 'none' }} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} />
        <button type="submit" style={{ padding: '15px', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '5px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
          {t('projectSubmit')}
        </button>
      </form>
    </div>
  );
}

export default ProjectRequest;
