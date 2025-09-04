import React, { useEffect, useState } from "react";
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import RentalForm from "../pages/rental-form/RentalForm";
import MyRentalList from "./rental-list-customer/MyRentalList";

export default function Dashboard() {
  const { setRole } = useAuth();
  const [activePage, setActivePage] = useState("home");

  useEffect(() => {
    // Simulate role assignment after login
    const userRole = localStorage.getItem('userRole'); // 'admin' or 'customer'
    setRole(userRole);
  }, [setRole]);

  return (
    <div className="flex min-h-screen">
      <div className="w-64 fixed top-0 left-0 h-screen bg-gray-800 text-white">
        <Sidebar onNavigate={setActivePage} />
      </div>
      <div className="flex-1 ml-64 p-8 bg-gray-100 overflow-y-auto">
        {activePage === "home" && (
          <>
            <h1 className="text-3xl font-bold mb-4">Welcome to the Dashboard</h1>
            <p>This is the main content area.</p>
          </>
        )}

        {activePage === "bookCar" && <RentalForm />}
        {activePage === "myRentals" && <MyRentalList />}

      </div>
    </div>
  );
}
