// import React from 'react'

import { useEffect, useState } from "react";

export const TotalCustomers = () => {
  const [totalCustomers, setTotalCustomers] = useState(0);

  const getTotalCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/customer/");
      const data = await response.json();
      setTotalCustomers(data.customer_count);
      console.log(data);
    } catch (error) {
      console.log("Failed to get customer count", error);
    }
  };

  useEffect(() => {
    getTotalCustomers();
  });

  return (
    <>
      <span className="text-sm text-gray-500 font-light">Total Customers</span>
      <div className="flex items-center px-4">
        <strong className="text-xl text-gray-700 font-semibold">
          {totalCustomers}
        </strong>
      </div>
    </>
  );
};
