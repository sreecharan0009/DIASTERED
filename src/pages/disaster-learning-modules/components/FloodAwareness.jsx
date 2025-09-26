import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloodAwareness = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/CyclonePowerSafety'); // Update path if needed
  };

  return (
    <div style={{
      maxWidth: 900,
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
          src="/assets/images/image20.png"
          alt="Flood Awareness"
          style={{
            width: '100%',
            maxWidth: 600,
            height: 'auto',
            borderRadius: 12,
            marginBottom: 32,
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
          }}
        />
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 24,
          color: '#1976d2'
        }}>
          Be Aware of Flooding 🌊
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 900 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Move to Higher Ground:</strong> If you live in a low-lying or flood-prone area, move to the highest floor of your home or to a designated shelter on higher ground.</li>
            <li><strong>Do Not Enter Floodwater:</strong> Never walk, swim, or drive through floodwater. Just six inches of moving water can knock you off your feet, and two feet can sweep a car away.</li>
            <li><strong>Watch for Hidden Dangers:</strong> Floodwater can be contaminated with sewage and chemicals. It can also hide dangerous items like debris, broken glass, and downed power lines. Stay out of it at all costs.</li>
          </ol>
        </div>
      </div>
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

export default FloodAwareness;
