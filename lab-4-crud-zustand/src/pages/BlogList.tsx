import { Link } from 'react-router-dom';
import { usePostStore } from '../stores/post.store';

const BlogList = () => {
  const posts = usePostStore((state) => state.posts);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">All posts</h1>
        <Link
          to="/blog/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          Make new post
        </Link>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">There is NO Post</p>
            <Link
              to="/blog/new"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Make first article
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    <Link
                      to={`/blog/${post.id}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>{post.createdAt.toLocaleDateString('ja-JP')}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      post.published 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.published ? 'Publish' : 'Draft'}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">
                {post.content.substring(0, 200)}...
              </p>
              
              <div className="flex justify-between items-center">
                <Link
                  to={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                    Read Detail →
                </Link>
                <div className="flex space-x-2">
                  <Link
                    to={`/blog/edit/${post.id}`}
                    className="px-3 py-1 text-sm text-blue-600 border border-blue-600 rounded hover:bg-blue-50 transition-colors"
                  >
                    Edit
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogList;