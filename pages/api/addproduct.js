import Products from "@/models/Products";
import connectDB from "@/middleware/mongoose";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    for (let i = 0; i < req.body.length; i++) {
      let p = new Products({
        title: req.body[i].title,
        slug: req.body[i].slug,
        price: req.body[i].price,
        desc: req.body[i].desc,
        image: req.body[i].image,
        category: req.body[i].category,
        availableQty: req.body[i].availableQty,
        brand: req.body[i].brand,
      });
      await p.save();
    }
    res.status(200).json({ message: "success" });
  } else {
    res.status(400).json({ error: "this method is not allowed" });
  }
};

export default connectDB(handler);
