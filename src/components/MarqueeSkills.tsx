import { motion } from "framer-motion";
import { Code } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  IconPrefix, 
  IconName,
  IconLookup,
  IconDefinition,
  findIconDefinition
} from '@fortawesome/fontawesome-svg-core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

// Initialize Font Awesome library with ALL icons
library.add(fas, fab, far);

interface Skill {
  _id: string;
  name: string;
  iconUrl?: string;
  proficiency: number;
}

interface MarqueeSkillsProps {
  skills: Skill[];
}

const isFontAwesomeIcon = (url?: string): boolean => {
  if (!url) return false;
  // Match all Font Awesome formats:
  // - fab fa-react
  // - fa-react fab
  // - fa-solid fa-microchip (v6)
  // - fas fa-microchip (v5)
  return /(^|\s)(fa[sbr]? fa-|fa-[a-z-]+ (fa[sbr])|fa-(solid|regular|brands) fa-)/.test(url);
};

const parseFontAwesomeIcon = (iconString: string): IconDefinition | null => {
  if (!iconString) return null;
  
  // Normalize the string
  const normalized = iconString.trim().toLowerCase().replace(/\s+/g, ' ');
  
  // Map v6 prefixes to v5
  const prefixMap: Record<string, IconPrefix> = {
    'fa-solid': 'fas',
    'fa-regular': 'far',
    'fa-brands': 'fab'
  };

  let prefix: IconPrefix = 'fas'; // default to solid
  let iconName: string = '';

  const parts = normalized.split(' ');
  
  // Determine prefix
  for (const part of parts) {
    if (part in prefixMap) {
      prefix = prefixMap[part];
      break;
    } else if (['fas', 'far', 'fab'].includes(part)) {
      prefix = part as IconPrefix;
      break;
    }
  }

  // Find icon name (remove 'fa-' prefix if present)
  for (const part of parts) {
    if (part !== prefix && !(part in prefixMap)) {
      iconName = part.startsWith('fa-') ? part.substring(3) : part;
      break;
    }
  }

  if (!iconName) return null;

  const iconLookup: IconLookup = { prefix, iconName: iconName as IconName };
  return findIconDefinition(iconLookup) || null;
};

const MarqueeSkills = ({ skills }: MarqueeSkillsProps) => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-white mb-2">
          My <span className="text-purple-400">Skills</span>
        </h2>
        <p className="text-gray-400">Technologies I work with daily</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const hasValidIcon = !!skill.iconUrl;
          const isFAIcon = hasValidIcon && isFontAwesomeIcon(skill.iconUrl);
          const faIcon = isFAIcon ? parseFontAwesomeIcon(skill.iconUrl || '') : null;

          return (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center p-4 bg-gray-800/50 rounded-lg border border-gray-700"
            >
              {/* Icon */}
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-purple-500/10 mr-4">
                {hasValidIcon ? (
                  isFAIcon && faIcon ? (
                    <FontAwesomeIcon 
                      icon={faIcon}
                      className="w-6 h-6 text-purple-400"
                    />
                  ) : (
                    <>
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling;
                          if (fallback) fallback.classList.remove('hidden');
                        }}
                      />
                      <Code className="w-5 h-5 text-purple-400 hidden" />
                    </>
                  )
                ) : (
                  <Code className="w-5 h-5 text-purple-400" />
                )}
              </div>

              {/* Skill info */}
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="text-lg font-medium text-white">
                    {skill.name}
                  </h3>
                  <span className="text-sm font-mono text-purple-300">
                    {skill.proficiency}%
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-blue-500 h-full rounded-full"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MarqueeSkills;