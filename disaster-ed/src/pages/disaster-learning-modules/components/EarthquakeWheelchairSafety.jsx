import React from 'react';
import { useNavigate } from 'react-router-dom';

const EarthquakeWheelchairSafety = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/EarthquakeCarSafety');
  };

  const handleNext = () => {
    navigate('/disaster-learning-modules/EarthquakeHelpFriends');
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
          src="/assets/images/image8.png"
          alt="Earthquake Safety for Wheelchair Users"
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
          Earthquake Safety for Wheelchair Users
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 1000 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Lock Your Wheels:</strong> If you use a wheelchair, lock your wheels immediately to prevent it from moving during the shaking.</li>
            <li><strong>Stay in Your Chair or Bed:</strong> If you are in a wheelchair, bed, or recliner, it is often safest to stay there. Trying to transfer or move during the shaking could be more dangerous.</li>
            <li><strong>Cover Up:</strong> Use your arms, a pillow, or a book to cover your head and neck.</li>
            <li><strong>Move Away from Hazards:</strong> If you can, get away from windows, heavy furniture, and other objects that could fall on you.</li>
            <li><strong>Have an Emergency Plan:</strong> It's essential to have a plan in place with family, friends, or a support network who know your needs and can help you.</li>
            <li><strong>Keep a Kit Nearby:</strong> Have an emergency kit with medications, medical supplies, and other necessities that is easy to reach from your bed or chair.</li>
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

export default EarthquakeWheelchairSafety;
