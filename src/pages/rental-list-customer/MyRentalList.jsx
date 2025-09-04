import React, { useEffect, useState } from "react";
import { getAllApplications } from "../../services/bookingService";

const MyRentalList = () => {
    const [applications, setApplications] = useState([]);

    const statusMap = {
        0: "Pending",
        1: "Approved",
        2: "Rejected"
    };

    useEffect(() => {
        getAllApplications()
            .then((res) => setApplications(res.data))
            .catch((err) => console.error("Failed to fetch applications", err));
    }, []);

    return (
        <div className="pl-2 pr-2">
            <h2 className="text-2xl font-bold mb-4">My Applications</h2>
            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <table className="min-w-full border border-gray-300">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="border px-4 py-2">Car</th>
                            <th className="border px-4 py-2">Start Date</th>
                            <th className="border px-4 py-2">End Date</th>
                            <th className="border px-4 py-2">Price (RM)</th>
                            <th className="border px-4 py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {applications.map((app) => (
                            <tr key={app.id} className="text-center">
                                <td className="border px-4 py-2">
                                    {app.car?.brand} {app.car?.model} ({app.car?.plateNo})
                                </td>
                                <td className="border px-4 py-2">
                                    {new Date(app.startDate).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2">
                                    {new Date(app.endDate).toLocaleDateString()}
                                </td>
                                <td className="border px-4 py-2">{app.estimatedPrice}</td>
                                <td className="border px-4 py-2">{statusMap[app.status]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyRentalList;
