"use client";

import { useState } from "react";

export default function RegistrationForm() {
  const [form, setForm] = useState({
    fullName: "",
    dateOfBirth: "",
    email: "",
    mobileNumber: "",
    gender: "",
    occupation: "",
    idType: "",
    idNumber: "",
    issuedAuthority: "",
    issuedPlace: "",
    issuedDate: "",
    expiryDate: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      newErrors.email = "Email format is invalid";

    if (!form.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile Number is required";

    if (!form.gender) newErrors.gender = "Please select gender";

    if (!form.occupation.trim())
      newErrors.occupation = "Occupation is required";

    if (!form.idType) newErrors.idType = "Please select ID Type";

    if (!form.idNumber.trim()) newErrors.idNumber = "ID Number is required";

    if (!form.issuedAuthority.trim())
      newErrors.issuedAuthority = "Issued Authority is required";

    if (!form.issuedPlace.trim())
      newErrors.issuedPlace = "Issued Place is required";

    if (!form.issuedDate) newErrors.issuedDate = "Issued Date is required";

    if (!form.expiryDate) newErrors.expiryDate = "Expiry Date is required";

    // Example date logic: Expiry date should be after issued date
    if (form.issuedDate && form.expiryDate) {
      if (new Date(form.expiryDate) <= new Date(form.issuedDate)) {
        newErrors.expiryDate = "Expiry Date must be after Issued Date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear error on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          dateOfBirth: new Date(form.dateOfBirth),
          issuedDate: new Date(form.issuedDate),
          expiryDate: new Date(form.expiryDate),
        }),
      });

      if (res.ok) setSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-lg mt-16">
      <h2 className="text-3xl font-bold text-lime-700 mb-6 text-center">
        Registration Form
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        noValidate
      >
        {/* Personal Details */}
        <h3 className="col-span-full text-lg font-semibold text-gray-700">
          Personal Details
        </h3>

        <div>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className={`input ${errors.fullName ? "border-red-500" : ""}`}
            required
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            className={`input ${errors.dateOfBirth ? "border-red-500" : ""}`}
            required
          />
          {errors.dateOfBirth && (
            <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={`input ${errors.email ? "border-red-500" : ""}`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="mobileNumber"
            placeholder="Mobile Number"
            value={form.mobileNumber}
            onChange={handleChange}
            className={`input ${errors.mobileNumber ? "border-red-500" : ""}`}
            required
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className={`input ${errors.gender ? "border-red-500" : ""}`}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={form.occupation}
            onChange={handleChange}
            className={`input ${errors.occupation ? "border-red-500" : ""}`}
            required
          />
          {errors.occupation && (
            <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>
          )}
        </div>

        {/* Identity Details */}
        <h3 className="col-span-full text-lg font-semibold text-gray-700 mt-4">
          Identity Details
        </h3>

        <div>
          <select
            name="idType"
            value={form.idType}
            onChange={handleChange}
            className={`input ${errors.idType ? "border-red-500" : ""}`}
            required
          >
            <option value="">Select ID Type</option>
            <option value="Passport">Passport</option>
            <option value="National ID">National ID</option>
            <option value="Driver&#39;s License">Driver&#39;s License</option>
          </select>
          {errors.idType && (
            <p className="text-red-500 text-sm mt-1">{errors.idType}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="idNumber"
            placeholder="ID Number"
            value={form.idNumber}
            onChange={handleChange}
            className={`input ${errors.idNumber ? "border-red-500" : ""}`}
            required
          />
          {errors.idNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.idNumber}</p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="issuedAuthority"
            placeholder="Issued Authority"
            value={form.issuedAuthority}
            onChange={handleChange}
            className={`input ${
              errors.issuedAuthority ? "border-red-500" : ""
            }`}
            required
          />
          {errors.issuedAuthority && (
            <p className="text-red-500 text-sm mt-1">
              {errors.issuedAuthority}
            </p>
          )}
        </div>

        <div>
          <input
            type="text"
            name="issuedPlace"
            placeholder="Issued Place"
            value={form.issuedPlace}
            onChange={handleChange}
            className={`input ${errors.issuedPlace ? "border-red-500" : ""}`}
            required
          />
          {errors.issuedPlace && (
            <p className="text-red-500 text-sm mt-1">{errors.issuedPlace}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="issuedDate"
            value={form.issuedDate}
            onChange={handleChange}
            className={`input ${errors.issuedDate ? "border-red-500" : ""}`}
            required
          />
          {errors.issuedDate && (
            <p className="text-red-500 text-sm mt-1">{errors.issuedDate}</p>
          )}
        </div>

        <div>
          <input
            type="date"
            name="expiryDate"
            value={form.expiryDate}
            onChange={handleChange}
            className={`input ${errors.expiryDate ? "border-red-500" : ""}`}
            required
          />
          {errors.expiryDate && (
            <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>
          )}
        </div>

        <div className="col-span-full mt-4">
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-lime-700 text-white rounded-lg hover:bg-lime-800 transition"
          >
            {loading ? "Submitting..." : "Next"}
          </button>
          {success && (
            <p className="text-green-600 mt-2 text-center">
              Registration successful!
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
