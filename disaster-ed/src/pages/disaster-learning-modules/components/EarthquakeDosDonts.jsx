import React from 'react';
import { useNavigate } from 'react-router-dom';

const EarthquakeDosDonts = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/EarthquakeHelpFriends');
  };

  return (
  <div 
    style={{
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
          src="/assets/images/image10.jpg"
          alt="Earthquake Dos and Donts"
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
          Earthquake Safety: Do's & Don'ts
        </h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: 1000,
        }}>
          <div style={{ textAlign: 'justify', width: '47%' }}>
            <h3 style={{ color: "#388e3c", marginBottom: 16 }}>Do's</h3>
            <ul style={{ fontSize: 18, lineHeight: 1.7, paddingLeft: 18, marginBottom: 0 }}>
              <li><strong>Drop, Cover, and Hold On:</strong> The most important rule. Drop to the ground, get under a sturdy table or desk, and hold on until the shaking stops.</li>
              <li><strong>Stay calm:</strong> Panic can lead to poor decisions.</li>
              <li><strong>Stay indoors:</strong> If you are inside, don't run outside. The greatest danger is often from falling debris as you try to exit.</li>
              <li><strong>Stay in the open:</strong> If you are outside, move to an open area away from buildings, trees, and power lines.</li>
              <li><strong>Expect aftershocks:</strong> Be prepared for more shaking after the main quake.</li>
              <li><strong>Check for injuries:</strong> Once the shaking stops, check yourself and those around you for injuries.</li>
              <li><strong>Use a whistle or shout:</strong> If you are trapped, try to signal for help.</li>
            </ul>
          </div>
          <div style={{ textAlign: 'justify', width: '47%' }}>
            <h3 style={{ color: "#d32f2f", marginBottom: 16 }}>Don'ts</h3>
            <ul style={{ fontSize: 18, lineHeight: 1.7, paddingLeft: 18, marginBottom: 0 }}>
              <li><strong>Don't run outside:</strong> You are more likely to be injured by falling debris, glass, or other objects as you try to exit a building.</li>
              <li><strong>Don't use elevators:</strong> They may stop working, trapping you inside.</li>
              <li><strong>Don't stand in doorways:</strong> This is an outdated and unsafe tip. Modern doorways are no safer than other parts of a room and offer no protection from flying debris.</li>
              <li><strong>Don't light candles or matches:</strong> There could be a gas leak, which could cause a fire or explosion.</li>
              <li><strong>Don't use the phone unnecessarily:</strong> Keep phone lines clear for emergency services. Use text messages if you need to communicate.</li>
              <li><strong>Don't re-enter damaged buildings:</strong> Wait for authorities to declare the building safe.</li>
              <li><strong>Don't panic:</strong> Keep a clear head to make quick, safe decisions.</li>
            </ul>
          </div>
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

export default EarthquakeDosDonts;
