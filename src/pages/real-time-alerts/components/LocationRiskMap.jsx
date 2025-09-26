import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationRiskMap = ({ userLocation, riskData, onLocationChange }) => {
  const [selectedLocation, setSelectedLocation] = useState(userLocation);

  const riskLevels = {
    high: { color: 'bg-error', textColor: 'text-error', label: 'High Risk' },
    medium: { color: 'bg-warning', textColor: 'text-warning', label: 'Medium Risk' },
    low: { color: 'bg-success', textColor: 'text-success', label: 'Low Risk' }
  };

  const locations = [
    {
      id: 'mumbai',
      name: 'Mumbai',
      state: 'Maharashtra',
      coordinates: { lat: 19.0760, lng: 72.8777 },
      risks: {
        flood: 'high',
        earthquake: 'medium',
        cyclone: 'high',
        fire: 'medium',
        heatwave: 'low'
      },
      activeAlerts: 3,
      population: '12.4M'
    },
    {
      id: 'delhi',
      name: 'Delhi',
      state: 'Delhi',
      coordinates: { lat: 28.6139, lng: 77.2090 },
      risks: {
        flood: 'medium',
        earthquake: 'high',
        cyclone: 'low',
        fire: 'medium',
        heatwave: 'high'
      },
      activeAlerts: 1,
      population: '11.0M'
    },
    {
      id: 'bangalore',
      name: 'Bangalore',
      state: 'Karnataka',
      coordinates: { lat: 12.9716, lng: 77.5946 },
      risks: {
        flood: 'medium',
        earthquake: 'low',
        cyclone: 'low',
        fire: 'high',
        heatwave: 'medium'
      },
      activeAlerts: 0,
      population: '8.4M'
    },
    {
      id: 'chennai',
      name: 'Chennai',
      state: 'Tamil Nadu',
      coordinates: { lat: 13.0827, lng: 80.2707 },
      risks: {
        flood: 'high',
        earthquake: 'medium',
        cyclone: 'high',
        fire: 'low',
        heatwave: 'high'
      },
      activeAlerts: 2,
      population: '4.6M'
    }
  ];

  const disasterIcons = {
    flood: 'Waves',
    earthquake: 'Mountain',
    cyclone: 'Wind',
    fire: 'Flame',
    heatwave: 'Sun'
  };

  const currentLocation = locations?.find(loc => loc?.id === selectedLocation) || locations?.[0];

  const handleLocationSelect = (locationId) => {
    setSelectedLocation(locationId);
    onLocationChange(locationId);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft w-full max-w-xl mx-auto">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-card-foreground flex items-center">
          <Icon name="MapPin" size={18} className="mr-2" />
          Location Risk Assessment
        </h3>
      </div>
      <div className="p-4">
        {/* Location Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-card-foreground mb-2">
            Select Location
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <div className="flex flex-wrap gap-2 w-full">
              {locations?.map(location => (
                <Button
                  key={location?.id}
                  variant={selectedLocation === location?.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleLocationSelect(location?.id)}
                  className={`text-left h-auto p-4 min-h-[80px] rounded-xl font-semibold transition-all duration-200 ${selectedLocation === location?.id ? 'shadow-lg scale-105' : ''}`}
                  style={{ minWidth: '140px', flex: '1 1 140px', maxWidth: '220px' }}
                >
                  <div>
                    <div className="font-medium text-base">{location?.name}</div>
                    <div className="text-sm opacity-75">{location?.state}</div>
                    {location?.activeAlerts > 0 && (
                      <div className="flex items-center mt-1">
                        <Icon name="AlertTriangle" size={12} className="mr-1 text-error" />
                        <span className="text-xs text-error">{location?.activeAlerts} alerts</span>
                      </div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Current Location Details */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="font-semibold text-lg text-card-foreground">
                {currentLocation?.name}, {currentLocation?.state}
              </h4>
              <p className="text-sm text-muted-foreground">
                Population: {currentLocation?.population}
              </p>
            </div>
            {currentLocation?.activeAlerts > 0 && (
              <div className="flex items-center space-x-2 px-3 py-2 bg-error/10 text-error rounded-lg">
                <Icon name="AlertTriangle" size={16} />
                <span className="font-medium">{currentLocation?.activeAlerts} Active Alerts</span>
              </div>
            )}
          </div>

          {/* Google Maps Embed */}
          <div className="mb-4 h-48 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title={`${currentLocation?.name} Location`}
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps?q=${currentLocation?.coordinates?.lat},${currentLocation?.coordinates?.lng}&z=12&output=embed`}
            />
          </div>
        </div>

        {/* Risk Assessment Grid */}
        <div>
          <h4 className="font-medium text-card-foreground mb-3">Disaster Risk Levels</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(currentLocation?.risks)?.map(([disaster, risk]) => (
              <div
                key={disaster}
                className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted/50 transition-quick min-w-0"
                style={{ wordBreak: 'break-word' }}
              >
                <div className="flex items-center space-x-3 flex-wrap min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${riskLevels?.[risk]?.color}/10`}>
                    <Icon
                      name={disasterIcons?.[disaster]}
                      size={16}
                      className={riskLevels?.[risk]?.textColor}
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm capitalize">{disaster}</div>
                    <div className="text-xs text-muted-foreground">
                      {disaster === 'heatwave' ? 'Heat Wave' : disaster?.charAt(0)?.toUpperCase() + disaster?.slice(1)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 flex-wrap min-w-0">
                  <div className={`w-3 h-3 rounded-full ${riskLevels?.[risk]?.color}`}></div>
                  <span className={`text-sm font-medium ${riskLevels?.[risk]?.textColor} whitespace-normal`}>
                    {riskLevels?.[risk]?.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Risk Legend */}
      <div className="mt-6 pt-4 border-t border-border">
        <h4 className="font-medium text-card-foreground mb-3">Risk Level Guide</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-error/10 rounded-lg">
            <div className="w-4 h-4 bg-error rounded-full mx-auto mb-2"></div>
            <div className="text-sm font-medium text-error">High Risk</div>
            <div className="text-xs text-muted-foreground">Immediate attention required</div>
          </div>
          <div className="p-3 bg-warning/10 rounded-lg">
            <div className="w-4 h-4 bg-warning rounded-full mx-auto mb-2"></div>
            <div className="text-sm font-medium text-warning">Medium Risk</div>
            <div className="text-xs text-muted-foreground">Monitor conditions</div>
          </div>
          <div className="p-3 bg-success/10 rounded-lg">
            <div className="w-4 h-4 bg-success rounded-full mx-auto mb-2"></div>
            <div className="text-sm font-medium text-success">Low Risk</div>
            <div className="text-xs text-muted-foreground">Normal conditions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationRiskMap;