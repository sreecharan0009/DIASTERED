import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const DrillSimulation = ({ 
  scenario, 
  onComplete, 
  onPause, 
  onExit,
  className = '' 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(scenario?.timeLimit || 600);
  const [isPaused, setIsPaused] = useState(false);
  const [userChoices, setUserChoices] = useState([]);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);

  const simulationSteps = [
    {
      id: 1,
      title: "Emergency Alert Received",
      description: "A fire alarm has been triggered in the main building. You are currently in the computer lab on the second floor.",
      imageUrl: "https://images.pexels.com/photos/6980523/pexels-photo-6980523.jpeg",
      question: "What is your immediate first action?",
      options: [
        { id: 'a', text: "Continue working and wait for instructions", points: 0, feedback: "Incorrect. Never ignore emergency alarms." },
        { id: 'b', text: "Stop all activities and assess the situation", points: 10, feedback: "Correct! Always stop and assess during emergencies." },
        { id: 'c', text: "Pack your belongings first", points: 2, feedback: "Partially correct, but time is critical in emergencies." },
        { id: 'd', text: "Call your parents immediately", points: 3, feedback: "Not the immediate priority. Focus on safety first." }
      ]
    },
    {
      id: 2,
      title: "Evacuation Route Selection",
      description: "You need to evacuate the building. There are multiple exit routes available from your current location.",
      imageUrl: "https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg",
      question: "Which evacuation route should you choose?",
      options: [
        { id: 'a', text: "Main staircase (closest to fire source)", points: 0, feedback: "Dangerous! Never use routes near the fire source." },
        { id: 'b', text: "Emergency staircase (furthest from fire)", points: 10, feedback: "Excellent choice! Always use the safest route." },
        { id: 'c', text: "Elevator for quick exit", points: 0, feedback: "Never use elevators during fire emergencies." },
        { id: 'd', text: "Window exit from second floor", points: 1, feedback: "Extremely dangerous. Only as last resort." }
      ]
    },
    {
      id: 3,
      title: "Assisting Others",
      description: "While evacuating, you notice a classmate who seems confused and scared in the hallway.",
      imageUrl: "https://images.pexels.com/photos/8199559/pexels-photo-8199559.jpeg",
      question: "How do you handle this situation?",
      options: [
        { id: 'a', text: "Leave them and evacuate quickly", points: 2, feedback: "Not ideal. We should help others when safely possible." },
        { id: 'b', text: "Guide them to the evacuation route", points: 10, feedback: "Perfect! Help others while ensuring everyone's safety." },
        { id: 'c', text: "Stay with them until help arrives", points: 5, feedback: "Good intention, but continuing evacuation is safer." },
        { id: 'd', text: "Send them in opposite direction", points: 0, feedback: "Dangerous! Never misdirect during emergencies." }
      ]
    },
    {
      id: 4,
      title: "Assembly Point Arrival",
      description: "You have successfully evacuated and reached the designated assembly point in the school playground.",
      imageUrl: "https://images.pexels.com/photos/8199564/pexels-photo-8199564.jpeg",
      question: "What should you do at the assembly point?",
      options: [
        { id: 'a', text: "Wait quietly for further instructions", points: 8, feedback: "Good, but there's more you should do." },
        { id: 'b', text: "Report to your class teacher for attendance", points: 10, feedback: "Excellent! Attendance helps ensure everyone is safe." },
        { id: 'c', text: "Leave the premises immediately", points: 0, feedback: "Never leave without permission during emergencies." },
        { id: 'd', text: "Use your phone to take photos", points: 1, feedback: "Inappropriate during emergency situations." }
      ]
    },
    {
      id: 5,
      title: "Emergency Communication",
      description: "The drill coordinator needs to communicate important information to all participants.",
      imageUrl: "https://images.pexels.com/photos/8199560/pexels-photo-8199560.jpeg",
      question: "How should you respond to emergency communications?",
      options: [
        { id: 'a', text: "Listen carefully and follow instructions", points: 10, feedback: "Perfect! Clear communication saves lives." },
        { id: 'b', text: "Ask questions during the announcement", points: 3, feedback: "Wait for the announcement to finish first." },
        { id: 'c', text: "Share information with others nearby", points: 7, feedback: "Good, but ensure accuracy of information." },
        { id: 'd', text: "Continue personal conversations", points: 0, feedback: "Never ignore emergency communications." }
      ]
    }
  ];

  useEffect(() => {
    let timer;
    if (!isPaused && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPaused, timeRemaining]);

  const handleTimeUp = () => {
    const finalScore = Math.round((score / (simulationSteps?.length * 10)) * 100);
    onComplete({
      score: finalScore,
      choices: userChoices,
      timeUsed: (scenario?.timeLimit || 600) - timeRemaining,
      completed: currentStep >= simulationSteps?.length
    });
  };

  const handleOptionSelect = (option) => {
    const newChoice = {
      stepId: simulationSteps?.[currentStep]?.id,
      selectedOption: option?.id,
      points: option?.points,
      feedback: option?.feedback
    };

    setUserChoices([...userChoices, newChoice]);
    setScore(score + option?.points);
    setCurrentFeedback(option);
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      if (currentStep < simulationSteps?.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Drill completed
        const finalScore = Math.round(((score + option?.points) / (simulationSteps?.length * 10)) * 100);
        onComplete({
          score: finalScore,
          choices: [...userChoices, newChoice],
          timeUsed: (scenario?.timeLimit || 600) - timeRemaining,
          completed: true
        });
      }
    }, 3000);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
    if (onPause) onPause(!isPaused);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const currentStepData = simulationSteps?.[currentStep];
  const progressPercentage = ((currentStep + 1) / simulationSteps?.length) * 100;

  if (showFeedback) {
    return (
      <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
        <div className="p-8 text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            currentFeedback?.points >= 8 ? 'bg-success/10' : 
            currentFeedback?.points >= 5 ? 'bg-warning/10' : 'bg-error/10'
          }`}>
            <Icon 
              name={currentFeedback?.points >= 8 ? "CheckCircle" : 
                    currentFeedback?.points >= 5 ? "AlertCircle" : "XCircle"} 
              size={32} 
              className={
                currentFeedback?.points >= 8 ? 'text-success' : 
                currentFeedback?.points >= 5 ? 'text-warning' : 'text-error'
              }
            />
          </div>
          <h3 className="text-xl font-semibold text-card-foreground mb-2">
            {currentFeedback?.points >= 8 ? 'Excellent Choice!' : 
             currentFeedback?.points >= 5 ? 'Good Attempt!' : 'Learning Opportunity'}
          </h3>
          <p className="text-muted-foreground mb-4">{currentFeedback?.feedback}</p>
          <div className="text-2xl font-bold text-primary">
            +{currentFeedback?.points} points
          </div>
          <div className="mt-4 text-sm text-muted-foreground">
            Moving to next scenario...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft ${className}`}>
      {/* Header with Controls */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-card-foreground">{scenario?.title}</h2>
          <span className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
            Step {currentStep + 1} of {simulationSteps?.length}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className={`font-mono ${timeRemaining < 60 ? 'text-error' : 'text-muted-foreground'}`}>
              {formatTime(timeRemaining)}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-primary font-medium">{score} pts</span>
          </div>
          <Button variant="outline" size="sm" onClick={handlePause} iconName={isPaused ? "Play" : "Pause"}>
            {isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button variant="ghost" size="sm" onClick={onExit} iconName="X">
            Exit
          </Button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="px-4 py-2 bg-muted/50">
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="h-2 bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      {/* Main Content */}
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Scenario Visual */}
          <div className="space-y-4">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src={currentStepData?.imageUrl}
                alt={currentStepData?.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-lg font-semibold">{currentStepData?.title}</h3>
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <p className="text-muted-foreground">{currentStepData?.description}</p>
            </div>
          </div>

          {/* Question and Options */}
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <h4 className="font-semibold text-card-foreground mb-2">Decision Point</h4>
              <p className="text-card-foreground">{currentStepData?.question}</p>
            </div>

            <div className="space-y-3">
              {currentStepData?.options?.map((option) => (
                <Button
                  key={option?.id}
                  variant="outline"
                  fullWidth
                  className="h-auto p-4 text-left justify-start hover:bg-primary/5 hover:border-primary/30"
                  onClick={() => handleOptionSelect(option)}
                  disabled={isPaused}
                >
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {option?.id?.toUpperCase()}
                    </span>
                    <span className="text-card-foreground">{option?.text}</span>
                  </div>
                </Button>
              ))}
            </div>

            {/* Help Section */}
            <div className="mt-6 p-4 bg-accent/5 border border-accent/20 rounded-lg">
              <div className="flex items-start space-x-3">
                <Icon name="Lightbulb" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-medium text-card-foreground mb-1">Quick Tip</h5>
                  <p className="text-sm text-muted-foreground">
                    Think about the safety protocols you've learned. Consider the immediate risks and the safest course of action for everyone involved.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Pause Overlay */}
      {isPaused && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
          <div className="bg-card p-6 rounded-lg shadow-elevated text-center">
            <Icon name="Pause" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Drill Paused</h3>
            <p className="text-muted-foreground mb-4">Take your time to think through the scenario</p>
            <Button onClick={handlePause} iconName="Play">
              Resume Drill
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DrillSimulation;