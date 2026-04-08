import { useEffect, useState } from "react";
import { getPost, updatePost } from "../services/api";
import { useParams, useNavigate } from "react-router-dom";

function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "", author: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await getPost(id);
        setPost(res.data);
      } catch {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!post.title.trim() || !post.content.trim() || !post.author.trim()) {
      setError("All fields are required.");
      return;
    }

    try {
      setSubmitting(true);
      await updatePost(id, post);
      navigate("/");
    } catch {
      setError("Failed to update post.");
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading post...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">✏️ Edit Post</h2>

        {/* Error Banner */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            name="title"
            value={post.title}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-lg transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Content</label>
          <textarea
            name="content"
            rows="5"
            value={post.content}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-lg transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Author</label>
          <input
            name="author"
            value={post.author}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-lg transition"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition shadow-md"
          >
            {submitting ? "Updating..." : "💾 Update Post"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/")}
            disabled={submitting}
            className="w-full bg-gray-300 hover:bg-gray-400 disabled:opacity-50 text-gray-800 font-semibold py-3 rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPost;