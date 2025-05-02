
import React from 'react';
import { Award, Book, GraduationCap, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationCardProps {
  institution: string;
  degree: string;
  period: string;
  description: string;
  logo?: string;
  type: 'education' | 'certification' | 'achievement' | 'publication';
}

const EducationCard = ({ institution, degree, period, description, logo, type }: EducationCardProps) => {
  // Get the appropriate icon based on type
  const getIcon = () => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-6 h-6 text-primary" />;
      case 'certification':
        return <Book className="w-6 h-6 text-primary" />;
      case 'achievement':
        return <Award className="w-6 h-6 text-primary" />;
      case 'publication':
        return <FileText className="w-6 h-6 text-primary" />;
      default:
        return <Book className="w-6 h-6 text-primary" />;
    }
  };

  // Get background color based on type
  const getBackgroundClass = () => {
    switch (type) {
      case 'education':
        return 'from-purple-500/20 to-purple-600/5';
      case 'certification':
        return 'from-blue-500/20 to-blue-600/5';
      case 'achievement':
        return 'from-amber-500/20 to-amber-600/5';
      case 'publication':
        return 'from-emerald-500/20 to-emerald-600/5';
      default:
        return 'from-primary/20 to-primary/5';
    }
  };

  return (
    <motion.div 
      className={`glass p-6 rounded-lg mb-6 transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,135,245,0.3)] bg-gradient-to-br ${getBackgroundClass()}`}
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-white/10 flex-shrink-0 hidden sm:flex sm:items-center sm:justify-center">
          {logo ? (
            <img src={logo} alt={institution} className="w-6 h-6" />
          ) : (
            getIcon()
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h3 className="text-xl font-bold">{institution}</h3>
            <span className="ml-3 text-xs uppercase bg-white/20 px-2 py-1 rounded-full">
              {type}
            </span>
          </div>
          <p className="text-primary">{degree}</p>
          <p className="text-sm text-muted-foreground mb-2">{period}</p>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default EducationCard;
