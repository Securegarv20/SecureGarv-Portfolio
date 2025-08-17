import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";

interface ExperienceCardProps {
  _id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
  isCurrentJob: boolean;
}

const ExperienceCard = ({
  company,
  position,
  location,
  startDate,
  endDate,
  description,
  achievements = [],
  technologies = [],
  isCurrentJob,
}: ExperienceCardProps) => {
  return (
    <motion.div
      className="glass p-6 rounded-2xl mb-6 border border-white/10 backdrop-blur-md shadow-lg hover:shadow-[0_0_25px_rgba(153,133,241,0.25)] transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex items-start gap-5">
        {/* Icon */}
        <div className="p-3 rounded-xl bg-[#9985f1]/10 flex-shrink-0 hidden sm:flex">
          <Briefcase className="w-6 h-6 text-[#9985f1]" />
        </div>

        {/* Text Content */}
        <div className="flex flex-col w-full">
          
          {/* Header with dates and location on right */}
          <div className="flex justify-between items-start flex-col sm:flex-row">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-white">{company}</h3>
              <p className="text-[#9985f1] text-sm font-medium">{position}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 mt-1 sm:mt-0">
                {startDate} – {isCurrentJob ? "Present" : endDate}
              </p>
              <p className="text-xs text-gray-500 mt-1">{location}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 leading-relaxed my-4">
            {description}
          </p>

          {/* Achievements */}
          {achievements.length > 0 && (
            <div className="mb-4">
                <h3 className="text-xs font-semibold text-gray-400 mb-2">ACHIEVEMENTS</h3>
              <div className="flex flex-wrap gap-2">
                {achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-md bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    {achievement}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="mb-2">
              <h3 className="text-xs font-semibold text-gray-400 mb-2">TECHNOLOGIES</h3>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-md bg-[#9985f1]/10 text-[#9985f1] border border-[#9985f1]/20 hover:bg-[#9985f1]/20 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;