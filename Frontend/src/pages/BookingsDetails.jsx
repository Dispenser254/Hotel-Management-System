/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const BookingsDetails = () => {
  const [booking, setBooking] = useState({});
  const params = useParams();

  const fetchBookings = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/booking/${params.id}`
      );
      const data = await response.json();
      setBooking(data);
      console.log(data);
    } catch (error) {
      console.log("An error occurred while fetching booking data", error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);
  return (
    <div>
      <div className="text-center">
        <h1>Explore Bookings Details</h1>
      </div>
      <div>
        <p>ID Number: {booking.id_number}</p>
        <p>Room Number: {booking.room_number}</p>
        <p>Arrival Date: {booking.check_in}</p>
        <p>Departure Date: {booking.check_out}</p>
        <p>Payment Status: {booking.payment}</p>
        <p>Rent: {booking.status}</p>
        <p>Description: {booking.description}</p>
      </div>
    </div>
  );
};
