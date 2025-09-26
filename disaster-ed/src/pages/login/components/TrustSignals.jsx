import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'NDMA Certified',
      description: 'National Disaster Management Authority',
      icon: 'Shield',
      color: 'text-success'
    },
    {
      id: 2,
      name: 'CBSE Approved',
      description: 'Central Board of Secondary Education',
      icon: 'Award',
      color: 'text-primary'
    },
    {
      id: 3,
      name: 'UGC Recognized',
      description: 'University Grants Commission',
      icon: 'GraduationCap',
      color: 'text-secondary'
    },
    {
      id: 4,
      name: 'ISO 27001',
      description: 'Information Security Management',
      icon: 'Lock',
      color: 'text-warning'
    }
  ];

  const testimonials = [
    {
      id: 1,
      text: "DisasterEd has transformed our school\'s emergency preparedness. Students are more aware and confident.",
      author: "Dr. Meera Gupta",
      position: "Principal, Delhi Public School",
      rating: 5
    },
    {
      id: 2,
      text: "The virtual drills and interactive modules make disaster education engaging and effective.",
      author: "Prof. Rajesh Singh",
      position: "Safety Officer, IIT Mumbai",
      rating: 5
    }
  ];

  const stats = [
    { label: 'Schools Enrolled', value: '2,500+', icon: 'Building' },
    { label: 'Students Trained', value: '5,00,000+', icon: 'Users' },
    { label: 'Drills Completed', value: '1,50,000+', icon: 'Play' },
    { label: 'States Covered', value: '28', icon: 'MapPin' }
  ];

  return (
    <div className="space-y-8">
      {/* Certifications */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
          Trusted & Certified Platform
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <div key={cert?.id} className="text-center">
              <div className={`w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-2 ${cert?.color}`}>
                <Icon name={cert?.icon} size={20} />
              </div>
              <div className="text-sm font-medium text-card-foreground">
                {cert?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {cert?.description}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
          Impact Across India
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Icon name={stat?.icon} size={16} color="var(--color-primary)" />
              </div>
              <div className="text-lg font-bold text-primary">
                {stat?.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat?.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonials */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
          What Educators Say
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial) => (
            <div key={testimonial?.id} className="border-l-4 border-primary pl-4">
              <div className="flex items-center mb-2">
                {[...Array(testimonial?.rating)]?.map((_, i) => (
                  <Icon key={i} name="Star" size={14} color="var(--color-warning)" />
                ))}
              </div>
              <p className="text-sm text-card-foreground mb-2 italic">
                "{testimonial?.text}"
              </p>
              <div className="text-xs text-muted-foreground">
                <div className="font-medium">{testimonial?.author}</div>
                <div>{testimonial?.position}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Notice */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={18} color="var(--color-success)" />
          <div className="text-sm">
            <div className="font-medium text-card-foreground mb-1">
              Secure & Private
            </div>
            <div className="text-muted-foreground">
              Your data is protected with enterprise-grade security. We comply with Indian data protection regulations and never share personal information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;