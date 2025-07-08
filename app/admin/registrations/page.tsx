"use client";

import { useEffect, useState } from "react";

interface Registration {
  id: number;
  fullName: string;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  gender: string;
  occupation: string;
  idType: string;
  idNumber: string;
  issuedAuthority: string;
  issuedPlace: string;
  issuedDate: string;
  expiryDate: string;
  createdAt: string;
}

const PAGE_SIZE = 10;

export default function AdminRegistrations() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRegistrations() {
      try {
        setLoading(true);
        const res = await fetch("/api/registrations");
        if (!res.ok) throw new Error("Failed to fetch registrations");
        const data = await res.json();
        setRegistrations(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchRegistrations();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(registrations.length / PAGE_SIZE);
  const currentData = registrations.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <h1 className="text-3xl font-bold mb-6 text-lime-700">Registrations</h1>

      {loading && <p>Loading registrations...</p>}
      {error && <p className="text-red-600">Error: {error}</p>}

      {!loading && !error && registrations.length === 0 && (
        <p>No registrations found.</p>
      )}

      {!loading && !error && registrations.length > 0 && (
        <>
          <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
            <thead className="bg-lime-700 text-white">
              <tr>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">DOB</th>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Occupation</th>
                <th className="p-2 text-left">ID Type</th>
                <th className="p-2 text-left">ID Number</th>
                <th className="p-2 text-left">Issued Authority</th>
                <th className="p-2 text-left">Issued Place</th>
                <th className="p-2 text-left">Issued Date</th>
                <th className="p-2 text-left">Expiry Date</th>
                <th className="p-2 text-left">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((reg) => (
                <tr
                  key={reg.id}
                  className="border-t border-gray-200 hover:bg-gray-50"
                >
                  <td className="p-2">{reg.fullName}</td>
                  <td className="p-2">{reg.email}</td>
                  <td className="p-2">
                    {new Date(reg.dateOfBirth).toLocaleDateString()}
                  </td>
                  <td className="p-2">{reg.mobileNumber}</td>
                  <td className="p-2">{reg.gender}</td>
                  <td className="p-2">{reg.occupation}</td>
                  <td className="p-2">{reg.idType}</td>
                  <td className="p-2">{reg.idNumber}</td>
                  <td className="p-2">{reg.issuedAuthority}</td>
                  <td className="p-2">{reg.issuedPlace}</td>
                  <td className="p-2">
                    {new Date(reg.issuedDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {new Date(reg.expiryDate).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {new Date(reg.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4 gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>

            <span className="flex items-center px-4">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
