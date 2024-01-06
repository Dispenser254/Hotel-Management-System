import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const BookingsForm = () => {
  const navigate = useNavigate();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableCustomers, setAvailableCustomers] = useState([])

  const fetchAvailableRooms = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/rooms/`);
      const data = await response.json();
      setAvailableRooms(data.rooms);
      console.log(data);
    } catch (error) {
      console.log(
        "an error occurred while trying to fetch available rooms",
        error
      );
    }
  };
  useEffect(() => {
    fetchAvailableRooms();
  }, []);

  const fetchCustomers = async() => {
    try{
        const response = await fetch(`http://localhost:8000/api/customers/`)
        const data = await response.json()
        availableCustomers(data)
        console.log(data)
    }catch(error){
        console.log("An error occurred while fetching customers", data)
    }
  }
  useEffect(() => {
    fetchCustomers()
  })

  const [formData, setFormData] = useState({
    id_number: "",
    room_number: "",
    check_in: "",
    check_out: "",
    payment: "",
    status: "",
    description: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/booking/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Successfully submitted bookings data");
        return navigate("../bookings", { replace: true });
      } else {
        console.log("Failed to add booking", response.status);
      }
    } catch (error) {
      console.log("An error occurred while submitting bookings data", error);
    }
  };
  const handleInputChange = async (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div>
      <div>
        <h1>Add Booking</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <select
          name="room_number"
          value={formData.room_number}
          onChange={handleInputChange}
        >
          <option value="">Select a Room</option>
          {availableRooms.map(
            (room) =>
              room.status === "Open" && (
                <option key={room.id} value={room.id}>
                  {room.room_number}
                </option>
              )
          )}
        </select>

        <input
          type="date"
          placeholder="Arrival Date"
          name="check_in"
          value={formData.check_in}
          onChange={handleInputChange}
        />

        <input
          type="date"
          placeholder="Departure Date"
          name="check_out"
          value={formData.check_out}
          onChange={handleInputChange}
        />
        <select
          name="payment"
          value={formData.payment}
          onChange={handleInputChange}
        >
          <option value="">Select Payment Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="">Select Status</option>
          <option value="inside">Inside</option>
          <option value="checked">Checked Out</option>
        </select>

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
