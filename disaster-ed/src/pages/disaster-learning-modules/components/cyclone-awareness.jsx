import React from 'react';
import { useNavigate } from 'react-router-dom';

const StormShelterSafety = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handleNext = () => {
    navigate('/disaster-learning-modules/StormOfficialWarnings'); // Update as needed
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
          src="/assets/images/image16.png"
          alt="Seek Shelter from Storm"
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
          Stay Indoors and Seek Shelter 🏠
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 1000 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Move to the Safest Room:</strong> Go to an interior room, like a hallway, closet, or bathroom, away from exterior walls, windows, and glass doors. These can shatter and cause serious injury.</li>
            <li><strong>Create a Protective Barrier:</strong> If possible, get under a sturdy table or desk and cover yourself with a mattress, blankets, or rugs for protection against falling debris.</li>
            <li><strong>Avoid Tall Buildings and Mobile Homes:</strong> If you are in a mobile home or a tall building, evacuate to a safer, more solid structure. These are more vulnerable to strong winds.</li>
            <li><strong>Wait for the All-Clear:</strong> Do not leave your shelter until official warnings confirm the storm has passed.</li>
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

export default StormShelterSafety;
