import React, { useState, useEffect } from "react";
import { getAvailableCars, getEstimatedPrice } from "../../services/carService"; // <-- import service
import { submitRental } from "../../services/bookingService";

const RentalForm = () => {
    const [cars, setCars] = useState([]);
    const [carId, setCarId] = useState("");
    const [rentalType, setRentalType] = useState("perday");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [totalPrice, setTotalPrice] = useState(null);
    const [agreement, setAgreement] = useState(false);
    const [notes, setNotes] = useState("");

    // Auto-update endDate if rentalType is week/month
    useEffect(() => {
        if (startDate) {
            if (rentalType === "perweek") {
                const newEnd = new Date(startDate);
                newEnd.setDate(newEnd.getDate() + 7);
                setEndDate(newEnd.toISOString().split("T")[0]);
            } else if (rentalType === "permonth") {
                const newEnd = new Date(startDate);
                newEnd.setDate(newEnd.getDate() + 30);
                setEndDate(newEnd.toISOString().split("T")[0]);
            }
        }
    }, [startDate, rentalType]);

    // Fetch available cars when dates are set
    useEffect(() => {
        if (startDate && endDate) {
            getAvailableCars(startDate, endDate)
                .then(res => setCars(res.data))
                .catch(err => console.error(err));
        }
    }, [startDate, endDate]);

    // Fetch estimated price whenever inputs change
    useEffect(() => {
        if (carId && startDate && endDate) {
            getEstimatedPrice(carId, startDate, endDate)
                .then(res => setTotalPrice(res.data))
                .catch(() => setTotalPrice(null));
        }
    }, [carId, startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agreement) {
            alert("You must agree to the terms before submitting.");
            return;
        }

        try {
            const rentalData = { carId, startDate, endDate, notes };
            await submitRental(rentalData);
            setCarId("");
            setStartDate("");
            setEndDate("");
            setNotes("");
            setAgreement(false);
            setTotalPrice(null);
            window.alert("Rental application submitted successfully!");
        }
        catch (error) {
            console.error(error);
            window.alert("Failed to submit rental application.");
        }
    };

    return (
        <div className="w-full max-w-lg mx-auto bg-white p-4 border rounded-lg shadow-md">
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4 text-center">Car Rental Application</h2>

                {/* Rental Type Selector */}
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Rental Type</label>
                    <select
                        className="border p-1.5 w-full rounded text-sm"
                        value={rentalType}
                        onChange={(e) => setRentalType(e.target.value)}
                    >
                        <option value="perday">Per Day</option>
                        <option value="perweek">Per Week</option>
                        <option value="permonth">Per Month</option>
                    </select>
                </div>

                {/* Start Date */}
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                        type="date"
                        className="border p-1.5 w-full rounded text-sm"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>

                {/* End Date */}
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                        type="date"
                        className="border p-1.5 w-full rounded text-sm"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                        readOnly={rentalType !== "perday"}
                    />
                </div>

                {/* Car selection */}
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Select Car</label>
                    <select
                        className="border p-1.5 w-full rounded text-sm"
                        value={carId}
                        onChange={(e) => setCarId(e.target.value)}
                        required
                    >
                        <option value="">-- Select a car --</option>
                        {cars.map((car) => (
                            <option key={car.id} value={car.id}>
                                {car.brand} {car.model} ({car.plateNo})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Estimated Price */}
                {totalPrice !== null && (
                    <p className="mb-3 text-sm font-semibold text-green-600">
                        Estimated Price: RM {totalPrice}
                    </p>
                )}

                {/* Notes */}
                <div className="mb-3">
                    <label className="block text-sm font-medium mb-1">Notes</label>
                    <textarea
                        className="border p-1.5 w-full rounded text-sm"
                        rows="2"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Any special request..."
                    />
                </div>

                {/* Agreement */}
                <div className="mb-3 text-sm">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            className="mr-2"
                            checked={agreement}
                            onChange={(e) => setAgreement(e.target.checked)}
                        />
                        I agree to the terms and conditions.
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition text-sm"
                >
                    Submit Rental
                </button>
            </form>
        </div>

    );
};

export default RentalForm;
