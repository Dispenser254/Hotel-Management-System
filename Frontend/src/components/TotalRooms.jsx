import { useEffect, useState } from "react";

export const TotalRooms = () => {
    const [totalRooms, setTotalRooms] = useState(0);

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
  return (
    <>
      <span className="text-sm text-gray-500 font-light">Total Rooms</span>
      <div className="flex items-center px-4">
        <strong className="text-xl text-gray-700 font-semibold">{totalRooms}</strong>
      </div>
    </>
  );
}
