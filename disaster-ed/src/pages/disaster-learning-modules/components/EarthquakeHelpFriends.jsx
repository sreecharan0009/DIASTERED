import React from 'react';
import { useNavigate } from 'react-router-dom';

const EarthquakeHelpFriends = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/EarthquakeWheelchairSafety');
  };

  const handleNext = () => {
    navigate('/disaster-learning-modules/EarthquakeDosDonts');
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
          src="/assets/images/image9.png"
          alt="Earthquake Safety Steps"
          style={{
            width: '100%',
            maxWidth: 500,
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
          color: '#388e3c',
        }}>
          Earthquake: Helping Others Safely
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 1000 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Stay Low and Crawl:</strong> If you need to move to reach someone, stay low to the ground and crawl to avoid falling debris.</li>
            <li><strong>Avoid Running:</strong> Don't run blindly; assess the safest path to your friend.</li>
            <li><strong>Protect Their Head:</strong> If you can reach them, try to help them cover their head and neck, especially if they are unable to do so themselves.</li>
            <li><strong>Wait for Shaking to Stop:</strong> Do not try to move an injured person during the shaking, as it could cause more harm.</li>
            <li><strong>Check for Injuries After:</strong> Once the shaking stops, calmly check your friends for injuries and call for help if needed.</li>
            <li><strong>Move to an Open Area:</strong> Guide everyone to a safe, open space once it's safe to move.</li>
            <li><strong>Listen to Emergency Responders:</strong> Follow all instructions from official emergency personnel.</li>
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

export default EarthquakeHelpFriends;
