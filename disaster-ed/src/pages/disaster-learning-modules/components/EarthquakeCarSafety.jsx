import React from 'react';
import { useNavigate } from 'react-router-dom';

const EarthquakeCarSafety = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/disaster-learning-modules');
  };

  const handlePrevious = () => {
    navigate('/disaster-learning-modules/earthquake-safety'); // Update if your route is different
  };

  const handleNext = () => {
    navigate('/disaster-learning-modules/EarthquakeWheelchairSafety'); // Update this path as needed
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
          src="/assets/images/image7.png"
          alt="Earthquake Car Safety"
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
          Earthquake Safety in Cars
        </h2>
        <div style={{ textAlign: 'justify', width: '100%', maxWidth: 1000 }}>
          <ol style={{ fontSize: 20, lineHeight: 1.7, paddingLeft: 24 }}>
            <li><strong>Your Car is a Shelter:</strong> Think of your car as a temporary shelter. Staying inside can protect you from falling debris, like glass, signs, and light poles.</li>
            <li><strong>Find Open Space:</strong> Your primary goal is to get to an open area. This means pulling over to the side of the road and stopping away from buildings, bridges, overpasses, and trees.</li>
            <li><strong>Be Cautious After the Quake:</strong> Once the shaking stops, proceed with extreme caution. The road may be damaged with cracks or fallen objects, and traffic lights might be out. Treat intersections as a four-way stop.</li>
            <li><strong>Use Your Radio:</strong> Tune in to a local news or emergency broadcast radio station for information and instructions from authorities. This will help you understand the situation and where to go.</li>
            <li><strong>Tsunami Awareness:</strong> If you are near a coastal area, an earthquake could trigger a tsunami. After the shaking stops, head for higher ground immediately on foot if you are in a risk zone.</li>
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

export default EarthquakeCarSafety;
