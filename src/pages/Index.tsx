import { useRef, useState, useEffect, useMemo } from "react";
import { toast } from 'react-hot-toast';
import { TypeAnimation } from 'react-type-animation';
import { ArrowRight, Shield, Code, GraduationCap, User, Brain, Rocket, Briefcase, Mail, Github, Linkedin, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import MainNav from "../components/MainNav";
import MarqueeSkills from "../components/MarqueeSkills";
import ProjectCard from "../components/ProjectCard";
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import FilterButton from "../components/FilterButton";

// API configuration - Update this with your backend URL
const API_URL = import.meta.env.VITE_API_URL;

// Types
interface HeroContent {
  typewriterTexts: string[];
  heroSubtitle: string;
  heroParagraph: string;
    resume: {
    url: string;
    fileName: string;
  };
    about?: AboutContent;
}

interface AboutContent {
  whoIAm: string;
  myExpertise: string;
  myMission: string;
  myJourney: string;
}

interface EducationItem {
  id: string;
  type: 'education' | 'certification' | 'achievement' | 'publication';
  institution: string;
  degree: string;
  period: string;
  description: string;
  certificateLink?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  github?: string;
  liveDemo?: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  period: string;
  description: string;
}

const Index = () => {
  // Refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse effects state
  const [mouseActive, setMouseActive] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Education filter state
  const [activeFilter, setActiveFilter] = useState<'all' | 'education' | 'certification' | 'achievement' | 'publication'>('all');

  // Contact form state
  const [isSending, setIsSending] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // ========== HERO SECTION ==========
  const [heroContent, setHeroContent] = useState<HeroContent>({
    typewriterTexts: [
      "I'm a Front-End Developer",
      "I'm a Cybersecurity Professional",
      "I'm CEH v12 Certified",
      "I'm an Arduino Trainer",
      "I'm a StartUp Founder"
    ],
    heroParagraph: "Hi, I'm Garv! I'm a Cybersecurity professional...",
    resume: {
      url: "https://drive.google.com/file/d/1skRKmA4gnJZiP_EMTxjzdhtWxsrIiRyW/view?usp=sharing",
      fileName: "Garv_Kamra_Resume.pdf"
    }
  });
  const [isLoadingHero, setIsLoadingHero] = useState(true);

  // BACKEND INTEGRATION FOR HERO SECTION (UNCOMMENT WHEN READY)
 useEffect(() => {
  const fetchHeroContent = async () => {
    try {
      setIsLoadingHero(true);
      const response = await fetch(`${API_URL}/api/content`);
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setHeroContent({
        typewriterTexts: data.typewriterTexts || heroContent.typewriterTexts,
        heroParagraph: data.heroParagraph || heroContent.heroParagraph,
        resume: data.resume || heroContent.resume,
        about: data.about || {
          whoIAm: "Hey, I'm Garv Kamra...", // default content
          myExpertise: "I have hands-on experience...", // default content
          myMission: "My mission is to keep learning...", // default content
          myJourney: "Ever since I was a kid..." // default content
        }
      });
    } catch (error) {
      console.error('Error fetching hero content:', error);
      toast.error('Failed to load hero content. Using default values.');
    } finally {
      setIsLoadingHero(false);
    }
  };

  fetchHeroContent();
}, []);

  const typeAnimationSequence = useMemo(() => {
    return heroContent.typewriterTexts.flatMap(text => [text, 2000]);
  }, [heroContent.typewriterTexts]);


  

  // ========== EDUCATION SECTION ==========
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [isLoadingEducation, setIsLoadingEducation] = useState(true);

  /* BACKEND INTEGRATION FOR EDUCATION (UNCOMMENT WHEN READY)
  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const response = await fetch(`${API_URL}/api/education`);
        const data = await response.json();
        setEducation(data);
      } catch (error) {
        console.error('Error fetching education:', error);
        toast.error('Failed to load education data');
      } finally {
        setIsLoadingEducation(false);
      }
    };

    fetchEducation();
  }, []);
  */

  // ========== PROJECTS SECTION ==========
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);

  /* BACKEND INTEGRATION FOR PROJECTS (UNCOMMENT WHEN READY)
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/api/projects`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        toast.error('Failed to load projects');
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, []);
  */

  // ========== EXPERIENCE SECTION ==========
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoadingExperiences, setIsLoadingExperiences] = useState(true);

  /* BACKEND INTEGRATION FOR EXPERIENCE (UNCOMMENT WHEN READY)
  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`${API_URL}/api/experiences`);
        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error('Error fetching experiences:', error);
        toast.error('Failed to load experiences');
      } finally {
        setIsLoadingExperiences(false);
      }
    };

    fetchExperiences();
  }, []);
  */

  // Mouse effect handlers
  useEffect(() => {
    const gridContainer = gridRef.current;
    const glowElement = glowRef.current;
    
    if (!gridContainer || !glowElement) return;
    
    const createGridPoints = () => {
      const gridPointsContainer = document.createElement('div');
      gridPointsContainer.className = 'grid-points';
      gridContainer.appendChild(gridPointsContainer);
      
      const containerWidth = gridContainer.offsetWidth;
      const containerHeight = gridContainer.offsetHeight;
      
      const cols = Math.floor(containerWidth / 40);
      const rows = Math.floor(containerHeight / 40);
      
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const point = document.createElement('div');
          point.className = 'grid-point';
          point.style.left = `${i * 40}px`;
          point.style.top = `${j * 40}px`;
          point.style.opacity = (Math.random() * 0.5 + 0.1).toString();
          gridPointsContainer.appendChild(point);
        }
      }
    };
    
    createGridPoints();
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!gridContainer || !glowElement) return;
      
      const rect = gridContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
      
      glowElement.style.left = `${x}px`;
      glowElement.style.top = `${y}px`;
      glowElement.style.opacity = '1';
      glowElement.style.transition = 'opacity 0.5s ease, transform 0.3s ease';
      
      const points = document.querySelectorAll('.grid-point');
      points.forEach((point) => {
        const pointRect = (point as HTMLElement).getBoundingClientRect();
        const pointX = pointRect.left - rect.left + pointRect.width / 2;
        const pointY = pointRect.top - rect.top + pointRect.height / 2;
        
        const distance = Math.sqrt(Math.pow(pointX - x, 2) + Math.pow(pointY - y, 2));
        const maxDistance = 200;
        
        if (distance < maxDistance) {
          const intensity = 1 - (distance / maxDistance);
          (point as HTMLElement).style.opacity = Math.min(0.1 + intensity * 0.9, 1).toString();
          (point as HTMLElement).style.transform = `scale(${1 + intensity * 0.6})`;
          (point as HTMLElement).style.filter = `blur(${Math.max(0, 0.5 - intensity)}px)`;
        } else {
          (point as HTMLElement).style.opacity = "0.1";
          (point as HTMLElement).style.transform = "scale(1)";
          (point as HTMLElement).style.filter = "blur(0.5px)";
        }
      });
      
      setMouseActive(true);
    };
    
    const handleMouseLeave = () => {
      if (!glowElement) return;
      glowElement.style.opacity = '0';
      
      const points = document.querySelectorAll('.grid-point');
      points.forEach((point) => {
        (point as HTMLElement).style.opacity = (Math.random() * 0.2 + 0.1).toString();
        (point as HTMLElement).style.transform = "scale(1)";
        (point as HTMLElement).style.filter = "blur(0.5px)";
      });
      
      setMouseActive(false);
    };
    
    gridContainer.addEventListener('mousemove', handleMouseMove);
    gridContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      gridContainer.removeEventListener('mousemove', handleMouseMove);
      gridContainer.addEventListener('mouseleave', handleMouseLeave);
      
      const gridPointsContainer = gridContainer.querySelector('.grid-points');
      if (gridPointsContainer) {
        gridContainer.removeChild(gridPointsContainer);
      }
    };
  }, []);

  // Contact form handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all fields');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email');
      return;
    }

    setIsSending(true);

    const formDataToSend = new FormData();
    formDataToSend.append('access_key', 'e8b33d14-ea31-444c-8b34-b9709b50505e');
    formDataToSend.append('name', formData.name);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('message', formData.message);
    formDataToSend.append('subject', 'New Query from Portfolio Website');
    formDataToSend.append('botcheck', '');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataToSend
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || 'Failed to send message. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filter education items
  const filteredEducation = activeFilter === 'all' 
    ? education 
    : education.filter(item => item.type === activeFilter);

  const counts = {
    all: education.length,
    education: education.filter(item => item.type === 'education').length,
    certification: education.filter(item => item.type === 'certification').length,
    achievement: education.filter(item => item.type === 'achievement').length,
    publication: education.filter(item => item.type === 'publication').length
  };

  const getIcon = (type: 'education' | 'certification' | 'achievement' | 'publication') => {
    switch (type) {
      case 'education': return <GraduationCap className="w-6 h-6 text-white" />;
      case 'certification': return <Code className="w-6 h-6 text-white" />;
      case 'achievement': return <Shield className="w-6 h-6 text-white" />;
      case 'publication': return <ArrowRight className="w-6 h-6 text-white" />;
      default: return <GraduationCap className="w-6 h-6 text-white" />;
    }
  };

  const getIconBgClass = (type: 'education' | 'certification' | 'achievement' | 'publication') => {
    switch (type) {
      case 'education': return 'bg-purple-500';
      case 'certification': return 'bg-blue-500';
      case 'achievement': return 'bg-amber-500';
      case 'publication': return 'bg-emerald-500';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <MainNav />

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32">
        <div ref={gridRef} className="absolute inset-0 grid-background">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute w-[200%] h-[200%] -left-[50%] -top-[50%] bg-primary/10 blur-[200px] opacity-70 animate-pulse-slow"></div>
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[150px] animate-pulse-slow"></div>
            <div className="absolute top-1/4 left-20 w-[500px] h-[500px] bg-[#6E59A5]/30 rounded-full blur-[180px] animate-pulse-slow"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/20 to-background z-10"></div>
          <div 
            ref={glowRef} 
            className="grid-glow absolute w-[400px] h-[400px] rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(155,135,245,0.3) 0%, rgba(155,135,245,0.1) 40%, transparent 70%)',
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.5s ease, transform 0.3s ease',
              opacity: mouseActive ? 1 : 0
            }}
          />
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: mouseActive 
                ? `radial-gradient(circle 800px at ${mousePosition.x}px ${mousePosition.y}px, rgba(155,135,245,0.15), transparent 70%)`
                : 'transparent',
              transition: 'background 0.3s ease'
            }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          {/* Mobile Avatar */}
          <div className="lg:hidden flex flex-col items-center animate-fade-in mb-12">
            <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden relative glass p-1 glow-border">
              <img
                src="/hero.png"
                alt="Garv Kamra"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in text-center lg:text-left">
              {isLoadingHero ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-6 bg-gray-200 rounded w-5/6"></div>
                </div>
              ) : (
                <>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                    <span className="text-gradient-primary">Hello</span>,{" "}
                    <TypeAnimation
                      sequence={typeAnimationSequence}
                      wrapper="span"
                      speed={50}
                      repeat={Infinity}
                    />
                  </h1>
                  <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                    {heroContent.heroParagraph}
                  </p>
                </>
              )}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href={heroContent.resume.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 bg-primary text-white rounded-lg hover-glow flex items-center justify-center gap-2 group"
                >
                  Download Resume
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 glass rounded-lg hover:bg-white/20 transition-colors"
                >
                  Get in touch
                </a>
              </div>
            </div>
            
            {/* Desktop Avatar */}
            <div className="hidden lg:flex flex-col items-center animate-fade-in">
              <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden relative glass p-1 glow-border">
                <img
                  src="/hero.png"
                  alt="Garv Kamra"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl">
                <div className="glass p-4 rounded-lg text-center hover-glow-subtle">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium mb-1">Cybersecurity</h3>
                  <p className="text-xs text-muted-foreground">CEH v12 Certified</p>
                </div>
                <div className="glass p-4 rounded-lg text-center hover-glow-subtle">
                  <Code className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium mb-1">Front-End</h3>
                  <p className="text-xs text-muted-foreground">React & JavaScript</p>
                </div>
                <div className="glass p-4 rounded-lg text-center hover-glow-subtle">
                  <GraduationCap className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium mb-1">Arduino</h3>
                  <p className="text-xs text-muted-foreground">5+ Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              About <span className="text-gradient-primary">Me</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get to know me, my skills, and what drives my passion for cybersecurity and development.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div 
              className="glass p-8 rounded-2xl transform hover:scale-105 transition-all duration-300" 
              style={{ 
                transform: "perspective(1000px) rotateX(0deg)",
                transition: "transform 0.5s ease",
                willChange: "transform"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / 20;
                const rotateY = (x - rect.width / 2) / 20;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Who I Am</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {heroContent.about?.whoIAm || "Loading..."}
              </p>
            </motion.div>

            <motion.div 
              className="glass p-8 rounded-2xl transform hover:scale-105 transition-all duration-300"
              style={{ 
                transform: "perspective(1000px) rotateX(0deg)",
                transition: "transform 0.5s ease",
                willChange: "transform"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / 20;
                const rotateY = (x - rect.width / 2) / 20;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">My Expertise</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {heroContent.about?.myExpertise || "Loading..."}
              </p>
            </motion.div>

            <motion.div 
              className="glass p-8 rounded-2xl transform hover:scale-105 transition-all duration-300"
              style={{ 
                transform: "perspective(1000px) rotateX(0deg)",
                transition: "transform 0.5s ease",
                willChange: "transform"
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              onMouseEnter={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const rotateX = (y - rect.height / 2) / 20;
                const rotateY = (x - rect.width / 2) / 20;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Rocket className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">My Mission</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                {heroContent.about?.myMission || "Loading..."}
              </p>
            </motion.div>
          </div>

          <motion.div 
            className="glass p-8 rounded-2xl max-w-4xl mx-auto mb-16 transform hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ 
              transform: "perspective(1000px) rotateX(0deg)",
              transition: "transform 0.5s ease",
              willChange: "transform"
            }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const rotateX = (y - rect.height / 2) / 20;
              const rotateY = (x - rect.width / 2) / 20;
              e.currentTarget.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
            }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
              My <span className="text-primary">Journey</span>
            </h2>
            <div className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {heroContent.about?.myJourney || "Loading..."}
            </div>
          </motion.div>

          <div className="pt-12 mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              My <span className="text-primary">Skills</span>
            </motion.h2>
            <MarqueeSkills />
          </div>
        </div>
      </section>

      
      <section id="education" className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Education & <span className="text-gradient-primary">Credentials</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A timeline of my educational background, professional certifications, achievements, and publications.
            </p>
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <FilterButton 
              label="All" 
              count={counts.all}
              isActive={activeFilter === 'all'} 
              onClick={() => setActiveFilter('all')} 
            />
            <FilterButton 
              label="Education" 
              count={counts.education}
              isActive={activeFilter === 'education'} 
              onClick={() => setActiveFilter('education')} 
              colorClass="bg-purple-500/20"
            />
            <FilterButton 
              label="Certifications" 
              count={counts.certification}
              isActive={activeFilter === 'certification'} 
              onClick={() => setActiveFilter('certification')} 
              colorClass="bg-blue-500/20"
            />
            {/* <FilterButton 
              label="Achievements" 
              count={counts.achievement}
              isActive={activeFilter === 'achievement'} 
              onClick={() => setActiveFilter('achievement')} 
              colorClass="bg-amber-500/20"
            /> */}
            <FilterButton 
              label="Publications" 
              count={counts.publication}
              isActive={activeFilter === 'publication'} 
              onClick={() => setActiveFilter('publication')} 
              colorClass="bg-emerald-500/20"
            />
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 via-primary/30 to-transparent"></div>
            
            <div className="space-y-8">
              {filteredEducation.map((edu, index) => (
                <motion.div 
                  key={edu.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  id={edu.type}
                  className={`glass p-6 rounded-lg relative transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(155,135,245,0.3)] ml-10`}
                >
                  <div className={`absolute -left-10 top-6 w-8 h-8 ${getIconBgClass(edu.type as 'education' | 'certification' | 'achievement' | 'publication')} rounded-full flex items-center justify-center`}>
                    {getIcon(edu.type as 'education' | 'certification' | 'achievement' | 'publication')}
                  </div>
                  
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold">{edu.institution}</h3>
                      <span className="ml-3 text-xs uppercase bg-white/20 px-2 py-1 rounded-full">
                        {edu.type}
                      </span>
                    </div>
                    <p className="text-primary">{edu.degree}</p>
                    <p className="text-sm text-muted-foreground mb-2">{edu.period}</p>
                    <p className="text-muted-foreground">
                      {edu.description}
                    </p>
                    {edu.certificateLink && (
                      <a 
                        href={edu.certificateLink} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-flex items-center gap-2 mt-3 text-primary hover:underline"
                      >
                        View <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      <section id="projects" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              My <span className="text-gradient-primary">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of my work in cybersecurity, front-end development, and Arduino projects.
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ProjectCard 
                  title={project.title}
                  description={project.description}
                  image={project.image}
                  tags={project.tags}
                  github={project.github}
                  liveDemo={project.liveDemo}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      <section id="experience" className="py-20 bg-background/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              My <span className="text-gradient-primary">Experience</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A chronological journey through my professional experiences and roles.
            </p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="glass px-6 py-3 rounded-full flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                <span className="font-medium">Professional Timeline</span>
              </div>
            </div>
            
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ExperienceCard 
                  company={exp.company}
                  position={exp.position}
                  period={exp.period}
                  description={exp.description}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                Let's <span className="text-gradient-primary">Connect</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Have a question or want to work together? Feel free to reach out!
              </p>
            </motion.div>
            
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              <motion.div 
                className="glass p-8 rounded-lg"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={isSending}
                    className={`w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg hover-glow flex items-center justify-center ${
                      isSending ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSending ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-col justify-center"
              >
                <div className="glass p-8 rounded-lg mb-8">
                  <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <Mail className="text-primary" />
                      <a href="mailto:garvkamra24@gmail.com" className="hover:text-primary transition-colors">
                        garvkamra24@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <Github className="text-primary" />
                      <a href="https://github.com/Securegarv20" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        github.com/Securegarv20
                      </a>
                    </div>
                    <div className="flex items-center gap-4">
                      <Linkedin className="text-primary" />
                      <a href="https://www.linkedin.com/in/garvkamra/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        linkedin.com/in/garvkamra
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="glass p-8 rounded-lg">
                  <h3 className="text-2xl font-bold mb-6">Let's Connect</h3>
                  <p className="text-muted-foreground mb-6">
                    I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
                  </p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=garvkamra24@gmail.com&su=Let's%20Connect"
                    target="_blank"
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-lg block text-center"
                  >
                    Schedule a call
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      <footer className="text-center text-sm text-muted-foreground py-6">
        © {new Date().getFullYear()} Garv Kamra. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
