import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { MdAdd, MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";

export const Rooms = () => {
  const itemsPerPage = 10;
  const [rooms, setRooms] = useState([]);
  const [roomsCount, setRoomsCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/rooms/");
      const data = await response.json();
      setRooms(data.rooms);
      setRoomsCount(data.rooms_count);
      console.log(data);
    } catch (error) {
      console.log("Error occurred while fetching the data", error);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = rooms.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (params) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/rooms/${params}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Successfully deleted data");
        fetchRooms()
      } else {
        console.log("Failed to delete rooms", response.status);
      }
    } catch (error) {
      console.log("An error occurred while deleting rooms", error);
    }
  };
  return (
    <div className="flex flex-col px-4 py-2 overscroll-auto">
      <div className="scroll-container overflow-auto h-screen pb-8">
        <div className="flex">
          <div className="flex-1 pl-4 border-b border-slate-400 pb-5 my-5">
            <h2 className="text-2xl font-bold ">Rooms List</h2>
            <p>You have {roomsCount} rooms.</p>
          </div>
          <Link to="addRooms/">
            <div className="mr-8 mt-5 flex items-center flex-col hover:bg-slate-400 p-4 rounded-lg bg-gray-300">
              <span className="text-sm p-2">Add Rooms</span>
              <MdAdd
                className="text-white bg-sky-500 rounded-full flex justify-center"
                fontSize={30}
              />
            </div>
          </Link>
        </div>
        <Table hoverable className="my-8">
          <Table.Head>
            <Table.HeadCell>Room Number</Table.HeadCell>
            <Table.HeadCell>Room Type</Table.HeadCell>
            <Table.HeadCell>Bed Capacity</Table.HeadCell>
            <Table.HeadCell>Air Condition</Table.HeadCell>
            <Table.HeadCell>Rent</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {itemsToShow.map((rooms, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{rooms.room_number}</Table.Cell>
                <Table.Cell>{rooms.room_type}</Table.Cell>
                <Table.Cell>{rooms.bed_capacity}</Table.Cell>
                <Table.Cell>{rooms.air_condition}</Table.Cell>
                <Table.Cell>{rooms.rent}</Table.Cell>
                <Table.Cell>
                  <span
                    className={classNames(
                      `${
                        rooms.status === "Booked"
                          ? "bg-green-300 mx-2"
                          : "bg-orange-400"
                      }`,
                      "p-2 text-white rounded-lg font-light"
                    )}
                  >
                    {rooms.status}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <div className="flex flex-1 items-center gap-2">
                    <Link to={`edit/${rooms.id}`}>
                      <div className="text-yellow-500">
                        <MdEdit fontSize={20} />
                      </div>
                    </Link>
                    <Link to={`${rooms.id}`}>
                      <div className="text-purple-500">
                        <MdRemoveRedEye fontSize={20} />
                      </div>
                    </Link>
                    <td
                      className="text-red-500 hover:cursor-pointer"
                      onClick={() => handleDelete(rooms.id)}
                    >
                      <MdDeleteForever fontSize={20} />
                    </td>
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
            Page {currentPage} of {Math.ceil(rooms.length / itemsPerPage)}
          </span>
          <button
            className="p-2 text-white bg-gray-700 border rounded-md cursor-pointer "
            disabled={currentPage === Math.ceil(rooms.length / itemsPerPage)}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
