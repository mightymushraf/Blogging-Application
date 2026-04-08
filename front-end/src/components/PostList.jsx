import { useEffect, useState } from "react";
import { getPosts, deletePost } from "../services/api";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const res = await getPosts();
      console.log(res.data);
      setPosts(res.data);
      
    } catch (err) {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    try {
      await deletePost(id);
      // ✅ Optimistic UI — no need to re-fetch
      setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      alert("Failed to delete post.");
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading posts...</p>;
  if (error)   return <p className="text-center mt-10 text-red-500">{error}</p>;
  if (!posts.length) return <p className="text-center mt-10 text-gray-400">No posts yet.</p>;

  return (
    <div className="mt-6 grid gap-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-3">{post.content}</p>
          <p className="text-sm text-gray-400 mb-4">✍️ By {post.author}</p>

          <div className="flex justify-between items-center">
            <Link to={`/edit/${post.id}`} className="bg-yellow-400 hover:bg-yellow-500 text-sm px-4 py-2 rounded-lg transition">
              ✏️ Edit
            </Link>
            <button
              onClick={() => handleDelete(post.id)}
              className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition"
            >
              🗑️ Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;