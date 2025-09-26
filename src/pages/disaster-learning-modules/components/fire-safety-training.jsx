import React from 'react';
import { useNavigate } from 'react-router-dom';

const FireSafetyTraining = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handleNext = () => {
    // Update this path for further navigation if needed
    navigate('/disaster-learning-modules/EmergencyTraining');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/fire-safety');
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
          src="/assets/images/image2.png" // Replace with your actual image path if needed
          alt="Fire Safety Training"
          style={{ width: '100%', maxWidth: 500, height: 'auto', borderRadius: 12, marginBottom: 32, boxShadow: '0 2px 12px rgba(0,0,0,0.10)' }}
        />
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#d32f2f' }}>
          Fire Safety Training <span role="img" aria-label="fire">🔥</span>
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 500 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Practice with a Fire Extinguisher:</strong> Learn to use it correctly.</li>
            <li><strong>Remember 'PASS':</strong> It's the simple way to put out a small fire.</li>
            <li><strong>Be Ready:</strong> Know what to do in a fire.</li>
            <li><strong>Stay Safe:</strong> This training helps keep everyone safe.</li>
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
      
    </div>
  );
};

export default FireSafetyTraining;
