import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/shared/Layout";
import Dashboard from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Customers } from "./pages/Customers";
import { Rooms } from "./pages/Rooms";
import { Payments } from "./pages/Payments";
import { Messages } from "./pages/Messages";
import { Support } from "./pages/Support";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import { Logout } from "./pages/Logout";
import { RoomDetail } from "./pages/RoomDetail";
import { RoomEditForm } from "./pages/RoomEditForm";
import { RoomForm } from "./pages/RoomForm";
import { BookingsForm } from "./pages/BookingsForm";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="bookings/addBookings/" element={<BookingsForm />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="rooms/:id/" element={<RoomDetail />} />
          <Route path="rooms/edit/:id/" element={<RoomEditForm />} />
          <Route path="rooms/addRooms/" element={<RoomForm />} />
          <Route path="customers" element={<Customers />} />
          <Route path="payments" element={<Payments />} />
          <Route path="messages" element={<Messages />} />
          <Route path="support" element={<Support />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="logout" element={<Logout />} />
      </Routes>
    </Router>
  );
}
