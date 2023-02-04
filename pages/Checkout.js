import Image from "next/image";
import React from "react";

const Checkout = ({ cart, total }) => {
  return (
    <section className="pt-12 pb-24 bg-gray-100 overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="pb-9 mb-7 text-center border-b border-black border-opacity-5">
          <h2 className="text-5xl xl:text-5xl leading-normal font-medium text-center">
            Your Order has been placed
          </h2>
        </div>
      </div>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {Object.keys(cart).map((product) => (
            <div
              key={product}
              className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start"
            >
              <Image
                alt={cart[product].name}
                width={300}
                height={300}
                src={cart[product].image}
                className="w-full rounded-lg object-contain sm:w-40"
              />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {cart[product].name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">
                    {cart[product].desc}
                  </p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span className="rounded-l py-1 pl-4 font-semibold">
                      Quantity
                    </span>
                    <span className="rounded-l pl-2 text-sm font-semibold outline-none">
                      {cart[product].qty}
                    </span>
                  </div>
                  <div className="flex items-center font-semibold space-x-4">
                    <p className="text-sm">₹{cart[product].price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">₹{total}</p>
          </div>
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">Free</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">₹{total} INR</p>
              <p className="text-sm text-gray-700">including TAX</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
