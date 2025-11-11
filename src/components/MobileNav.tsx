import { useState, useEffect } from 'react';
import { Menu, X, Github, Mail, Linkedin, LibraryBig } from 'lucide-react';
import { cn } from '@/lib/utils';

const MobileNav = ({ scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      const target = e.target;
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

  // Handle navigation click
  const handleNavClick = (e, section) => {
    e.preventDefault();
    setIsOpen(false);
    
    // Use the scrollToSection function passed from parent
    if (scrollToSection) {
      scrollToSection(e, section);
    } else {
      // Fallback implementation if scrollToSection isn't passed
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      
      // Update URL hash
      window.location.hash = section;
    }
  };

  return (
    <>
      {/* Mobile menu button */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="glass p-3 rounded-full mobile-menu-button mr-3"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            <a href="#home" className="text-lg hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, 'home')}>
              Home
            </a>
            <a href="#about" className="text-lg hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, 'about')}>
              About
            </a>
            <a href="#education" className="text-lg hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, 'education')}>
              Education
            </a>
            <a href="#projects" className="text-lg hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, 'projects')}>
              Projects
            </a>
            <a href="#experience" className="text-lg hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, 'experience')}>
              Experience
            </a>
            <a href="#blog" className="text-lg hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, 'blog')}>
              Blogs
            </a>
            <a href="#testimonials" className="text-lg hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, 'testimonials')}>
              Testimonials
            </a>
            <a href="#contact" className="text-lg hover:text-primary transition-colors" onClick={(e) => handleNavClick(e, 'contact')}>
              Contact
            </a>
          </nav>
          
          <div className="glass p-4 rounded-xl flex justify-center gap-6">
            <a href="https://github.com/Securegarv20" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/garvkamra/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.amazon.in/stores/Garv-Kamra/author/B0FJWL3F7D/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              <LibraryBig className="w-5 h-5" />
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