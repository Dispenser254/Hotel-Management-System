import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdAdd, MdDeleteForever, MdEdit, MdRemoveRedEye } from "react-icons/md";

export const Customers = () => {
  const itemsPerPage = 10;
  const [customers, setCustomers] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/customer/");
      const data = await response.json();
      setCustomers(data.customer);
      setCustomerCount(data.customer_count);
      console.log(data);
    } catch (error) {
      console.log("Error occurred while fetching the data", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const itemsToShow = customers.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDelete = async (params) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/customer/${params}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        console.log("Successfully deleted customers data");
        fetchCustomers();
      } else {
        console.log("Failed to delete customers", response.status);
      }
    } catch (error) {
      console.log("An error occurred while deleting customers", error);
    }
  };
  return (
    <div className="flex flex-col px-4 py-2 overscroll-auto">
      <div className="scroll-container overflow-auto h-screen pb-8">
        <div className="flex">
          <div className="flex-1 pl-4 border-b border-slate-400 pb-5 my-5">
            <h2 className="text-2xl font-bold ">Customer List</h2>
            <p>You have {customerCount} customers.</p>
          </div>
          <Link to="addCustomers/">
            <div className="mr-8 mt-5 flex items-center flex-col hover:bg-slate-400 p-4 rounded-lg bg-gray-300">
              <span className="text-sm p-2">Add Customers</span>
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
            <Table.HeadCell>First Name</Table.HeadCell>
            <Table.HeadCell>Last Name</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Phone Number</Table.HeadCell>
            <Table.HeadCell>Address</Table.HeadCell>
            <Table.HeadCell>Actions</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {itemsToShow.map((customers, index) => (
              <Table.Row
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <Table.Cell>{customers.id_number}</Table.Cell>
                <Table.Cell>{customers.first_name}</Table.Cell>
                <Table.Cell>{customers.last_name}</Table.Cell>
                <Table.Cell>{customers.gender}</Table.Cell>
                <Table.Cell>{customers.email}</Table.Cell>
                <Table.Cell>{customers.phone_number}</Table.Cell>
                <Table.Cell>{customers.address}</Table.Cell>

                <Table.Cell>
                  <div className="flex flex-1 items-center gap-2">
                    <Link to={`edit/${customers.id}`}>
                      <div className="text-yellow-500">
                        <MdEdit fontSize={20} />
                      </div>
                    </Link>
                    <Link to={`${customers.id}`}>
                      <div className="text-purple-500">
                        <MdRemoveRedEye fontSize={20} />
                      </div>
                    </Link>
                    <td
                      className="text-red-500 hover:cursor-pointer"
                      onClick={() => handleDelete(customers.id)}
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
            Page {currentPage} of {Math.ceil(customers.length / itemsPerPage)}
          </span>
          <button
            className="p-2 text-white bg-gray-700 border rounded-md cursor-pointer "
            disabled={
              currentPage === Math.ceil(customers.length / itemsPerPage)
            }
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};
