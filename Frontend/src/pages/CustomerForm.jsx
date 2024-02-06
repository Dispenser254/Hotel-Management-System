import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CustomerForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    id_number: "",
    first_name: "",
    last_name: "",
    gender: "",
    email: "",
    address: "",
    phone_number: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8000/api/customer/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("Successfully submitted customer data");
        return navigate("../customers", { replace: true });
      } else {
        console.log("Failed to add customer", response.status);
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
        <h1>Add Customer</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ID Number"
          name="id_number"
          value={formData.id_number}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleInputChange}
        />

        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
        />

        <input
          type="text"
          placeholder="Phone Number"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleInputChange}
        />

        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
};
