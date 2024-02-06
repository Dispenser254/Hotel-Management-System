import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { MdAdd, MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";

export const Bookings = () => {
  const itemsPerPage = 10;
  const [bookings, setBookings] = useState([]);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchBookings = async (delayInMilliseconds) => {
    try {
      setTimeout(async () => {
        const response = await fetch("http://localhost:8000/api/booking/");
        const data = await response.json();
        setBookings(data.bookings);
        setBookingsCount(data.bookings_count);
        console.log(data);
      }, delayInMilliseconds);
    } catch (error) {
      console.log("Error occurred while fetching the data", error);
    }
  };

  useEffect(() => {
    fetchBookings(1000);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = bookings.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (params) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/booking/${params}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Successfully deleted data");
        fetchBookings();
      } else {
        console.log("Failed to delete booking", response.status);
      }
    } catch (error) {
      console.log("An error occurred while deleting booking", error);
    }
  };

  return (
    <div className="flex flex-col px-4 py-2 overscroll-auto">
      <div className="scroll-container overflow-auto h-screen pb-8">
        <div className="flex">
          <div className="flex-1 pl-4 border-b border-slate-400 pb-5 my-5">
            <h2 className="text-2xl font-bold ">Booking List</h2>
            <p>You have {bookingsCount} rooms booked</p>
          </div>
          <Link to="addBookings/">
            <div className="mr-8 mt-5 flex items-center flex-col hover:bg-slate-400 p-4 rounded-lg bg-gray-300">
              <span className="text-sm p-2">Add Booking</span>
              <MdAdd
                className="text-white bg-sky-500 rounded-full flex justify-center"
                fontSize={30}
              />
            </div>
          </Link>
        </div>
        <Table hoverable className="my-8">
          <Table.Head>
            <Table.HeadCell>ID Number</Table.HeadCell>
            <Table.HeadCell>Room Number</Table.HeadCell>
            <Table.HeadCell>Arrival Date</Table.HeadCell>
            <Table.HeadCell>Departure Date</Table.HeadCell>
            <Table.HeadCell>Payments</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {itemsToShow.map((bookings, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{bookings.id_number}</Table.Cell>
                <Table.Cell>{bookings.room_number}</Table.Cell>
                <Table.Cell>{bookings.check_in}</Table.Cell>
                <Table.Cell>{bookings.check_out}</Table.Cell>
                <Table.Cell>
                  <span
                    className={classNames(
                      `${
                        bookings.payment === "Paid"
                          ? "bg-green-300 mx-2"
                          : "bg-orange-400"
                      }`,
                      "p-2 text-white rounded-lg font-light"
                    )}
                  >
                    {bookings.payment}
                  </span>
                </Table.Cell>
                <Table.Cell>{bookings.status}</Table.Cell>
                <Table.Cell>
                  <div className="flex flex-1 items-center gap-2">
                    <Link to={`edit/${bookings.id}`}>
                      <div className="text-yellow-500">
                        <MdEdit fontSize={20} />
                      </div>
                    </Link>
                    <Link to={`${bookings.id}`}>
                      <div className="text-purple-500">
                        <MdRemoveRedEye fontSize={20} />
                      </div>
                    </Link>
                    <div
                      className="text-red-500 hover:cursor-pointer"
                      onClick={() => handleDelete(bookings.id)}
                    >
                      <MdDeleteForever fontSize={20} />
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="flex justify-center my-8">
          <button
            className="p-2 text-white bg-gray-700 border rounded-md cursor-pointer "
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Previous
          </button>
          <span className="mx-4">
            Page {currentPage} of {Math.ceil(bookings.length / itemsPerPage)}
          </span>
          <button
            className="p-2 text-white bg-gray-700 border rounded-md cursor-pointer "
            disabled={currentPage === Math.ceil(bookings.length / itemsPerPage)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
