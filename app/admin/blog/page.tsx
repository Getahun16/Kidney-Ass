"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export default function BlogManager() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blog");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return alert("Please fill all fields");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (imageFile) formData.append("image", imageFile);
    if (editingId) formData.append("id", editingId.toString());

    try {
      const res = await fetch("/api/blog", {
        method: editingId ? "PUT" : "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to save blog");

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Blog save error:", error);
      alert("Something went wrong");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;

    try {
      const res = await fetch("/api/blog", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Failed to delete blog");

      fetchBlogs();
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Something went wrong");
    }
  };

  const handleEdit = (blog: Blog) => {
    setTitle(blog.title);
    setContent(blog.content);
    setImagePreview(
      blog.image?.startsWith("/uploads")
        ? blog.image
        : `/uploads/${blog.image || ""}`
    );
    setEditingId(blog.id);
  };

  const resetForm = () => {
    setTitle("");
    setContent("");
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const getImageSrc = (src: string | null) => {
    if (!src) return "/placeholder.jpg"; // Optional: default image
    if (src.startsWith("blob:") || src.startsWith("data:")) return src;
    if (src.startsWith("/uploads")) return src;
    return `/uploads/${src}`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-lime-700">
        {editingId ? "Edit Blog" : "Add Blog"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow p-6 mb-10"
      >
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border rounded mb-4"
        />

        <textarea
          placeholder="Blog Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={5}
          className="w-full p-3 border rounded mb-4"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              setImagePreview(URL.createObjectURL(file));
            }
          }}
          className="mb-4"
        />

        {imagePreview && (
          <div className="mb-4 relative w-full h-64 rounded shadow overflow-hidden">
            <Image
              src={getImageSrc(imagePreview)}
              alt="Preview"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
              className="object-cover"
            />
          </div>
        )}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-lime-700 hover:bg-lime-800 text-white px-5 py-2 rounded"
          >
            {editingId ? "Update Blog" : "Add Blog"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between h-full"
          >
            {blog.image && (
              <div className="relative w-full h-48 rounded mb-3 overflow-hidden">
                <Image
                  src={getImageSrc(blog.image)}
                  alt={blog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                  className="object-cover"
                />
              </div>
            )}

            <h2 className="font-bold text-lg mb-2">{blog.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-3">{blog.content}</p>
            <p className="text-xs text-gray-400 mt-2">
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(blog)}
                className="text-blue-600 font-semibold hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="text-red-600 font-semibold hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
