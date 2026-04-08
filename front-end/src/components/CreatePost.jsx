import { useState } from "react";
import { createPost } from "../services/api";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();

  const [post, setPost] = useState({ title: "", content: "", author: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
      await createPost(post);
      navigate("/");
    } catch {
      setError("Failed to create post. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          ✍️ Create New Post
        </h2>

        {/* Error Banner */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Title</label>
          <input
            name="title"
            value={post.title}
            placeholder="Enter post title"
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-lg transition"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-600 mb-1">Content</label>
          <textarea
            name="content"
            value={post.content}
            rows="5"
            placeholder="Write your content here..."
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-lg transition"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-600 mb-1">Author</label>
          <input
            name="author"
            value={post.author}
            placeholder="Your name"
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-3 rounded-lg transition"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition shadow-md"
        >
          {submitting ? "Publishing..." : "🚀 Publish Post"}
        </button>
      </form>
    </div>
  );
}

export default CreatePost;