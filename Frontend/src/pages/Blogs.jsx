import React, { useState, useEffect } from "react";
import Footer from "@/components/footer/Footer";
import * as blogApi from "@/lib/api/blogs";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeBlog, setActiveBlog] = useState(null);
  const blogsPerPage = 6;

  //!  Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogApi.fetchBlogs();
        if (response.success) {
          setBlogs(response.data);
        } else {
          setError("Failed to fetch blogs");
        }
      } catch (err) {
        setError("Error fetching blogs");
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  //!  Pagination Logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  //!  Loading State
  if (loading) {
    return (
      <main className="w-full bg-white text-black min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blogs...</p>
        </div>
      </main>
    );
  }

  //!  Error State
  if (error) {
    return (
      <main className="w-full bg-white text-black min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
        >
          Retry
        </button>
      </main>
    );
  }

  return (
    <main className="w-full bg-gradient-to-b from-gray-50 to-white text-gray-900 min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col lg:flex-row gap-10">
        {/* //! LEFT: Blog Cards */}
        <div className="lg:w-2/3">
          <h1 className="text-4xl font-bold text-center mb-10 text-gray-800 tracking-tight">
            ✍️ Latest Blogs
          </h1>

          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">
                No blogs available at the moment. Check back later!
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {currentBlogs.map((blog) => (
                  <div
                    key={blog._id}
                    className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
                  >
                    <div>
                      <h2 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 line-clamp-2">
                        {blog.title}
                      </h2>
                      <p className="text-gray-500 text-sm mb-3">
                        By <span className="font-medium text-gray-700">{blog.author}</span>
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                        {blog.content}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-5">
                      <span className="text-xs text-gray-400">
                        {new Date(blog.publishedDate).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </span>

                      {blog.tags && blog.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {blog.tags.slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span className="text-xs text-gray-400">+{blog.tags.length - 2}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* //! Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-10 gap-3">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-4 py-2 rounded-md text-sm font-medium border ${
                      currentPage === 1
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "border-gray-300 hover:bg-green-600 hover:text-white"
                    }`}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => handlePageChange(num)}
                      className={`px-4 py-2 rounded-md text-sm font-medium border ${
                        currentPage === num
                          ? "bg-green-600 text-white border-green-600"
                          : "border-gray-300 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      {num}
                    </button>
                  ))}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-4 py-2 rounded-md text-sm font-medium border ${
                      currentPage === totalPages
                        ? "text-gray-400 border-gray-200 cursor-not-allowed"
                        : "border-gray-300 hover:bg-green-600 hover:text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* //! RIGHT: Sidebar */}
        <aside className="lg:w-1/3 bg-white border border-gray-200 rounded-2xl shadow-md p-6 h-fit sticky top-5">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 border-b pb-2">
             All Blogs
          </h2>
          {blogs.length === 0 ? (
            <p className="text-gray-500 text-sm">No blogs available</p>
          ) : (
            <div className="space-y-3">
              {blogs.map((blog) => (
                <div key={blog._id} className="border-b last:border-0 pb-3">
                  <button
                    onClick={() =>
                      setActiveBlog((prev) => (prev === blog._id ? null : blog._id))
                    }
                    className="w-full text-left font-medium text-gray-800 hover:text-green-600 transition-all"
                  >
                    {blog.title}
                  </button>

                  {activeBlog === blog._id && (
                    <p className="mt-2 text-gray-500 text-sm line-clamp-3">
                      {blog.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
      {/* <Footer /> */}
    </main>
  );
};

export default Blogs;
