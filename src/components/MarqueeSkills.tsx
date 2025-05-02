
import React, { useState } from "react";
import { FaShieldAlt, FaHackerrank, FaNetworkWired, FaLinux, FaRobot, FaHtml5, FaJs, FaCss3, FaReact } from "react-icons/fa";
import { SiArduino, SiNodedotjs, SiTailwindcss, SiCanva, SiTypescript, SiNextdotjs, SiVite, SiSonarqube, SiBurpsuite, SiWireshark, SiRaspberrypi } from "react-icons/si";

import { motion } from "framer-motion";

const skills = [
  { 
    category: "Security",
    items: [
      { name: "Cybersecurity", icon: <FaShieldAlt size={36} className="text-primary" /> },
      { name: "Ethical Hacking", icon: <FaHackerrank size={36} className="text-[#7E69AB]" /> },
      { name: "Network Security", icon: <FaNetworkWired size={36} className="text-[#6E59A5]" /> },
      { name: "Linux", icon: <FaLinux size={36} className="text-[#D6BCFA]" /> },
      { name: "Vulnerability Assessment", icon: <SiSonarqube size={36} className="text-[#6E59A5]" /> },
      { name: "Burp Suite", icon: <SiBurpsuite size={36} className="text-[#D6BCFA]" /> },
      { name: "Wireshark", icon: <SiWireshark size={36} className="text-[#9b87f5]" /> },
    ]
  },
  {
    category: "Hardware & Robotics",
    items: [
      { name: "Arduino", icon: <SiArduino size={36} className="text-[#9b87f5]" /> },
      { name: "NodeMCU", icon: <SiNodedotjs size={36} className="text-[#7E69AB]" /> },
      { name: "Robotics", icon: <FaRobot size={36} className="text-[#6E59A5]" /> },
      { name: "Raspberry Pi", icon: <SiRaspberrypi size={36} className="text-[#6E59A5]" /> },
    ]
  },
  {
    category: "Web Development",
    items: [
      { name: "HTML", icon: <FaHtml5 size={36} className="text-[#D6BCFA]" /> },
      { name: "CSS", icon: <FaCss3 size={36} className="text-[#9b87f5]" /> },
      { name: "JavaScript", icon: <FaJs size={36} className="text-[#7E69AB]" /> },
      { name: "React", icon: <FaReact size={36} className="text-[#9b87f5]" /> },
      { name: "TypeScript", icon: <SiTypescript size={36} className="text-[#7E69AB]" /> },
      { name: "Next.js", icon: <SiNextdotjs size={36} className="text-[#D6BCFA]" /> },
      { name: "TailwindCSS", icon: <SiTailwindcss size={36} className="text-[#6E59A5]" /> },
      { name: "Vite", icon: <SiVite size={36} className="text-[#D6BCFA]" /> }, // Replace if desired
    ]
  },
  {
    category: "Design",
    items: [
      { name: "Canva", icon: <SiCanva size={36} className="text-[#D6BCFA]" /> },
    ]
  }
];

const SkillCard = ({ icon, name, isActive, onClick }) => {
  return (
    <motion.div
      className={`p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer ${isActive ? 'bg-primary/10 scale-105' : 'glass'}`}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-3">
        {icon}
      </div>
      <p className="font-medium text-sm sm:text-base">{name}</p>
    </motion.div>
  );
};

const MarqueeSkills = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedSkill, setSelectedSkill] = useState(null);
  
  const handleCategoryClick = (category) => {
    if (activeCategory === category) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category);
      setSelectedSkill(null);
    }
  };
  
  const handleSkillClick = (skill) => {
    setSelectedSkill(skill === selectedSkill ? null : skill);
  };
  
  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <p className="text-center text-muted-foreground mb-6">
          My expertise spans cybersecurity, hardware development, and web technologies
        </p>
        
        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {skills.map((category, index) => (
            <motion.button
              key={index}
              className={`px-4 py-2 rounded-full ${activeCategory === category.category ? 'bg-primary text-white' : 'glass'}`}
              onClick={() => handleCategoryClick(category.category)}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              {category.category}
            </motion.button>
          ))}
        </div>
        
        <div className="relative">
          {/* Skills Grid */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            layout
          >
            {skills
              .filter(category => !activeCategory || category.category === activeCategory)
              .map((category) => (
                <React.Fragment key={category.category}>
                  {!activeCategory && (
                    <motion.h3 
                      className="col-span-2 md:col-span-4 text-2xl font-bold mt-5 mb-3 text-gradient-primary"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {category.category}
                    </motion.h3>
                  )}
                  
                  {category.items.map((skill, idx) => (
                    <SkillCard
                      key={idx}
                      icon={skill.icon}
                      name={skill.name}
                      isActive={selectedSkill === skill.name}
                      onClick={() => handleSkillClick(skill.name)}
                    />
                  ))}
                </React.Fragment>
              ))}
          </motion.div>
          
          {/* Background elements - Subtle design */}
          <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-primary blur-3xl"
              animate={{
                x: [0, 30, -30, 0],
                y: [0, -30, 30, 0],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-[#6E59A5] blur-3xl"
              animate={{
                x: [0, -25, 25, 0],
                y: [0, 25, -25, 0],
              }}
              transition={{
                duration: 18,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeSkills;
