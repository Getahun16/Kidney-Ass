"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string; // should be a public URL or accessible URL
  createdAt: string;
}

export default function SlideManager() {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchSlides();
  }, []);

  const fetchSlides = async () => {
    const res = await fetch("/api/slide");
    const data = await res.json();
    setSlides(data);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setImageFile(null);
    setPreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);
    if (editingId) formData.append("id", editingId.toString());

    await fetch("/api/slide", {
      method: editingId ? "PUT" : "POST",
      body: formData,
    });

    resetForm();
    fetchSlides();
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch("/api/slide", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: { "Content-Type": "application/json" },
    });
    fetchSlides();
  };

  const handleEdit = (slide: Slide) => {
    setTitle(slide.title);
    setDescription(slide.description);
    setPreview(slide.image);
    setEditingId(slide.id);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {editingId ? "Edit Slide" : "Add Slide"}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow mb-10 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setImageFile(file);
              setPreview(URL.createObjectURL(file));
            }
          }}
        />
        {preview &&
          // Use <img> only for blob preview (local temporary files)
          (preview.startsWith("blob:") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={preview}
              alt="Preview"
              className="w-64 mt-2 rounded shadow"
            />
          ) : null)}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-lime-700 text-white px-6 py-2 rounded"
          >
            {editingId ? "Update" : "Add"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 text-white px-6 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-xl font-semibold mb-4">Slides</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {slides.map((slide) => (
          <div key={slide.id} className="bg-white rounded shadow p-4 relative">
            <div className="relative w-full h-48 mb-2 rounded overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={false}
              />
            </div>
            <h3 className="text-lg font-bold">{slide.title}</h3>
            <p className="text-sm text-gray-600">{slide.description}</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={() => handleEdit(slide)}
                className="text-blue-600 font-medium"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(slide.id)}
                className="text-red-600 font-medium"
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
