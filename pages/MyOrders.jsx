import Order from "@/models/Order";

import mongoose from "mongoose";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect } from "react";

const MyOrders = () => {
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  return (
    <div>
      <h1 className="my-10 text-center font-extrabold text-2xl">My Orders</h1>
      <div className="overflow-x-auto shadow-sm rounded-sm sm:rounded-lg">
        <table className="w-full table-auto text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
              >
                Apple MacBook Pro 17&quot;
              </th>
              <td className="px-6 py-4 text-orange-400">Pending</td>
              <td className="px-6 py-4">Laptop</td>
              <td className="px-6 py-4">$2999</td>
              <td className="px-6 py-4">
                <Link
                  href="/order/5f9f1b5b0b5b9c2b1c8b0b5a"
                  className="font-medium text-blue-600 hover:underline"
                >
                  View Details
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const products = await Order.find({});
  return {
    props: { orders: JSON.parse(JSON.stringify(products)) },
  };
}

export default MyOrders;
