import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmergencyGetHelp = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/FloodRescueAid');
  };

  return (
    <div style={{
      maxWidth: 1000,
      margin: '40px auto',
      background: '#fff',
      borderRadius: 16,
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
      padding: '32px 32px 64px 32px',
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
          src="/assets/images/image15.png"
          alt="Getting Help in an Emergency"
          style={{
            width: '100%',
            maxWidth: 400,
            height: 'auto',
            borderRadius: 12,
            marginBottom: 32,
            boxShadow: '0 2px 12px rgba(0,0,0,0.10)'
          }}
        />
        <h2 style={{
          fontSize: 30,
          fontWeight: 700,
          marginBottom: 24,
          color: '#d32f2f'
        }}>
          Emergency: Getting Help Safely
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 800 }}>
          <ol style={{ fontSize: 19, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Don't Go Near:</strong> Stay a safe distance away from the injured person or dangerous area.</li>
            <li><strong>Call for Help:</strong> Immediately call emergency services (like 911 or your local emergency number). Tell them exactly what happened and where you are.</li>
            <li><strong>Find an Adult:</strong> If an adult is nearby, tell them what you saw and let them take charge.</li>
            <li><strong>Stay Calm:</strong> Try to remain calm and speak clearly when you get help.</li>
            <li><strong>Follow Instructions:</strong> If an adult or emergency responder gives you instructions, listen carefully and follow them.</li>
          </ol>
        </div>
      </div>
      <button
        onClick={handlePrevious}
        style={{
          position: 'absolute',
          bottom: 10,
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

export default EmergencyGetHelp;
