import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(process.env.stripe_public_key);

export default function Cart({
  openState,
  openCart,
  cart,
  total,
  removeFromCart,
  clearCart,
  user,
}) {
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    // Call your backend to create the Checkout Session
    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: Object.keys(cart).map((product) => ({
        price_data: {
          currency: "inr",
          unit_amount: cart[product].price * 100,
          product_data: {
            name: cart[product].name,
            description: cart[product].desc,
            images: [cart[product].image],
          },
        },
        adjustable_quantity: { enabled: true, minimum: 1, maximum: 10 },
        quantity: cart[product].qty,
      })),
      name: user.name,
      email: user.email,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });
    if (result.error) {
      alert(result.error.message);
    }
  };
  return (
    <Transition.Root show={openState || false} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={openCart}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          Shopping cart
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2"
                            onClick={clearCart}
                          >
                            <span className="sr-only">clear Cart</span>

                            <TrashIcon
                              className="h-6 w-6 mr-3 text-red-300 hover:text-red-500"
                              aria-hidden="true"
                            />
                          </button>
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500 outline-none"
                            onClick={openCart}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          {Object.keys(cart).length === 0 && (
                            <div className="flex mt-16 justify-center items-center">
                              <h2 className="text-xl text-center font-semibold">
                                Cart is empty
                              </h2>
                            </div>
                          )}
                          <ul
                            role="list"
                            className="-my-6 divide-y divide-gray-200"
                          >
                            {Object.keys(cart).map((product) => (
                              <li key={product} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <Image
                                    height={100}
                                    width={100}
                                    src={cart[product].image}
                                    className="h-full w-full object-cover object-center"
                                    alt="product image"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3 className="text-ellipsis text-sm">
                                        <Link href={cart[product].slug}>
                                          {cart[product].name}
                                        </Link>
                                      </h3>
                                      <p className="ml-4">
                                        ₹{cart[product].price}
                                      </p>
                                    </div>
                                    <p className="mt-1 text-sm text-gray-500">
                                      {cart[product].brand}
                                    </p>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {cart[product].qty}
                                    </p>

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={() =>
                                          removeFromCart(product, 1)
                                        }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>₹{total}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          disabled={
                            Object.keys(cart).length === 0 ||
                            localStorage.getItem("token") === null
                          }
                          onClick={createCheckoutSession}
                          className="flex items-center justify-center w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 disabled:bg-gray-500"
                        >
                          Checkout
                        </button>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500 mx-2"
                            onClick={openCart}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
