import React from 'react';
import { useNavigate } from 'react-router-dom';

const StormOfficialWarnings = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/cyclone-awareness'); // Link to your previous file here
  };

  const handleNext = () => {
    navigate('/disaster-learning-modules/CycloneEyeSafety'); // Update as needed for your next file
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
          src="/assets/images/image17.png"
          alt="Official Disaster Warnings"
          style={{
            width: '100%',
            maxWidth: 500,
            height: 'auto',
            borderRadius: 12,
            marginBottom: 32,
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
          }}
        />
        <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 24, color: '#388e3c' }}>
          Listen to Official Warnings 📻
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 1000 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Use a Battery-Powered Radio:</strong> Power outages are common. A battery-operated or hand-crank radio is your lifeline for receiving official updates from emergency services.</li>
            <li><strong>Follow Evacuation Orders:</strong> If authorities issue an evacuation order, leave immediately. They have determined that your location is unsafe, and the risk of staying is too high.</li>
            <li><strong>Ignore Rumors:</strong> In a disaster, false information spreads quickly. Only trust information from official sources like government agencies and recognized news outlets.</li>
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

export default StormOfficialWarnings;
