import { Menu, Popover, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment } from "react";
import {
  HiOutlineBell,
  HiOutlineSearch,
} from "react-icons/hi";
import { Avatar } from "flowbite-react";
import { useNavigate } from "react-router";

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="bg-white h-14 px-4 flex justify-between items-center border-b border-gray-400 rounded-md">
      <div className="relative">
        <HiOutlineSearch className="absolute text-gray-400 top-1/2 -translate-y-1/2 left-3" />
        <input
          type="text"
          className="text-sm focus:outline-none border border-gray-300 rounded-lg h-7 w-[24rem] px-4 pl-11"
          placeholder="Search..."
        />
      </div>
      <div className="flex items-center gap-2 mr-2">
        
        <Popover className="relative">
          {({ open }) => (
            <>
              <Popover.Button
                className={classNames(
                  open && "bg-gray-200",
                  "inline-flex items-center text-gray-700 text-opacity-100 outline-none p-1.5 rounded-lg"
                )}
              >
                <HiOutlineBell fontSize={24} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute w-80 right-2 mt-3">
                  <div className="shadow-md bg-white rounded-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                    <strong className="text-gray-700 font-medium px-4">
                      Notifications
                    </strong>
                    <div className="mt-2 px-1 pt-2 text-sm border-t border-gray-300">
                      This is a notification panel
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="inline-flex ml-2">
            <span className="sr-only">Open user menu</span>
            <Avatar rounded />
          </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute origin-top-right right-2 mt-2 w-40 shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-lg">
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/profile")}
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-md px-4 py-2"
                    )}
                  >
                    Your Profile
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/settings")}
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-md px-4 py-2"
                    )}
                  >
                    Settings
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div
                    onClick={() => navigate("/profile")}
                    className={classNames(
                      active && "bg-gray-100",
                      "text-gray-700 focus:bg-gray-200 cursor-pointer rounded-md px-4 py-2"
                    )}
                  >
                    Logout
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
