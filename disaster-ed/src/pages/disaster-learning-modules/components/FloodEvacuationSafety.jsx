import React from 'react';
import { useNavigate } from 'react-router-dom';

const FloodEvacuationSafety = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/flood-preparedness'); // Update as needed
  };

  const handleNext = () => {
    navigate('/disaster-learning-modules/FloodElectrocutionRisk'); // Update as needed
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
          src="/assets/images/image12.png"
          alt="Flood Evacuation Safety"
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
          Flood Evacuation Safety
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 1000 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Stop and Assess Your Surroundings:</strong> Stop running. Quickly observe water level and currents.</li>
            <li><strong>Seek Higher Ground Immediately:</strong> Move to the nearest high, stable ground. Avoid rising water areas.</li>
            <li><strong>Avoid Walking or Driving Through Floodwaters:</strong> Don't walk through water; hazards are hidden. Never drive through floods; vehicles can be swept away.</li>
            <li><strong>Be Aware of Currents:</strong> Watch for strong, invisible currents. Move diagonally with current to safety, don't fight it.</li>
            <li><strong>Look Out for Debris and Hazards:</strong> Avoid downed power lines. Watch for chemicals, animals, and floating objects.</li>
            <li><strong>Stay with Others if Possible:</strong> Stay with your group. Signal for help if alone or stranded.</li>
            <li><strong>Do Not Enter Buildings in Floodwaters:</strong> Avoid submerged buildings; they might be unsafe.</li>
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

export default FloodEvacuationSafety;
