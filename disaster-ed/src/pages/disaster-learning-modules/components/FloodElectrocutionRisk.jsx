import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloodElectrocutionRisk = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/FloodEvacuationSafety'); // Update as needed
  };

  const handleNext = () => {
    navigate('/disaster-learning-modules/FloodRescueAid'); // Update as needed
  };

  return (
    <div style={{
      maxWidth: 1000,
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
          src="/assets/images/image13.png"
          alt="Electrocution Risk in Floods"
          style={{
            width: '100%',
            maxWidth: 500,
            height: 'auto',
            borderRadius: 12,
            marginBottom: 32,
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)',
          }}
        />
        <h2 style={{
          fontSize: 32,
          fontWeight: 700,
          marginBottom: 24,
          color: '#388e3c'
        }}>
          Electrocution Risk in Floods
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 1000 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Poles can carry live electricity.</strong></li>
            <li><strong>Floodwater conducts electricity:</strong> Touching poles or water near them is dangerous.</li>
            <li><strong>Downed Power Lines:</strong> Storms can bring down power lines. These lines are extremely hazardous, even if they look harmless. Assume all downed lines are live and avoid them.</li>
            <li><strong>Unseen Hazards:</strong> Floodwater hides what's underneath. You can't see electrical current in water. It's impossible to know if water near a pole is electrified.</li>
            <li><strong>Structural Instability:</strong> Poles can be weakened by floods and strong winds. They might collapse unexpectedly. Keep a safe distance to avoid falling debris.</li>
            <li><strong>Reporting Danger:</strong> If you see a downed line or damaged pole, report it. Call emergency services or your utility company. Do not approach; let professionals handle it.</li>
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

export default FloodElectrocutionRisk;
