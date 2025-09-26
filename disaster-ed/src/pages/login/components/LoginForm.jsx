import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different roles
  const mockCredentials = {
    student: { email: 'student@school.edu.in', password: 'Student@123' },
    staff: { email: 'staff@school.edu.in', password: 'Staff@123' },
    admin: { email: 'admin@school.edu.in', password: 'Admin@123' }
  };

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'staff', label: 'Staff Member' },
    { value: 'admin', label: 'Administrator' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Check credentials
      const roleCredentials = mockCredentials?.[formData?.role];
      if (formData?.email === roleCredentials?.email && formData?.password === roleCredentials?.password) {
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify({
          email: formData?.email,
          role: formData?.role,
          name: formData?.role === 'admin' ? 'Dr. Rajesh Kumar' : 
                formData?.role === 'staff' ? 'Prof. Priya Sharma' : 'Arjun Patel',
          loginTime: new Date()?.toISOString()
        }));

        // Navigate based on role
        switch (formData?.role) {
          case 'admin': navigate('/admin-dashboard');
            break;
          case 'staff': navigate('/disaster-learning-modules');
            break;
          case 'student': navigate('/disaster-learning-modules');
            break;
          default:
            navigate('/disaster-learning-modules');
        }
      } else {
        setErrors({
          general: `Invalid credentials. Use: ${roleCredentials?.email} / ${roleCredentials?.password}`
        });
      }
    } catch (error) {
      setErrors({
        general: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to forgot password page
    alert('Password recovery feature will be available soon. Please contact your institution administrator.');
  };

  const handleRegister = () => {
    // In a real app, this would navigate to registration page
    alert('New user registration is handled by your institution administrator. Please contact them for account creation.');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border rounded-lg shadow-elevated p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={32} color="white" strokeWidth={2.5} />
          </div>
          <h1 className="text-2xl font-bold text-card-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your disaster preparedness dashboard
          </p>
        </div>

        {/* Error Message */}
        {errors?.general && (
          <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={18} color="var(--color-error)" />
              <span className="text-error text-sm font-medium">
                {errors?.general}
              </span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Role Selection */}
          <Select
            label="Select Your Role"
            placeholder="Choose your role"
            options={roleOptions}
            value={formData?.role}
            onChange={(value) => handleInputChange('role', value)}
            error={errors?.role}
            required
          />

          {/* Email Input */}
          <Input
            label="Email Address"
            type="email"
            placeholder="Enter your institutional email"
            value={formData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            required
          />

          {/* Password Input */}
          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={(e) => handleInputChange('password', e?.target?.value)}
            error={errors?.password}
            required
          />

          {/* Remember Me */}
          <div className="flex items-center justify-between">
            <Checkbox
              label="Remember me"
              checked={formData?.rememberMe}
              onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
            />
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-quick"
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            variant="default"
            fullWidth
            loading={isLoading}
            iconName="LogIn"
            iconPosition="right"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            New to the platform?{' '}
            <button
              onClick={handleRegister}
              className="text-primary hover:text-primary/80 font-medium transition-quick"
            >
              Contact Administrator
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;