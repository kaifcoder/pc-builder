import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxAvatar } from "react-icons/rx";

const Navbar = ({ logout, user, cart, open }) => {
  const [dropDown, setDropDown] = useState(false);
  return (
    <div className="container sticky top-0 bg-white z-10 shadow-lg mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center">
      <Link
        href={"/"}
        className="flex title-font font-medium items-center text-gray mb-4 md:mb-0"
      >
        <Image
          height={40}
          src="/logo.png"
          alt="logo"
          width={40}
          className="scale-150"
        />
        <span className="ml-3 text-xl">PC BUILDER.</span>
      </Link>
      <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
        <Link href="/" className="mr-5 hover:text-gray-900">
          Home
        </Link>
        <Link href="/category/Processor" className="mr-5 hover:text-gray-900">
          Processors
        </Link>
        <Link href="/category/Motherboard" className="mr-5 hover:text-gray-900">
          Motherboard
        </Link>
        <Link
          href={"/category/Graphics Card"}
          className="mr-5 hover:text-gray-900"
        >
          Graphics Card
        </Link>
        <Link href={"/category/RAM"} className="mr-5 hover:text-gray-900">
          RAM
        </Link>
        <Link href={"/category/Monitors"} className="mr-5 hover:text-gray-900">
          Monitors
        </Link>
        <Link
          href={"/category/Peripherals"}
          className="mr-5 hover:text-gray-900"
        >
          Peripherals
        </Link>
        <Link href={"/category/Storage"} className="mr-5 hover:text-gray-900">
          Storage
        </Link>
        <Link
          href={"/category/Power Supply units"}
          className="mr-5 hover:text-gray-900"
        >
          Power Supply units
        </Link>
        <div className="flex justify-center items-center space-x-3 cursor-pointer  hover:text-gray-900">
          {user.value && (
            <RxAvatar
              onMouseOver={() => setDropDown(true)}
              onMouseLeave={() => setDropDown(false)}
              className="text-3xl"
            />
          )}
          <div
            className="relative flex items-center justify-center"
            onClick={open}
          >
            <AiOutlineShoppingCart className="text-3xl" />
            {Object.keys(cart).length > 0 && (
              <span
                className="
             absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full w-4 h-4 flex items-center justify-center
            "
              >
                {Object.keys(cart).length}
              </span>
            )}
          </div>

          {!user.value && (
            <Link href={"/Login"}>
              <button className="bg-gray-500 hover:bg-gray-900 text-white font-bold p-2 rounded">
                Login
              </button>
            </Link>
          )}
        </div>
        {dropDown && (
          <div
            onMouseOver={() => setDropDown(true)}
            onMouseLeave={() => setDropDown(false)}
            className="absolute lg:top-10  lg:right-4 md:top-28 md:right-64 rounded-md bg-gray-100 z-10 shadow-md top-36 right-12"
          >
            <ul className="font-semibold rounded-md text-gray-900 cursor-pointer">
              <li className="p-2 font-bold border-b border-black">
                Hello, {user.name}
              </li>
              <Link href={"/MyOrders"}>
                <li className="p-2 hover:text-blue-500 border-b border-black">
                  My Orders
                </li>
              </Link>
              <Link href={"/Profile"}>
                <li className="p-2 hover:text-blue-500 border-b border-black">
                  Profile
                </li>
              </Link>
              <li onClick={logout} className="p-2 hover:text-red-600 ">
                Logout
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
