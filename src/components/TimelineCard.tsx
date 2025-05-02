
import React from 'react';
import { GraduationCap, Book, Award, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

type EducationType = 'education' | 'certification' | 'achievement' | 'publication';

interface TimelineCardProps {
  institution: string;
  degree: string;
  period: string;
  description: string;
  type: EducationType;
}

const TimelineCard = ({ institution, degree, period, description, type }: TimelineCardProps) => {
  // Get icon based on type
  const getIcon = () => {
    switch (type) {
      case 'education':
        return <GraduationCap className="w-6 h-6 text-white" />;
      case 'certification':
        return <Book className="w-6 h-6 text-white" />;
      case 'achievement':
        return <Award className="w-6 h-6 text-white" />;
      case 'publication':
        return <FileText className="w-6 h-6 text-white" />;
      default:
        return <Book className="w-6 h-6 text-white" />;
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

  // Get icon background color
  const getIconBgClass = () => {
    switch (type) {
      case 'education':
        return 'bg-purple-500';
      case 'certification':
        return 'bg-blue-500';
      case 'achievement':
        return 'bg-amber-500';
      case 'publication':
        return 'bg-emerald-500';
      default:
        return 'bg-primary';
    }
  };

  return (
    <motion.div 
      className={`glass p-6 rounded-lg relative transform transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(155,135,245,0.3)] ml-10 bg-gradient-to-br ${getBackgroundClass()}`}
      whileHover={{ scale: 1.02, y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {/* Icon in circle at left side */}
      <div className={`absolute -left-10 top-6 w-8 h-8 ${getIconBgClass()} rounded-full flex items-center justify-center`}>
        {getIcon()}
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
    </motion.div>
  );
};

export default TimelineCard;
