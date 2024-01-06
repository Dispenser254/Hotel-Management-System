import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const RoomForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    room_number: "",
    room_type: "",
    bed_capacity: "",
    air_condition: "",
    rent: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/rooms/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Successfully submitted data");
        return navigate("../rooms", { replace: true });
      } else {
        console.log("Failed to add room", response.status);
      }
    } catch (error) {
      console.log("An error occurred while submitting data", error);
    }
  };
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div>
      <div>
        <h1>Add Room</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room Number"
          name="room_number"
          value={formData.room_number}
          onChange={handleInputChange}
        />

        <select
          name="room_type"
          value={formData.room_type}
          onChange={handleInputChange}
        >
          <option value="">Select Room Type</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Super Deluxe">Super Deluxe</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
        </select>

        <input
          type="text"
          placeholder="Bed Capacity"
          name="bed_capacity"
          value={formData.bed_capacity}
          onChange={handleInputChange}
        />

        <select
          name="air_condition"
          value={formData.air_condition}
          onChange={handleInputChange}
        >
          <option value="">Select Air Condition</option>
          <option value="AC">AC</option>
          <option value="No AC Deluxe">No AC</option>
        </select>

        <input
          type="text"
          placeholder="Rent"
          name="rent"
          value={formData.rent}
          onChange={handleInputChange}
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          cols="10"
          rows="10"
          placeholder="Description"
        ></textarea>

        <button type="submit">Add Room</button>
      </form>
    </div>
  
  );
};
