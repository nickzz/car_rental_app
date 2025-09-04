// src/pages/ForgotPassword.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { forgotPassword } from '../services/authService';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await forgotPassword(data);
      alert('Password reset link sent!');
    } catch (error) {
      alert('Error: ' + error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Email</label>
          <input
            {...register('email', { required: true })}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Email"
          />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>

        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}
