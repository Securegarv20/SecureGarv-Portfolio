import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, Eye } from "lucide-react";

interface BlogPost {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

interface BlogCardProps {
  post: BlogPost;
  onClick: () => void;
}

const BlogCard = ({ post, onClick }: BlogCardProps) => {
  // Add safety checks to prevent errors if post data is incomplete
  if (!post || typeof post !== 'object') {
    console.warn('Invalid post data received:', post);
    return null; // Don't render anything if post is invalid
  }

  // Safely extract values with fallbacks
  const {
    title = 'Untitled Post',
    excerpt = 'No excerpt available',
    date = 'Unknown date',
    readTime = 'Unknown read time',
    image = '/placeholder-image.jpg',
    tags = []
  } = post;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#1a1f3a] to-[#0f1329] border border-[#2d3748] shadow-xl cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Image container */}
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1329] to-transparent opacity-70"></div>
        
        {/* Date badge */}
        <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm">
          {date}
        </div>
        
        {/* Read time */}
        <div className="absolute top-4 right-4 bg-background/80 text-foreground text-xs font-medium px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {readTime}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {excerpt}
          </p>
        </div>
        
        {/* Tags - only render if tags exist */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tags.slice(0, 3).map((tag, index) => (
              <span 
                key={tag || `tag-${index}`}
                className="text-xs bg-primary/20 text-primary px-3 py-1 rounded-full border border-primary/30"
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span className="text-xs bg-gray-700/50 text-gray-400 px-3 py-1 rounded-full">
                +{tags.length - 3} more
              </span>
            )}
          </div>
        )}
        
        {/* Read more button */}
        <div className="flex items-center justify-between pt-4 border-t border-[#2d3748]">
          <span className="text-sm text-primary font-medium flex items-center gap-2 group-hover:gap-3 transition-all">
            Read article
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
          <div className="flex items-center text-xs text-muted-foreground">
            <Eye className="w-3 h-3 mr-1" />
            View
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogCard;