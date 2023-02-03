import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      let p = await Products.findByIdAndUpdate(req.body[i]._id, req.body[i]);
    }
    res.status(200).json({ message: "success" });
  } else {
    res.status(400).json({ error: "this method is not allowed" });
  }

  let products = await Products.find();
  res.status(200).json({ products });
};

export default connectDB(handler);
