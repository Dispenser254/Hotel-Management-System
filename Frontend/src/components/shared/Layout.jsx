// import React from 'react'

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  return (
    <>
      <div className="flex flex-row bg-neutral-200 overflow-hidden h-screen w-screen">
        <Sidebar />
        <div className="flex-1">
          <Header />
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
