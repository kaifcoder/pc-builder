import Link from "next/link";
import Router from "next/router";
import React, { useEffect } from "react";

const Forgot = () => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className=" justify-center px-5 py-20 flex  items-center">
        <div className="w-auto  bg-gray-100 p-10 rounded-md">
          <h2 className="text-gray-900 text-center text-lg font-medium title-font mb-5">
            Forgot Password
          </h2>

          <p className="text-gray-900 text-center text-sm font-medium title-font mb-5">
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </p>

          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button className="text-white bg-gray-500 border-0 py-2 px-8 focus:outline-none hover:bg-gray-600 rounded text-lg">
            Continue
          </button>
          <Link href={"/Login"} className="text-gray-500 mx-3 items-center">
            Back to Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Forgot;
