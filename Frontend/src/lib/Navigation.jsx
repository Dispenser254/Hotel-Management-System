// import React from 'react'
import {
  HiCurrencyDollar,
  HiHome,
  HiMailOpen,
  HiOutlineBookOpen,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
  HiOutlineViewGrid,
  HiUserGroup,
} from "react-icons/hi";
// imp

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "bookings",
    label: "Bookings",
    path: "/bookings",
    icon: <HiOutlineBookOpen />,
  },
  {
    key: "rooms",
    label: "Rooms",
    path: "/rooms",
    icon: <HiHome />,
  },
  {
    key: "customers",
    label: "Customers",
    path: "/customers",
    icon: <HiUserGroup />,
  },
  {
    key: "payments",
    label: "Payments",
    path: "/payments",
    icon: <HiCurrencyDollar />
  },
  {
        key: "messages",
        label: "Messages",
        path: "/messages",
        icon: <HiMailOpen />
    }
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: "support",
        label: "Help & Support",
        path: "/support",
        icon: <HiOutlineQuestionMarkCircle />
    },
    {
        key: "settings",
        label: "Settings",
        path: "/settings",
        icon: <HiOutlineCog />
    }
]