import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler = async (req, res) => {
  let products = await Products.find();
  res.status(200).json({ products });
};

export default connectDB(handler);
