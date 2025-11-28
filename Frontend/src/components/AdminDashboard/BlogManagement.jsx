import React, { useState, useEffect } from 'react';
import * as blogApi from '@/lib/api/blogs';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  
  const [newBlog, setNewBlog] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    // coverImage: null  // Commenting out image field
  });
  
  const [editingBlog, setEditingBlog] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    author: '',
    tags: '',
    // coverImage: null  // Commenting out image field
  });

  // Fetch all blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await blogApi.fetchBlogs();
        if (response.success) {
          setBlogs(response.data);
        } else {
          setError('Failed to fetch blogs');
        }
      } catch (err) {
        setError('Error fetching blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [refreshKey]);

  // Handle form submission for creating a new blog
  const handleCreateBlog = async (e) => {
    e.preventDefault();
    
    try {
      // Commenting out FormData and image handling for now
      /*
      const formData = new FormData();
      formData.append('title', newBlog.title);
      formData.append('content', newBlog.content);
      formData.append('author', newBlog.author);
      formData.append('tags', newBlog.tags);
      if (newBlog.coverImage) {
        formData.append('coverImage', newBlog.coverImage);
      }
      */

      // Using JSON data instead of FormData
      const blogData = {
        title: newBlog.title,
        content: newBlog.content,
        author: newBlog.author,
        tags: newBlog.tags
      };

      const response = await blogApi.createBlog(blogData);
      
      if (response.success) {
        setNewBlog({
          title: '',
          content: '',
          author: '',
          tags: '',
          // coverImage: null
        });
        setRefreshKey(k => k + 1);
      } else {
        setError(response.error || 'Failed to create blog');
      }
    } catch (err) {
      setError('Error creating blog');
      console.error('Error creating blog:', err);
    }
  };

  // Handle form submission for updating a blog
  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    
    try {
      // Commenting out FormData and image handling for now
      /*
      const formData = new FormData();
      formData.append('title', editForm.title);
      formData.append('content', editForm.content);
      formData.append('author', editForm.author);
      formData.append('tags', editForm.tags);
      if (editForm.coverImage) {
        formData.append('coverImage', editForm.coverImage);
      }
      */

      // Using JSON data instead of FormData
      const blogData = {
        title: editForm.title,
        content: editForm.content,
        author: editForm.author,
        tags: editForm.tags
      };

      const response = await blogApi.updateBlog(editingBlog._id, blogData);
      
      if (response.success) {
        setEditingBlog(null);
        setRefreshKey(k => k + 1);
      } else {
        setError(response.error || 'Failed to update blog');
      }
    } catch (err) {
      setError('Error updating blog');
      console.error('Error updating blog:', err);
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      const response = await blogApi.deleteBlog(blogId);
      
      if (response.success) {
        setRefreshKey(k => k + 1);
      } else {
        setError(response.error || 'Failed to delete blog');
      }
    } catch (err) {
      setError('Error deleting blog');
      console.error('Error deleting blog:', err);
    }
  };

  // Handle image upload for new blog
  // Commenting out image upload handlers for now
  /*
  const handleNewImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewBlog(prev => ({ ...prev, coverImage: file }));
    }
  };

  // Handle image upload for edit blog
  const handleEditImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditForm(prev => ({ ...prev, coverImage: file }));
    }
  };
  */

  if (loading) return <div className="text-white">Loading blogs...</div>;
  if (error) return <div className="text-red-400">Error: {error}</div>;

  return (
    <div className="mt-8 bg-white/5 border border-white/10 rounded-xl p-4">
      <h2 className="text-xl font-semibold mb-3">Blog Management</h2>
      
      {/* Add New Blog Form */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-3">Add New Blog</h3>
        <form onSubmit={handleCreateBlog} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <input
              required
              placeholder="Title"
              value={newBlog.title}
              onChange={(e) => setNewBlog(prev => ({ ...prev, title: e.target.value }))}
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
            />
          </div>
          <div>
            <input
              required
              placeholder="Author"
              value={newBlog.author}
              onChange={(e) => setNewBlog(prev => ({ ...prev, author: e.target.value }))}
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
            />
          </div>
          <div className="md:col-span-2">
            <textarea
              required
              placeholder="Content"
              value={newBlog.content}
              onChange={(e) => setNewBlog(prev => ({ ...prev, content: e.target.value }))}
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white h-32"
            />
          </div>
          <div>
            <input
              placeholder="Tags (comma separated)"
              value={newBlog.tags}
              onChange={(e) => setNewBlog(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
            />
          </div>
          {/* Commenting out image upload for now
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleNewImageChange}
              className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
            />
          </div>
          */}
          <div className="md:col-span-2">
            <button type="submit" className="px-4 py-2 bg-green-600 rounded text-white">
              Add Blog
            </button>
          </div>
        </form>
      </div>

      {/* Edit Blog Form (only shown when editing) */}
      {editingBlog && (
        <div className="mb-8 bg-gray-800/50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-3">Edit Blog</h3>
          <form onSubmit={handleUpdateBlog} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <input
                required
                placeholder="Title"
                value={editForm.title}
                onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
              />
            </div>
            <div>
              <input
                required
                placeholder="Author"
                value={editForm.author}
                onChange={(e) => setEditForm(prev => ({ ...prev, author: e.target.value }))}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
              />
            </div>
            <div className="md:col-span-2">
              <textarea
                required
                placeholder="Content"
                value={editForm.content}
                onChange={(e) => setEditForm(prev => ({ ...prev, content: e.target.value }))}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white h-32"
              />
            </div>
            <div>
              <input
                placeholder="Tags (comma separated)"
                value={editForm.tags}
                onChange={(e) => setEditForm(prev => ({ ...prev, tags: e.target.value }))}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
              />
            </div>
            {/* Commenting out image upload for now
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleEditImageChange}
                className="w-full bg-black/40 border border-white/10 rounded px-3 py-2 text-white"
              />
            </div>
            */}
            <div className="md:col-span-2 flex gap-2">
              <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-white">
                Update Blog
              </button>
              <button 
                type="button" 
                onClick={() => setEditingBlog(null)}
                className="px-4 py-2 bg-gray-600 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List */}
      <div>
        <h3 className="text-lg font-medium mb-3">Existing Blogs</h3>
        {blogs.length === 0 ? (
          <p className="text-gray-400">No blogs found. Add your first blog above.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blogs.map((blog) => (
              <div key={blog._id} className="bg-black/40 border border-white/10 rounded-lg p-4">
                {/* Commenting out image display for now
                {blog.coverImage && (
                  <img 
                    src={blog.coverImage} 
                    alt={blog.title} 
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                )}
                */}
                <h4 className="font-semibold text-white mb-1">{blog.title}</h4>
                <p className="text-gray-300 text-sm mb-2">by {blog.author}</p>
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                  {blog.content.substring(0, 100)}...
                </p>
                {blog.tags && blog.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {blog.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingBlog(blog);
                      setEditForm({
                        title: blog.title,
                        content: blog.content,
                        author: blog.author,
                        tags: blog.tags ? blog.tags.join(',') : '',
                        // coverImage: null
                      });
                    }}
                    className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteBlog(blog._id)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogManagement;