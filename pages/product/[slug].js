import Products from "@/models/Products";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import React from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Post = ({ addToCart, products, buyNow }) => {
  const router = useRouter();
  const [pincode, setPincode] = React.useState("");
  const [service, setService] = React.useState();
  const { slug } = router.query;
  const checkpincode = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinjson = await pins.json();
    if (pinjson.includes(parseInt(pincode))) {
      setService(true);
      toast.success("Service available in your area", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      setService(false);
      toast.error("Sorry, Service not available in your area", {
        position: "top-right",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const onChangePin = (e) => {
    setPincode(e.target.value);
  };

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-10 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <Image
              height={200}
              width={200}
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto object-contain rounded"
              src={products.image}
            />
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {products.brand}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {products.title}
              </h1>

              <p className="leading-relaxed mb-4">{products.desc}</p>

              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ₹{products.price}
                </span>
                <button
                  onClick={() =>
                    addToCart(
                      slug,
                      1,
                      products.price,
                      products.title,
                      products.desc,
                      products.image,
                      products.brand,
                      products.slug
                    )
                  }
                  // onClick={addItemToBasket}
                  className="flex ml-auto text-white bg-blue-500 border-0 p-2 focus:outline-none hover:bg-blue-600 rounded"
                >
                  Add to cart
                </button>
                <button
                  onClick={() =>
                    buyNow(
                      slug,
                      1,
                      products.price,
                      products.title,
                      products.desc,
                      products.image,
                      products.brand,
                      products.slug
                    )
                  }
                  className="p-2 border-1 rounded inline-flex items-center justify-center text-white bg-black ml-4"
                >
                  Buy Now
                </button>
              </div>
              <div className="mt-6 flex space-x-2">
                <input
                  type="number"
                  className="px-2 border-2 rounded-lg border-gray-400"
                  maxLength={6}
                  placeholder="Enter pincode"
                  onChange={onChangePin}
                  id="pincode"
                />
                <button
                  onClick={checkpincode}
                  className="flex items-center ml-auto text-white bg-gray-500 border-0 p-2 focus:outline-none hover:bg-gray-600 rounded"
                >
                  check pincode
                </button>
              </div>
              <div>
                {!service && service != null && (
                  <div className="mt-6 flex space-x-2">
                    <p className="text-red-500">
                      Service not available in this pincode
                    </p>
                  </div>
                )}
                {service && service != null && (
                  <div className="mt-6 flex space-x-2">
                    <p className="text-green-500">
                      Service available in this pincode
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const products = await Products.findOne({
    slug: context.query.slug,
  });
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default Post;
