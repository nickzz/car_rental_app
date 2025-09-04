// src/pages/Register.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { register as registerUser } from '../services/authService';
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      alert('Registration successful!');
      navigate("/login");
    } catch (error) {
      alert('Registration failed: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded shadow-md w-full max-w-2xl pt-2 pb-2"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

        {/* First & Last Name */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              {...register('firstName', { required: true })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="First Name" autoComplete="off"
            />
            {errors.firstName && <span className="text-red-500 text-sm">First name is required</span>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              {...register('lastName', { required: true })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Last Name" autoComplete="off" 
            />
            {errors.lastName && <span className="text-red-500 text-sm">Last name is required</span>}
          </div>
        </div>

        {/* DOB & NRIC */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              {...register('dateOfBirth', { required: true })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.dateOfBirth && <span className="text-red-500 text-sm">Date of birth is required</span>}
          </div>

          <div>
            <label className="block mb-1 font-medium">NRIC</label>
            <input
              {...register('nric', { required: true })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="NRIC" autoComplete="off" 
            />
            {errors.nric && <span className="text-red-500 text-sm">NRIC is required</span>}
          </div>
        </div>

        {/* Email & Password */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register('email', { required: true })}
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email" autoComplete="off" 
            />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              {...register('password', { required: true, minLength: 6 })}
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password" autoComplete="off" 
            />
            {errors.password && <span className="text-red-500 text-sm">Password must be at least 6 characters</span>}
          </div>
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            {...register('phoneNumber', { required: true })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Phone Number" autoComplete="off" 
          />
          {errors.phoneNumber && <span className="text-red-500 text-sm">Phone number is required</span>}
        </div>

        {/* Address */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Address</label>
          <textarea
            {...register('address', { required: true })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Address" autoComplete="off" 
          />
          {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </button>
      </form>
    </div>
  );

}
