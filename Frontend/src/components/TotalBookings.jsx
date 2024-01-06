// import React from 'react'

import { useEffect, useState } from "react";

export const TotalBookings = () => {
  const [totalBookings, setTotalBookings] = useState(0);

  const getTotalBookings = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/booking/");
      const data = await response.json();
      setTotalBookings(data.bookings_count);
      console.log(data);
    } catch (error) {
      console.log("Failed to get booking count", error);
    }
  };

  useEffect(() => {
    getTotalBookings();
  });

  return (
    <>
      <span className="text-sm text-gray-500 font-light">Total Bookings</span>
      <div className="flex items-center px-4">
        <strong className="text-xl text-gray-700 font-semibold">
          {totalBookings}
        </strong>
      </div>
    </>
  );
};
