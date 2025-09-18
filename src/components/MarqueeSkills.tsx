import { motion } from "framer-motion";

interface Skill {
  _id: string;
  name: string;
}

interface MarqueeSkillsProps {
  skills: Skill[];
}

const MarqueeSkills = ({ skills }: MarqueeSkillsProps) => {
  return (
    <section className="py-12 px-6 max-w-4xl mx-auto">
      {/* <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-100 mb-8 text-center"
      >
        My <span className="text-purple-400">Skills</span>
      </motion.h2> */}

      <div className="flex flex-wrap justify-center gap-4">
        {skills.map((skill, i) => (
          <motion.span
            key={skill._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="px-5 py-2 bg-gray-800 text-gray-200 rounded-xl text-sm font-medium shadow-sm hover:bg-gray-700 transition-colors"
          >
            {skill.name}
          </motion.span>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSkills;
