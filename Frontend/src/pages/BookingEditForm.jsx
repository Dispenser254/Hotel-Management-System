/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

export const BookingEditForm = () => {
  const navigate = useNavigate();
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableCustomers, setAvailableCustomers] = useState([]);
  const params = useParams();

  const [formData, setFormData] = useState({
    id_number: "",
    room_number: "",
    check_in: "",
    check_out: "",
    payment: "",
    status: "",
    description: "",
  });

  const fetchBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/booking/${params.id}`
      );
      const data = await response.json();
      setFormData(data);
      console.log(data);
    } catch (error) {
      console.log("An error occurred while fetching data", error);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [params.id]);

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

  const fetchCustomers = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/customer/`);
      const data = await response.json();
      setAvailableCustomers(data.customer);
      console.log(data);
    } catch (error) {
      console.log("An error occurred while fetching customers", error);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/booking/${params.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Successfully submitted bookings data");
        return navigate("../bookings", { replace: true });
      } else {
        console.log("Failed to update room", response.status);
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
        <h1>Update Bookings</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <select
          name="id_number"
          value={formData.id_number}
          onChange={handleInputChange}
        >
          <option value="">Select Customer</option>
          {availableCustomers.map((customer) => (
            <option key={customer.id} value={customer.id}>
              {customer.id_number} {customer.first_name}
            </option>
          ))}
        </select>

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
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="">Select Status</option>
          <option value="Inside">Inside</option>
          <option value="Checked">Checked Out</option>
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          cols="10"
          rows="10"
          placeholder="Description"
        ></textarea>

        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};
