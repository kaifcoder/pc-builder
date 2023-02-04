import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";
import Cart from "./cart";
var jwt = require("jsonwebtoken");

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [cart, setCart] = useState({});
  const [total, setTotal] = useState(0);
  const [progress, setProgress] = useState(0);
  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setUser({ value: null });
    setKey(Math.random());
    toast.success("Logged out successfully", {
      position: "top-left",
    });
    router.push("/");
  };

  useEffect(() => {
    try {
      let cart = localStorage.getItem("cart");

      if (cart) {
        setCart(JSON.parse(cart));
        saveCart(JSON.parse(cart));
      }
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }
    let token = localStorage.getItem("token");
    let data = jwt.decode(token);
    console.log(data);
    if (token) {
      setUser({ value: token, name: data.name, email: data.email });
      setKey(Math.random());
    }
  }, [router.query]);

  useEffect(() => {
    router.events.on("routeChangeStart", () => setProgress(40));
    router.events.on("routeChangeComplete", () => setProgress(100));
    router.events.on("routeChangeError", () => setProgress(100));
  }, [router.events]);

  const saveCart = (newCart) => {
    localStorage.setItem("cart", JSON.stringify(newCart));
    let total = 0;
    Object.keys(newCart).map((item) => {
      total += newCart[item].qty * newCart[item].price;
    });
    setTotal(total);
  };
  const clearCart = () => {
    toast.error("Cart cleared", {
      position: "top-left",
    });
    setCart({});
    setTotal(0);
    saveCart({});
  };
  const addToCart = (itemcode, qty, price, name, desc, image, brand, slug) => {
    toast.success("Item added to cart", {
      position: "top-left",
    });
    let newCart = cart;
    if (newCart[itemcode]) {
      newCart[itemcode].qty += qty;
    } else {
      newCart[itemcode] = {
        qty: 1,
        price: price,
        name: name,
        desc: desc,
        image: image,
        brand: brand,
        slug: slug,
      };
    }
    setCart(newCart);
    saveCart(newCart);
  };
  const removeFromCart = (itemcode, qty) => {
    toast.error("Item removed from cart", {
      position: "top-left",
    });
    let newCart = cart;
    if (newCart[itemcode]) {
      newCart[itemcode].qty -= qty;
      if (newCart[itemcode].qty <= 0) {
        delete newCart[itemcode];
      }
    }
    setCart(newCart);
    saveCart(newCart);
  };

  const buyNow = (itemcode, qty, price, name, desc, image, brand, slug) => {
    saveCart({});
    let newCart = {};
    if (newCart[itemcode]) {
      newCart[itemcode].qty += qty;
    } else {
      newCart[itemcode] = {
        qty: 1,
        price: price,
        name: name,
        desc: desc,
        image: image,
        brand: brand,
        slug: slug,
      };
    }
    setCart(newCart);
    saveCart(newCart);
    openCart();
  };

  const openCart = () => {
    setCartOpen(!cartOpen);
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        height={2}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
      <Cart
        openState={cartOpen}
        openCart={openCart}
        cart={cart}
        total={total}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        addToCart={addToCart}
        user={user}
      />
      <Navbar
        logout={logout}
        user={user}
        open={openCart}
        key={key}
        cart={cart}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        total={total}
      />
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Component
        cart={cart}
        open={openCart}
        addToCart={addToCart}
        buyNow={buyNow}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        total={total}
        user={user}
        {...pageProps}
      />
      <Footer />
    </>
  );
}
