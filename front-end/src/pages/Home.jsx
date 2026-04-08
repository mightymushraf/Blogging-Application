import PostList from "../components/PostList";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Navbar */}
      <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800"> Blog App</h1>

        <Link
          to="/create"
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-2 rounded-lg shadow"
        >
          + Create Post
        </Link>
      </div>

      {/* Content Area */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Latest Posts
          </h2>

          <PostList />
        </div>
      </div>

    </div>
  );
}

export default Home;