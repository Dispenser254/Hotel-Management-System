/* eslint-disable react/prop-types */
// import { useState } from "react";
import { FaSchool } from "react-icons/fa6";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
  DASHBOARD_SIDEBAR_LINKS,
} from "../../lib/Navigation";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

const Sidebar = () => {
  

  return (
    <div className="flex flex-col bg-slate-500 text-white w-60 p-3">
      <div className="flex items-center gap-2 px-3 py-3 border-b border-slate-400">
        <FaSchool fontSize={33} className="text-green-300" />
        <span className="text-2xl text-green-300 font-bold">Froden Hotel</span>
      </div>
      <div className="flex-1 flex flex-col gap-0.5 py-8">
        {DASHBOARD_SIDEBAR_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
      </div>
      <div className="flex flex-col gap-0.5 border-t border-slate-400 py-2">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <SidebarLink key={item.key} item={item} />
        ))}
        <Link to="/logout" className="flex items-center gap-2 text-red-500 font-extrabold hover:bg-red-300 rounded-lg px-4 py-4">
          <span className="text-xl">
            <HiOutlineLogout fontSize={22} />
          </span>
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

function SidebarLink({item}) {
    const {pathname} = useLocation()
    return (
        <Link to={item.path}className={classNames(
				pathname === item.path
					? "text-white bg-orange-400"
					: "text-neutral-400",
				"flex items-center gap-2 font-bold px-4 py-4 rounded-3xl text-base hover:bg-orange-200"
			)} >
        <span className="text-xl">{item.icon}</span>
        {item.label}
        </Link>
    )
}