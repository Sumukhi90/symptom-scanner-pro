import { useState } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { AuthModal } from "@/components/AuthModal";
import { SymptomAnalyzer } from "@/components/SymptomAnalyzer";

const Index = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginClick = () => {
    setAuthMode('login');
    setAuthModalOpen(true);
  };

  const handleSignupClick = () => {
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setAuthModalOpen(false);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      // User is already authenticated, scroll to symptom analyzer or navigate
      return;
    }
    setAuthMode('signup');
    setAuthModalOpen(true);
  };

  if (isAuthenticated) {
    return <SymptomAnalyzer />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLoginClick={handleLoginClick}
        onSignupClick={handleSignupClick}
      />
      
      <HeroSection onGetStarted={handleGetStarted} />
      
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default Index;
