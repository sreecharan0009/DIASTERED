import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyTraining = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handleNext = () => {
    // Update this path to the proper next module/page as needed
    navigate('/disaster-learning-modules/FireBlanketTraining');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/fire-safety-training');
  };

  return (
    <div
      style={{
        maxWidth: 800,
        margin: '40px auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '32px 32px 80px 32px',
        position: 'relative',
      }}
    >
      <button
      onClick={handleBack}
      style={{
        position: 'absolute',
        top: 10,
        left: 10,
        background: '#1976d2',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '8px 20px',
        fontSize: 16,
        fontWeight: 600,
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
      }}
    >
      &#8592; Back
    </button>

    <button
        onClick={handlePrevious}
        style={{
          position: 'absolute',
          bottom: 24,
          left: 32,
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 32px',
          fontSize: 18,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
        }}
      >
        &#8592; Previous
      </button>
      
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src="/assets/images/image3.png"
          alt="Emergency Panic Example"
          style={{
            width: '100%',
            maxWidth: 500,
            height: 'auto',
            borderRadius: 12,
            marginBottom: 32,
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
          }}
        />
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#d32f2f' }}>
          During an Emergency <span role="img" aria-label="alert">🚨</span>
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 500 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Don't Panic:</strong> Stay calm to help yourself and others.</li>
            <li><strong>Avoid Crowds:</strong> Do not run with a panicked group.</li>
            <li><strong>Look for a Safe Route:</strong> Find a clear path away from danger.</li>
            <li><strong>Ask for Help:</strong> Shout for help if you are trapped.</li>
          </ol>
        </div>
      </div>
      <button
        onClick={handleNext}
        style={{
          position: 'absolute',
          bottom: 24,
          right: 32,
          background: '#1976d2',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '12px 32px',
          fontSize: 18,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
        }}
      >
        Next
      </button>
    </div>
  );
};

export default EmergencyTraining;
