// src/components/Sidebar.jsx
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";

export default function Sidebar({ onNavigate }) {
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect after logout
  };

  const customerLinks = [
    { name: 'Book Car', key: 'bookCar' },
    { name: 'My Applications', key: 'myRentals' },
    { name: 'Profile', key: 'profile' },
  ];

  const adminLinks = [
    { name: 'Manage Cars', key: 'manageCars' },
    { name: 'Manage Users', key: 'manageUsers' },
  ];

  const links = role === 'admin' ? adminLinks : customerLinks;

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
      {/* Top Section */}
      <div>
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <ul>
          {links.map((link) => (
            <li
              key={link.key}
              className="mb-4 cursor-pointer hover:underline"
              onClick={() => onNavigate(link.key)}
            >
              {link.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom Section (Logout) */}
      <div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );

}
