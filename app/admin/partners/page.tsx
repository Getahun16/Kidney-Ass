"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";

interface Partner {
  id: number;
  name: string;
  logo: string;
}

export default function ManagePartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const res = await fetch("/api/partner");
    const data = await res.json();
    setPartners(Array.isArray(data) ? data : []);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return alert("Please enter a name");

    const formData = new FormData();
    formData.append("name", name);
    if (imageFile) formData.append("image", imageFile);

    setLoading(true);

    try {
      const res = await fetch(
        editingId ? `/api/partner/${editingId}` : "/api/partner",
        {
          method: editingId ? "PUT" : "POST",
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Failed to save partner");
      } else {
        alert(editingId ? "Partner updated!" : "Partner added!");
        resetForm();
        fetchPartners();
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    await fetch(`/api/partner/${id}`, { method: "DELETE" });
    fetchPartners();
  };

  const handleEdit = (partner: Partner) => {
    setEditingId(partner.id);
    setName(partner.name);
    setImagePreview(partner.logo);
  };

  const resetForm = () => {
    setEditingId(null);
    setName("");
    setImageFile(null);
    setImagePreview(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-lime-700">
        {editingId ? "Edit Partner" : "Add Partner"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded shadow p-4 mb-8 space-y-4"
      >
        <input
          type="text"
          placeholder="Partner Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <Image
            src={
              imagePreview.startsWith("blob:") ||
              imagePreview.startsWith("http")
                ? imagePreview // ✅ Local preview (before upload)
                : `/uploads/${imagePreview.replace(/^\/?uploads\//, "")}` // ✅ Uploaded image from DB
            }
            alt="Preview"
            width={200}
            height={100}
            className="rounded border shadow"
          />
        )}

        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-lime-700 text-white px-4 py-2 rounded hover:bg-lime-800 disabled:opacity-50"
          >
            {loading ? "Saving..." : editingId ? "Update" : "Add Partner"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-semibold mb-4 text-gray-700">
        Manage Partners
      </h3>

      {partners.length === 0 ? (
        <p className="text-gray-500">No partners yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white rounded-xl shadow p-4 flex flex-col items-center space-y-3"
            >
              <Image
                src={
                  partner.logo.startsWith("/uploads")
                    ? partner.logo
                    : `/uploads/${partner.logo}`
                }
                alt={partner.name}
                width={120}
                height={80}
                className="object-contain rounded border"
              />
              <h4 className="font-semibold text-gray-800">{partner.name}</h4>
              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(partner)}
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Pencil size={16} />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(partner.id)}
                  className="text-red-600 hover:underline flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
