'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { GiHourglass } from "react-icons/gi";
import { FaEdit, FaTrash, FaEye, FaEllipsisV } from "react-icons/fa";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const router = useRouter();

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleCreateNewPost = () => {
    router.push('/admin/new-post');
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.replace('/admin');
  };

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const res = await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    if (res.ok) {
      await fetchPosts();
      if (openMenuId === postId) setOpenMenuId(null);
    } else {
      alert('Failed to delete post');
    }
  };

  const toggleVisibility = async (postId: string, visible: boolean) => {
    const res = await fetch(`/api/posts/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visible: !visible }),
    });
    if (res.ok) {
      await fetchPosts();
    } else {
      alert('Failed to update visibility');
    }
  };

  const handleEdit = (postId: string) => {
    router.push(`/admin/edit-post/${postId}`);
  };

  const toggleMenu = (postId: string) => {
    setOpenMenuId(openMenuId === postId ? null : postId);
  };

  return (
    <div className="min-h-screen bg-beige">
      {/* Navbar */}
      <nav className="w-full bg-gradient-to-r from-[#F6F0DE] to-[#ECDFBC] shadow-lg border-b-2 border-[#C2A570]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">

          {/* Left - Title */}
          <div className="flex items-center gap-4">
            <h1 className="text-xl sm:text-2xl font-bold text-dark-brown">
              Admin Dashboard
            </h1>
          </div>

          {/* Right - Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <button
              className="btn-primary px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              onClick={handleCreateNewPost}
            >
              Create New Landing Page
            </button>

            <button
              className="btn-secondary px-6 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200 w-full sm:w-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Posts List */}
      <main className="p-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-dark-brown mb-2">Your Landing Page</h2>
          <p className="text-dark-brown/70">Manage all your published and draft posts</p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto border-2 border-[#C2A570]/30">
              <div className="w-20 h-20 bg-gradient-to-br from-[#C2A570] to-[#D4B882] rounded-full flex items-center justify-center mx-auto mb-6">
                <GiHourglass className="text-4xl text-white" />
              </div>
              <h3 className="text-2xl font-bold text-dark-brown mb-3">No Landing Page found</h3>
              <p className="text-dark-brown/70 mb-6">Start creating your first post to see it here</p>
              <button
                className="btn-primary px-8 py-3 rounded-lg font-semibold"
                onClick={handleCreateNewPost}
              >
                Create Your First Landing Page
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <div
                key={post._id}
                className="group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-[#C2A570]/20 hover:border-[#C2A570]/50"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#F6F0DE] to-[#ECDFBC]">
                 {post.videoUrl ? (
  <video
    src={post.videoUrl}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    muted
    playsInline
  />
) : post.imageUrl ? (
  <img
    src={post.imageUrl}
    alt={post.title}
    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
  />
) : (
  <div className="w-full h-full flex items-center justify-center text-gray-400">
    No media
  </div>
)}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Visibility Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold shadow-lg ${
                        post.visible ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
                      }`}
                    >
                      {post.visible ? '● Live' : '● Hidden'}
                    </span>
                  </div>

                  {/* 3 Dots Button for Actions */}
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => toggleMenu(post._id)}
                      className="bg-white/90 backdrop-blur-sm p-2 rounded-lg text-gray-700 hover:bg-gray-300 transition-all duration-200 shadow-lg"
                      title="Menu"
                    >
                      <FaEllipsisV size={18} />
                    </button>
                  </div>

                  {/* Action Buttons shown on clicking 3 dots */}
                  {openMenuId === post._id && (
                    <div className="absolute top-14 right-3 flex flex-col gap-2 bg-white rounded-lg shadow-lg p-2 border border-gray-300 z-50">
                      <button
                        onClick={() => window.open(`/${post.slug}`, '_blank')}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-green-600 hover:bg-green-600 hover:text-white transition duration-200"
                        title="View"
                      >
                        <FaEye size={16} /> View
                      </button>
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-blue-600 hover:bg-blue-600 hover:text-white transition duration-200"
                        title="Edit"
                      >
                        <FaEdit size={16} /> Edit
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-red-600 hover:bg-red-600 hover:text-white transition duration-200"
                        title="Delete"
                      >
                        <FaTrash size={16} /> Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-dark-brown line-clamp-2 group-hover:text-[#C2A570] transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-dark-brown/70 text-sm mb-4 line-clamp-2">
                    {post.subtitle}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center gap-2 text-sm text-dark-brown/60 pt-4 border-t border-[#C2A570]/20">
                    <GiHourglass className="text-[#C2A570]" />
                    <span>
                      Created:{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Bottom Gradient Border */}
                <div className="h-1 bg-gradient-to-r from-[#C2A570] via-[#D4B882] to-[#C2A570]"></div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
