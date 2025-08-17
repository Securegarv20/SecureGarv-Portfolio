import { motion } from "framer-motion";
import { Code } from "lucide-react";

interface Skill {
  _id: string;
  name: string;
  iconUrl?: string;
  proficiency: number;
  featured?: boolean;
}

interface MarqueeSkillsProps {
  skills: Skill[];
}

const MarqueeSkills = ({ skills }: MarqueeSkillsProps) => {
  return (
    <section className="py-12 px-4 max-w-4xl mx-auto">

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {skills.map((skill) => {
          const hasValidIcon =
            skill.iconUrl &&
            (skill.iconUrl.startsWith("http://") ||
              skill.iconUrl.startsWith("https://"));

          return (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 p-6 rounded-2xl 
                        bg-gray-900/70 border border-gray-800
                        hover:border-purple-500/40 transition-all duration-300"
            >
              {/* Icon */}
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400">
                {hasValidIcon ? (
                  <img
                    src={skill.iconUrl}
                    alt={skill.name}
                    className="w-6 h-6 object-contain"
                    onError={(e) => {
                      e.currentTarget.replaceWith(
                        Object.assign(document.createElement("div"), {
                          innerHTML: `<svg xmlns="http://www.w3.org/2000/svg" 
                            class="w-6 h-6 text-purple-400" 
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
                          </svg>`,
                        })
                      );
                    }}
                  />
                ) : (
                  <Code className="w-6 h-6" />
                )}
              </div>

              {/* Text */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white">
                  {skill.name}
                </h3>
                <p className="text-sm text-gray-400">
                  Proficiency {skill.proficiency}%
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default MarqueeSkills;
