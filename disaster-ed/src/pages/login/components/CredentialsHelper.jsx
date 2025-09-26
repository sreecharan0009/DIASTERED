import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CredentialsHelper = () => {
  const [isVisible, setIsVisible] = useState(false);

  const credentials = [
    {
      role: 'Student',
      email: 'student@school.edu.in',
      password: 'Student@123',
      description: 'Access learning modules and assessments',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      role: 'Staff',
      email: 'staff@school.edu.in',
      password: 'Staff@123',
      description: 'Manage classes and monitor student progress',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      role: 'Administrator',
      email: 'admin@school.edu.in',
      password: 'Admin@123',
      description: 'Full system access and user management',
      color: 'text-error',
      bgColor: 'bg-error/10'
    }
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard?.writeText(text)?.then(() => {
      // Could add a toast notification here
    });
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsVisible(!isVisible)}
        iconName="HelpCircle"
        iconPosition="left"
        className="mb-4"
      >
        Demo Credentials
      </Button>
      {/* Credentials Panel */}
      {isVisible && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevated p-4 z-10">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-card-foreground">Demo Login Credentials</h4>
            <button
              onClick={() => setIsVisible(false)}
              className="text-muted-foreground hover:text-card-foreground transition-quick"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
          
          <div className="space-y-3">
            {credentials?.map((cred, index) => (
              <div key={index} className={`p-3 rounded-lg ${cred?.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-medium ${cred?.color}`}>{cred?.role}</span>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => copyToClipboard(cred?.email)}
                      className="p-1 hover:bg-white/20 rounded transition-quick"
                      title="Copy email"
                    >
                      <Icon name="Mail" size={14} />
                    </button>
                    <button
                      onClick={() => copyToClipboard(cred?.password)}
                      className="p-1 hover:bg-white/20 rounded transition-quick"
                      title="Copy password"
                    >
                      <Icon name="Key" size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-xs space-y-1">
                  <div className="font-mono bg-white/20 px-2 py-1 rounded">
                    <strong>Email:</strong> {cred?.email}
                  </div>
                  <div className="font-mono bg-white/20 px-2 py-1 rounded">
                    <strong>Password:</strong> {cred?.password}
                  </div>
                  <div className="text-muted-foreground mt-1">
                    {cred?.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-3 p-2 bg-muted/50 rounded text-xs text-muted-foreground">
            <Icon name="Info" size={12} className="inline mr-1" />
            These are demo credentials for testing purposes only.
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;