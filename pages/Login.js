import { ThemeProvider } from "@emotion/react";
import { createTheme, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000",
    },
    secondary: {
      main: "#fff",
    },
  },
});

const Login = () => {
  // const
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      Router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill all fields", {
        position: "top-left",
      });
      return;
    }
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await res.json();
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        toast.success("Logged in successfully", {
          position: "top-left",
        });
        setEmail("");
        setPassword("");
        Router.push("/");
        return;
      }
      toast.error("Invalid Credential", {
        position: "top-left",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-left",
      });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section className="py-10">
        <div className="px-6 h-full text-gray-800">
          <div className="flex xl:justify-center justify-center items-center flex-wrap h-full g-6">
            <Image
              height={200}
              width={200}
              src="/logo.png"
              className="w-80 bg-transparent shadow-sm"
              alt="Sample image"
            />
            <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
              <h1 className="text-3xl font-bold my-6">Login</h1>
              <form>
                <div className="mb-6">
                  <TextField
                    required
                    id="email"
                    label="email"
                    type={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    autoComplete="email"
                    variant="standard"
                  />
                </div>

                <div className="mb-6">
                  <TextField
                    required
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    variant="standard"
                  />
                </div>

                <div className="flex justify-between items-center mb-6">
                  <Link href="/Forgot" className="cursor-pointer text-gray-700">
                    Forgot password?
                  </Link>
                </div>

                <div className="text-center lg:text-left">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="inline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
                  >
                    Login
                  </button>
                  <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                    Don&apos;t have an account?
                    <Link
                      href="/Register"
                      className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    >
                      Register
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  );
};

export default Login;
