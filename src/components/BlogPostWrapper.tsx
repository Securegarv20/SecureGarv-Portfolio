import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BlogModal from './BlogModal';

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

const BlogPostWrapper = () => {
  const { _id } = useParams<{ _id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
        try {
            // Note: using /api/blog/:id for the API call
            const response = await fetch(`/api/blog/${_id}`);
            if (!response.ok) throw new Error('Post not found');
            
            const postData = await response.json();
            setPost(postData);
        } catch (error) {
            console.error('Error fetching blog post:', error);
        } finally {
            setLoading(false);
        }
        };

    if (_id) {
      fetchPost();
    }
  }, [_id]);

  const handleClose = () => {
    // Go back to homepage and scroll to blog section
    navigate('/', { state: { scrollToBlog: true } });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Blog Post Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary text-white rounded-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return <BlogModal post={post} onClose={handleClose} />;
};

export default BlogPostWrapper;