/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const RoomDetail = () => {
    const [room, setRoom] = useState({})
    const params = useParams()

    const fetchRoom = async() => {
        try{
            const response = await fetch(`http://localhost:8000/api/rooms/${params.id}`)
            const data = await response.json()
            setRoom(data)
            console.log(data)
        }catch(error){
            console.log('An error occurred while fetching data', error)
        }
    }

    useEffect(() => {
        fetchRoom()
    }, [])
  return (
    <div>
      <div className="text-center">
        <h1>Explore Room Details</h1>
      </div>
      <div>
        <p>Room Number: {room.room_number}</p>
        <p>Room Type: {room.room_type}</p>
        <p>Bed Capacity: {room.bed_capacity}</p>
        <p>Air Condition: {room.air_condition}</p>
        <p>Rent: {room.rent}</p>
        <p>Description: {room.description}</p>
      </div>
    </div>
  );
}
