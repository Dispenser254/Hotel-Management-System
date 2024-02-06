/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const CustomerDetails = () => {
  const [customer, setCustomer] = useState({});
  const params = useParams();

  const fetchCustomers = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/customer/${params.id}`
      );
      const data = await response.json();
      setCustomer(data);
      console.log(data);
    } catch (error) {
      console.log("An error occurred while fetching customer data", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);
  return (
    <div>
      <div className="text-center">
        <h1>Explore Customer Details</h1>
      </div>
      <div>
        <p>ID Number: {customer.id_number}</p>
        <p>First Name: {customer.first_name}</p>
        <p>Last Name: {customer.last_name}</p>
        <p>Gender: {customer.gender}</p>
        <p>Email: {customer.email}</p>
        <p>Address: {customer.address}</p>
        <p>Phone Number: {customer.phone_number}</p>
      </div>
    </div>
  );
};
