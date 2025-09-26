import React from 'react';
import { useNavigate } from 'react-router-dom';

const CycloneEyeSafety = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/StormOfficialWarnings'); // Update as per your flow
  };

  const handleNext = () => {
    navigate('/disaster-learning-modules/CyclonePowerSafety'); // Update as needed for your next step
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
          src="/assets/images/image18.png"
          alt="Eye of Cyclone"
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
          Beware of the Eye of the Storm 🌀
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 900 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Recognize the Lull:</strong> The "eye" of a cyclone is a period of calm with little to no wind and sometimes clear skies. It can last for a few minutes or up to an hour.</li>
            <li><strong>Stay Inside:</strong> Do not be fooled into thinking the storm is over. The eye is a brief break, and the most dangerous part of the cyclone will return with winds from the opposite direction, often with even greater force.</li>
            <li><strong>Make Quick Emergency Repairs:</strong> If you need to make urgent repairs to your shelter, do so only during this calm period and be ready to return to safety immediately.</li>
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

export default CycloneEyeSafety;
