
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  description: string;
}

const ExperienceCard = ({ company, position, period, description }: ExperienceCardProps) => {
  return (
    <motion.div 
      className="glass p-6 rounded-lg mb-6 transform transition-all duration-300 hover:shadow-[0_0_20px_rgba(155,135,245,0.3)]"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-xl bg-primary/10 flex-shrink-0 hidden sm:block">
          <Briefcase className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold">{company}</h3>
          <p className="text-primary">{position}</p>
          <p className="text-sm text-muted-foreground mb-2">{period}</p>
          <p className="text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
