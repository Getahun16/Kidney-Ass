"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface Blog {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export default function BlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (Array.isArray(data)) {
          setBlogs(data);
        } else {
          console.error("Unexpected blog response:", data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  // Get latest two blogs (excluding the currently selected one)
  const latestBlogs = blogs
    .filter((blog) => (selectedBlog ? blog.id !== selectedBlog.id : true))
    .slice(0, 2);

  // Handler for clicking Read More
  const openBlog = (blog: Blog) => {
    setSelectedBlog(blog);
    // Removed the scrollTo to stay on current position
  };

  // Handler for Back button
  const closeBlog = () => {
    setSelectedBlog(null);
  };

  // Render blog detail view
  if (selectedBlog) {
    return (
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main blog content */}
            <div className="lg:w-3/4">
              <button
                onClick={closeBlog}
                className="flex items-center text-lime-700 hover:text-lime-900 mb-6 font-medium text-sm group transition-colors"
              >
                <ArrowLeft
                  className="mr-2 group-hover:-translate-x-1 transition-transform"
                  size={16}
                />
                Back to Blogs
              </button>

              <article className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                {selectedBlog.image && (
                  <div className="aspect-video relative">
                    <Image
                      src={
                        selectedBlog.image.startsWith("/uploads")
                          ? selectedBlog.image
                          : `/uploads/${selectedBlog.image}`
                      }
                      alt={selectedBlog.title}
                      fill
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                )}
                <div className="p-6 md:p-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    {selectedBlog.title}
                  </h1>
                  <div className="prose max-w-none text-gray-700 mb-6">
                    {selectedBlog.content.split("\n").map((paragraph, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  <p className="text-xs text-gray-400">
                    Published on{" "}
                    {new Date(selectedBlog.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              </article>
            </div>

            {/* Latest blogs sidebar - compact */}
            <div className="lg:w-1/4 mt-8 lg:mt-0">
              <h3 className="text-lg font-bold text-lime-700 mb-4 pb-2 border-b border-gray-200">
                Latest Posts
              </h3>
              <div className="space-y-4">
                {latestBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-lime-200"
                    onClick={() => openBlog(blog)}
                  >
                    {blog.image && (
                      <div className="aspect-video relative mb-2 rounded-md overflow-hidden">
                        <Image
                          src={
                            blog.image.startsWith("/uploads")
                              ? blog.image
                              : `/uploads/${blog.image}`
                          }
                          alt={blog.title}
                          fill
                          className="w-full h-full object-cover"
                          sizes="(max-width: 768px) 100vw, 25vw"
                        />
                      </div>
                    )}
                    <h4 className="text-sm font-medium text-gray-800 mb-1 line-clamp-2">
                      {blog.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-1">
                      {blog.content}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-1">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Render blog list view with equal image sizes
  return (
    <section className="py-8 md:py-12 bg-gray-50" id="bloglist">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-bold text-lime-700 mb-8 text-center">
          Our Blogs
        </h2>

        {blogs.length === 0 ? (
          <p className="text-gray-500 text-center">No blog posts available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col h-full border border-gray-100 hover:border-lime-100"
              >
                {blog.image && (
                  <div className="aspect-video relative">
                    <Image
                      src={
                        blog.image.startsWith("/uploads")
                          ? blog.image
                          : `/uploads/${blog.image}`
                      }
                      alt={blog.title}
                      fill
                      className="w-full h-full object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.content}
                  </p>
                  <div className="mt-auto flex justify-between items-center">
                    <p className="text-xs text-gray-400">
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                    <button
                      onClick={() => openBlog(blog)}
                      className="text-lime-700 hover:text-lime-900 text-xs font-medium py-1 px-3 rounded-full border border-lime-700 hover:border-lime-900 transition cursor-pointer"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
