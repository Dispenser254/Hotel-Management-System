/* eslint-disable react/prop-types */
// import React from 'react'
import { HiOutlineBookOpen, HiOutlineHome, HiOutlineUser } from "react-icons/hi";
import { TotalBookings } from "./TotalBookings";
import { TotalCustomers } from "./TotalCustomers";
import { AvailableRooms } from "./AvailableRooms";
import { TotalRooms } from "./TotalRooms";

export const DashboardStatsGrid = () => {
  return (
    <div className="flex gap-4">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <HiOutlineBookOpen className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <TotalBookings />
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-purple-500">
            <HiOutlineHome className="text-2xl text-white" />
        </div>
        <div className="pl-4">
            <TotalRooms />
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-pink-500">
          <HiOutlineHome className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <AvailableRooms />
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-300">
          <HiOutlineUser className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <TotalCustomers />
        </div>
      </BoxWrapper>
    </div>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200 flex flex-1 items-center">
      {children}
    </div>
  );
}