import React from 'react';
import { useNavigate } from 'react-router-dom';

const FireSafety = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/disaster-learning-modules/fire-safety-training');
  };

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  return (
    <div style={{
      maxWidth: 800,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      padding: '32px 32px 80px 32px',
      position: 'relative',
    }}>
    
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
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img
          src="/assets/images/image.png"
          alt="Fire Safety"
          style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 12, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
        />
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#d32f2f' }}>
          Emergency Evacuation Protocol <span role="img" aria-label="alert">🚨</span>
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 500 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Stay Calm:</strong> Don't panic.</li>
            <li><strong>Go to the Nearest Exit:</strong> Find the closest exit.</li>
            <li><strong>Stay Out:</strong> Don't go back inside.</li>
            <li><strong>Go to Meeting Point:</strong> Meet up at the designated spot.</li>
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

export default FireSafety;