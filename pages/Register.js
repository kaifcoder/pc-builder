import { TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields", {
        position: "top-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", {
        position: "top-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        toast.success("Account created successfully", {
          position: "top-left",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        return;
      }
      toast.error("Something went wrong! Please try again later", {
        position: "top-left",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      // toast.success("Account created successfully");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setName("");
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-left",
      });
    }
  };

  return (
    <div>
      <section className="bg-gray-50 py-5">
        <div className="flex flex-col items-center justify-center p-10 mx-auto h-full lg:py-0">
          <Link
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <Image
              height={50}
              width={50}
              className="w-12 h-12 mr-2 rounded-full"
              src="/logo.png"
              alt="logo"
            />
            PC Builder
          </Link>
          <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md">
            <div className="p-6 space-y-2 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Create an account
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div>
                  <TextField
                    fullWidth
                    variant="outlined"
                    type="name"
                    name="name"
                    label="Name"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    id="name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div>
                  <TextField
                    type="email"
                    name="email"
                    label="Email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="email"
                    placeholder="name@company.com"
                    required
                    fullWidth
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    fullWidth
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    name="confirm-password"
                    label="Confirm Password"
                    fullWidth
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                    }}
                    id="confirm-password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full text-white bg-gray-500 hover:bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Create an account
                </button>
                <p className="text-sm font-light text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/Login"
                    className="font-medium text-gray-700 hover:underline"
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Register;
