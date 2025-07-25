import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, FileSearch, Clock } from "lucide-react";
import heroImage from "@/assets/medical-hero.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/80" />
      </div>

      <div className="relative z-10 container px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 text-sm font-medium text-primary">
            <Brain className="h-4 w-4" />
            <span>AI-Powered Medical Research</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Revolutionize
            </span>
            <br />
            <span className="text-foreground">Medical Diagnosis</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            AI agent that searches thousands of medical documents, analyzes symptoms, 
            and provides evidence-based insights with probability rankings to save doctors valuable time.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center space-x-2 bg-card border rounded-full px-4 py-2">
              <FileSearch className="h-4 w-4 text-primary" />
              <span>Document Analysis</span>
            </div>
            <div className="flex items-center space-x-2 bg-card border rounded-full px-4 py-2">
              <Brain className="h-4 w-4 text-accent" />
              <span>AI Probability Ranking</span>
            </div>
            <div className="flex items-center space-x-2 bg-card border rounded-full px-4 py-2">
              <Clock className="h-4 w-4 text-success" />
              <span>Save 80% Research Time</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <Button 
              size="lg" 
              variant="medical" 
              onClick={onGetStarted}
              className="text-lg px-8 py-4 h-auto"
            >
              Start Analysis
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="text-lg px-8 py-4 h-auto"
            >
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-16 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-6">Trusted by medical professionals worldwide</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              <div className="text-lg font-semibold">Mayo Clinic</div>
              <div className="text-lg font-semibold">Johns Hopkins</div>
              <div className="text-lg font-semibold">Cleveland Clinic</div>
              <div className="text-lg font-semibold">Mass General</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-primary-glow/40 rounded-full animate-pulse delay-2000" />
      </div>
    </section>
  );
};