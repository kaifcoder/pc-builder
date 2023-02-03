import connectDB from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler = async (req, res) => {
  if (req.method === "POST") {
    console.log(req.body);
    let user = new User({
      name: req.body.name,
      email: req.body.email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.JWT_SECRET
      ).toString(),
    });
    await user.save();
    const token = jwt.sign(
      { success: true, email: user.email, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "2d",
      }
    );
    res.status(200).json({
      message: "success",
      token: token,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ error: "this method is not allowed" });
  }
};

export default connectDB(handler);
