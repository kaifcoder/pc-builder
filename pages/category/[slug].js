import Products from "@/models/Products";
import mongoose from "mongoose";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const category = ({ products }) => {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          {products.length === 0 && (
            <div className="flex flex-col items-center justify-center h-[50vh]">
              <h2 className="font-medium text-gray-900">
                Sorry, currently we don&apos;t have Stocks available for this
                category.
              </h2>
            </div>
          )}
          <div className="flex flex-wrap -m-4">
            {products.map((item) => {
              return (
                <Link
                  key={item._id}
                  href={`/product/${item.slug}`}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full"
                >
                  <div className="block relative rounded overflow-hidden">
                    <Image
                      height={200}
                      width={200}
                      alt="ecommerce"
                      className="object-center w-full h-full block"
                      src={item.image}
                    />
                  </div>
                  <div className="mt-4">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                      {item.category}
                    </h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">
                      {item.title}
                    </h2>
                    <p className="mt-1">₹{item.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  const products = await Products.find({
    category: context.query.slug,
  });
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}

export default category;
