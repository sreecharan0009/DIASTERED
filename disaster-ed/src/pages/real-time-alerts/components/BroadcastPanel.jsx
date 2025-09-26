import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const BroadcastPanel = ({ userRole, onSendBroadcast, isVisible, onClose }) => {
  const [broadcastData, setBroadcastData] = useState({
    title: '',
    message: '',
    severity: 'medium',
    type: 'general',
    recipients: [],
    channels: [],
    scheduleTime: '',
    expiryTime: ''
  });

  const [isSending, setIsSending] = useState(false);

  const severityOptions = [
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  const typeOptions = [
    { value: 'emergency', label: 'Emergency Alert' },
    { value: 'drill', label: 'Drill Notification' },
    { value: 'weather', label: 'Weather Update' },
    { value: 'general', label: 'General Announcement' },
    { value: 'maintenance', label: 'Maintenance Notice' }
  ];

  const recipientOptions = [
    { value: 'all', label: 'All Users' },
    { value: 'students', label: 'Students Only' },
    { value: 'staff', label: 'Staff Only' },
    { value: 'admin', label: 'Administrators' },
    { value: 'emergency-team', label: 'Emergency Response Team' }
  ];

  const channelOptions = [
    { value: 'app', label: 'In-App Notification' },
    { value: 'email', label: 'Email' },
    { value: 'sms', label: 'SMS' },
    { value: 'push', label: 'Push Notification' },
    { value: 'public-address', label: 'Public Address System' }
  ];

  const templates = [
    {
      id: 'earthquake-drill',
      title: 'Earthquake Drill Notification',
      message: `Attention all students and staff!\n\nAn earthquake drill will be conducted today at 2:00 PM. Please follow these instructions:\n\n• Drop, Cover, and Hold On when the alarm sounds\n• Evacuate calmly to designated assembly points\n• Wait for further instructions from safety wardens\n\nThis is a mandatory drill for all personnel.`,
      severity: 'medium',
      type: 'drill'
    },
    {
      id: 'weather-warning',
      title: 'Severe Weather Alert',
      message: `Weather Alert: Heavy rainfall and strong winds expected in our area.\n\nPrecautionary measures:\n• Avoid outdoor activities\n• Stay in safe indoor locations\n• Keep emergency supplies ready\n• Monitor official weather updates\n\nStay safe and alert!`,
      severity: 'high',
      type: 'weather'
    },
    {
      id: 'emergency-lockdown',
      title: 'Emergency Lockdown Procedure',
      message: `EMERGENCY LOCKDOWN ACTIVATED\n\nImmediate actions required:\n• Remain in current location\n• Lock doors and windows\n• Stay away from windows\n• Remain quiet and await instructions\n• Do not leave until all-clear is given\n\nThis is not a drill.`,
      severity: 'critical',
      type: 'emergency'
    }
  ];

  const handleInputChange = (field, value) => {
    setBroadcastData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, value, checked) => {
    setBroadcastData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev?.[field], value]
        : prev?.[field]?.filter(item => item !== value)
    }));
  };

  const applyTemplate = (template) => {
    setBroadcastData(prev => ({
      ...prev,
      title: template?.title,
      message: template?.message,
      severity: template?.severity,
      type: template?.type
    }));
  };

  const handleSend = async () => {
    if (!broadcastData?.title || !broadcastData?.message) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSending(true);
    try {
      await onSendBroadcast(broadcastData);
      setBroadcastData({
        title: '',
        message: '',
        severity: 'medium',
        type: 'general',
        recipients: [],
        channels: [],
        scheduleTime: '',
        expiryTime: ''
      });
      onClose();
    } catch (error) {
      console.error('Failed to send broadcast:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (!isVisible || userRole !== 'admin') return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-200 p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-card-foreground flex items-center">
              <Icon name="Radio" size={24} className="mr-3" />
              Broadcast Alert
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
            />
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Quick Templates */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Quick Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {templates?.map(template => (
                <Button
                  key={template?.id}
                  variant="outline"
                  size="sm"
                  onClick={() => applyTemplate(template)}
                  className="text-left h-auto p-3"
                >
                  <div>
                    <div className="font-medium text-sm">{template?.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {template?.type} • {template?.severity}
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Alert Title"
              type="text"
              placeholder="Enter alert title"
              value={broadcastData?.title}
              onChange={(e) => handleInputChange('title', e?.target?.value)}
              required
            />

            <Select
              label="Alert Type"
              options={typeOptions}
              value={broadcastData?.type}
              onChange={(value) => handleInputChange('type', value)}
            />

            <Select
              label="Severity Level"
              options={severityOptions}
              value={broadcastData?.severity}
              onChange={(value) => handleInputChange('severity', value)}
            />

            <Input
              label="Expiry Time (Optional)"
              type="datetime-local"
              value={broadcastData?.expiryTime}
              onChange={(e) => handleInputChange('expiryTime', e?.target?.value)}
            />
          </div>

          {/* Message Content */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Alert Message *
            </label>
            <textarea
              className="w-full h-32 px-3 py-2 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter detailed alert message..."
              value={broadcastData?.message}
              onChange={(e) => handleInputChange('message', e?.target?.value)}
              required
            />
            <div className="text-xs text-muted-foreground mt-1">
              {broadcastData?.message?.length}/500 characters
            </div>
          </div>

          {/* Recipients */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Recipients</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {recipientOptions?.map(option => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={broadcastData?.recipients?.includes(option?.value)}
                  onChange={(e) => handleArrayChange('recipients', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Delivery Channels */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Delivery Channels</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {channelOptions?.map(option => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={broadcastData?.channels?.includes(option?.value)}
                  onChange={(e) => handleArrayChange('channels', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-muted/50 border border-border rounded-lg p-4">
            <h3 className="font-medium text-card-foreground mb-3">Preview</h3>
            <div className={`
              border-2 rounded-lg p-4
              ${broadcastData?.severity === 'critical' ? 'bg-error/10 border-error' :
                broadcastData?.severity === 'high' ? 'bg-warning/10 border-warning' :
                broadcastData?.severity === 'medium'? 'bg-accent/10 border-accent' : 'bg-secondary/10 border-secondary'}
            `}>
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="AlertTriangle" size={20} />
                <span className="font-semibold">{broadcastData?.title || 'Alert Title'}</span>
                <span className="px-2 py-1 text-xs font-medium rounded uppercase">
                  {broadcastData?.severity}
                </span>
              </div>
              <p className="text-sm whitespace-pre-line">
                {broadcastData?.message || 'Alert message will appear here...'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Recipients: {broadcastData?.recipients?.length || 0} groups • 
              Channels: {broadcastData?.channels?.length || 0} selected
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={handleSend}
                loading={isSending}
                iconName="Send"
                iconPosition="left"
                disabled={!broadcastData?.title || !broadcastData?.message}
              >
                Send Broadcast
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BroadcastPanel;