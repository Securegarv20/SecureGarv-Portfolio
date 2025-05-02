
import { useState, useEffect } from 'react';
import { Menu, X, Github, Mail, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isOpen && !target.closest('.mobile-sidebar') && !target.closest('.mobile-menu-button')) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="glass p-3 rounded-full mobile-menu-button"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 right-0 w-72 bg-background/95 backdrop-blur-lg z-50 transform transition-transform duration-300 ease-in-out mobile-sidebar",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="text-xl font-bold">.SecureGarv</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <nav className="flex flex-col gap-6 mb-auto">
            <Link to="/" className="text-lg hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/about" className="text-lg hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/education" className="text-lg hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Education
            </Link>
            <Link to="/projects" className="text-lg hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Projects
            </Link>
            <Link to="/experience" className="text-lg hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Experience
            </Link>
            <Link to="/contact" className="text-lg hover:text-primary transition-colors" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </nav>
          
          <div className="glass p-4 rounded-xl flex justify-center gap-6">
            <a href="https://github.com/Securegarv20" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/garvkamra/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="mailto:garvkamra24@gmail.com" className="hover:text-primary transition-colors">
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsOpen(false)}
      />
    </>
  );
};

export default MobileNav;
