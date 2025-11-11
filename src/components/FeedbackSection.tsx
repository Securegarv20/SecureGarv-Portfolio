// components/FeedbackSection.tsx
import { useState, useEffect } from 'react';
import { Star, Quote, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Review {
  _id: string;
  name: string;
  position: string;
  company?: string;
  rating: number;
  text: string;
  projectType: string;
  isActive: boolean;
  featured: boolean;
  order: number;
  createdAt: string;
}

interface FeedbackSectionProps {
  reviews: Review[];
}

const FeedbackSection = ({ reviews }: FeedbackSectionProps) => {
  const [activeReview, setActiveReview] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Filter only active reviews for display
  const displayReviews = reviews.filter(review => 
    review.isActive
  );

  // ADD THESE CONSOLE LOGS:
  console.log('All reviews:', reviews);
  console.log('Display reviews (active & featured):', displayReviews);
  console.log('Review featured status:', reviews[0]?.featured);

  // Auto-scroll functionality
  useEffect(() => {
    if (!isAutoPlaying || displayReviews.length === 0) return;

    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % displayReviews.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, displayReviews.length]);

  const nextReview = () => {
    if (displayReviews.length === 0) return;
    setIsAutoPlaying(false);
    setActiveReview((prev) => (prev + 1) % displayReviews.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevReview = () => {
    if (displayReviews.length === 0) return;
    setIsAutoPlaying(false);
    setActiveReview((prev) => (prev - 1 + displayReviews.length) % displayReviews.length);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToReview = (index: number) => {
    if (displayReviews.length === 0) return;
    setIsAutoPlaying(false);
    setActiveReview(index);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${
              i < rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-400 dark:text-gray-600'
            } transition-all duration-300`}
          />
        ))}
      </div>
    );
  };

  if (displayReviews.length === 0) {
    return (
      <section id="testimonials" className="py-20 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-[#6E59A5]/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Client <span className="text-gradient-primary">Feedback</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              What clients say about my web development services and project delivery
            </p>
          </motion.div>

          {/* Empty State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="glass p-12 rounded-2xl">
              <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                No Reviews Yet
              </h3>
              <p className="text-muted-foreground text-lg mb-6">
                Client feedback will appear here once reviews are added.
              </p>
              <div className="flex justify-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span>Client Ratings</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Quote className="w-4 h-4 text-primary" />
                  <span>Testimonials</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-10 w-72 h-72 bg-[#6E59A5]/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Client <span className="text-gradient-primary">Feedback</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            What clients say about my web development services and project delivery
          </p>
        </motion.div>

        {/* Main Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevReview}
              disabled={displayReviews.length <= 1}
              className="absolute -left-4 md:-left-12 top-1/2 transform -translate-y-1/2 glass p-3 rounded-full hover-glow transition-all duration-300 hover:scale-110 z-20 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous testimonial"
            >
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextReview}
              disabled={displayReviews.length <= 1}
              className="absolute -right-4 md:-right-12 top-1/2 transform -translate-y-1/2 glass p-3 rounded-full hover-glow transition-all duration-300 hover:scale-110 z-20 border border-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next testimonial"
            >
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Testimonial Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReview}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass p-8 md:p-12 rounded-2xl relative overflow-hidden"
              >
                {/* Auto-play indicator */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400' : 'bg-gray-400'}`}></div>
                  <span className="text-xs text-muted-foreground">
                    {isAutoPlaying ? 'Auto' : 'Paused'}
                  </span>
                </div>

                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
                  <Quote size={128} className="text-primary" />
                </div>

                <div className="relative z-10">
                  {/* Rating and Project Type */}
                  <div className="flex items-center justify-between mb-6">
                    <StarRating rating={displayReviews[activeReview].rating} />
                    <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                      {displayReviews[activeReview].projectType}
                    </span>
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="mb-8">
                    <p className="text-lg md:text-xl text-foreground/90 leading-relaxed font-light">
                      "{displayReviews[activeReview].text}"
                    </p>
                  </blockquote>

                  {/* Client Info */}
                  <div className="pt-6 border-t border-white/10">
                    <h4 className="font-semibold text-foreground text-lg mb-1">
                      {displayReviews[activeReview].name}
                    </h4>
                    <p className="text-primary font-medium">
                      {displayReviews[activeReview].position}
                    </p>
                    {displayReviews[activeReview].company && (
                      <p className="text-muted-foreground">
                        {displayReviews[activeReview].company}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Indicators */}
            {displayReviews.length > 1 && (
              <div className="flex justify-center mt-8 gap-2">
                {displayReviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 relative ${
                      index === activeReview
                        ? 'bg-primary w-6'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-primary/60'
                    }`}
                  >
                    {/* Progress bar for auto-scroll */}
                    {index === activeReview && isAutoPlaying && (
                      <motion.div
                        className="absolute top-0 left-0 h-full bg-primary/30 rounded-full"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;