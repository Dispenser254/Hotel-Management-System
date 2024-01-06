import { useEffect, useState } from "react";

export const AvailableRooms = () => {
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalBookings, setTotalBookings] = useState(0);

  const getTotalRooms = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rooms/");
      const data = await response.json();
      setTotalRooms(data.rooms_count);
      console.log(data);
    } catch (error) {
      console.log("Failed to get rooms count", error);
    }
  };
  useEffect(() => {
    getTotalRooms();
  });

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

  const availableRooms = totalRooms - totalBookings;
  return (
    <>
      <span className="text-sm text-gray-500 font-light">Available Rooms</span>
      <div className="flex items-center">
        <strong className="text-xl text-gray-700 font-semibold">
          {availableRooms}
        </strong>
      </div>
    </>
  );
};
