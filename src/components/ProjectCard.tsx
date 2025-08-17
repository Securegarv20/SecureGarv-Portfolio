import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  _id: string;
  title: string;
  description: string;
  technologies: string[];  // Changed from tags to technologies
  liveUrl: string;         // Changed from liveDemo to liveUrl
  githubUrl: string;       // Changed from github to githubUrl
  image: string;
  category: string;
}

const ProjectCard = ({ 
  _id,
  title, 
  description, 
  image, 
  technologies,  // Changed prop name
  githubUrl,     // Changed prop name
  liveUrl,       // Changed prop name
  category 
}: ProjectCardProps) => {
  return (
    <div className="glass rounded-lg overflow-hidden hover-glow group transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(155,135,245,0.5)]">
      <div className="h-48 bg-muted relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-70"></div>
        {/* Category badge */}
         <div className="absolute top-4 left-4 px-3 py-1 bg-[#9884f0] backdrop-blur-sm rounded-full text-sm text-white font-medium shadow-sm">
          {category}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (  // Changed from tags to technologies
            <span key={index} className="px-3 py-1 bg-primary/20 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          {githubUrl && (  // Changed from github to githubUrl
            <a 
              href={githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label={`GitHub repository for ${title}`}
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          )}
          {liveUrl && (  // Changed from liveDemo to liveUrl
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label={`Live demo for ${title}`}
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;