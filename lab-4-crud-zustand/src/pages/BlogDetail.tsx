import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePostStore } from '../stores/post.store';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPost, deletePost } = usePostStore();
  
  const post = id ? getPost(id) : undefined;

  const handleDelete = () => {
    if (post && confirm('Are you sre to delete?')) {
      deletePost(post.id);
      navigate('/blog');
    }
  };

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">There is no post</h1>
        <p className="text-gray-600 mb-6">The specified article does not exist or has been deleted.</p>
        <Link
          to="/blog"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Return to BlogList
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Return to BlogList
        </Link>
      </div>

      <article className="bg-white rounded-lg shadow-lg p-8">
        <header className="mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex space-x-2">
              <Link
                to={`/blog/edit/${post.id}`}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition-colors"
              >
                Edit
              </Link>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{post.createdAt.toLocaleDateString()}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              post.published 
                ? 'bg-green-100 text-green-800' 
                : 'bg-yellow-100 text-yellow-800'
            }`}>
              {post.published ? 'Publish' : 'Draft'}
            </span>
          </div>
        </header>

        <div className="prose max-w-none">
          <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </div>
        </div>
      </article>

      <div className="mt-8 flex justify-center space-x-4">
        <Link
          to="/blog"
          className="px-6 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          Return to BlogList
        </Link>
        <Link
          to={`/blog/edit/${post.id}`}
          className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
        >
          Edit this post
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;