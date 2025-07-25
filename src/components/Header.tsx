import { Button } from "@/components/ui/button";
import { Stethoscope, Menu, User } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onLoginClick: () => void;
  onSignupClick: () => void;
}

export const Header = ({ onLoginClick, onSignupClick }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            MedAnalyzer Pro
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
            How It Works
          </a>
          <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
            Pricing
          </a>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          <Button variant="ghost" onClick={onLoginClick}>
            <User className="h-4 w-4 mr-2" />
            Login
          </Button>
          <Button variant="medical" onClick={onSignupClick}>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col space-y-4 p-4">
            <a href="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Pricing
            </a>
            <div className="flex flex-col space-y-2 pt-4 border-t">
              <Button variant="ghost" onClick={onLoginClick}>
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button variant="medical" onClick={onSignupClick}>
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};