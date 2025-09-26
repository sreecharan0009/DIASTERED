import React from 'react';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import BackgroundPattern from './components/BackgroundPattern';
import CredentialsHelper from './components/CredentialsHelper';

const LoginPage = () => {
  return (
    <>
      <Helmet>
        <title>Login - DisasterEd India | Disaster Preparedness Education Platform</title>
        <meta name="description" content="Secure login to DisasterEd India - Access disaster preparedness education modules, virtual drills, and emergency management tools for Indian schools and colleges." />
        <meta name="keywords" content="disaster education login, emergency preparedness, school safety, India education, NDMA certified" />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        {/* Background Pattern */}
        <BackgroundPattern />
        
        {/* Main Content */}
        <div className="relative z-10 min-h-screen flex">
          {/* Left Side - Login Form */}
          <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-md">
              {/* Demo Credentials Helper */}
              <div className="mb-6">
                <CredentialsHelper />
              </div>
              
              {/* Login Form */}
              <LoginForm />
            </div>
          </div>

          {/* Right Side - Trust Signals (Hidden on mobile) */}
          <div className="hidden lg:flex flex-1 items-center justify-center p-8 bg-muted/30 backdrop-blur-sm">
            <div className="w-full max-w-md">
              <TrustSignals />
            </div>
          </div>
        </div>

        {/* Mobile Trust Signals */}
        <div className="lg:hidden relative z-10 p-4 bg-muted/30 backdrop-blur-sm">
          <div className="max-w-md mx-auto">
            <TrustSignals />
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 bg-card/80 backdrop-blur-sm border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>© {new Date()?.getFullYear()} DisasterEd India</span>
                <span>•</span>
                <span>Powered by NDMA Guidelines</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="text-muted-foreground hover:text-primary transition-quick">
                  Privacy Policy
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="#" className="text-muted-foreground hover:text-primary transition-quick">
                  Terms of Service
                </a>
                <span className="text-muted-foreground">•</span>
                <a href="#" className="text-muted-foreground hover:text-primary transition-quick">
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;