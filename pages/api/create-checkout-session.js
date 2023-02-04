const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOST}/Checkout`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/`,
    metadata: {
      email: email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
  });
  res.status(200).json({ id: session.id });
};
