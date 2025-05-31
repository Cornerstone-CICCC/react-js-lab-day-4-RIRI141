import { Link } from 'react-router-dom';
import { usePostStore } from '../stores/post.store';

const Home = () => {
  const posts = usePostStore((state) => state.posts);
  const publishedPosts = posts.filter(post => post.published);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome
        </h1>
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          See every posts
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {publishedPosts.slice(0, 6).map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {post.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content.substring(0, 100)}...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {post.createdAt.toLocaleDateString('ja-JP')}
                </span>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  read →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {publishedPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">There is no post</p>
        </div>
      )}
    </div>
  );
};

export default Home;