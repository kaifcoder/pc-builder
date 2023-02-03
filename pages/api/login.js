import connectDB from "@/middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const handler = async (req, res) => {
  if (req.method === "POST") {
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      if (
        req.body.email == user.email &&
        req.body.password ==
          CryptoJS.AES.decrypt(user.password, process.env.JWT_SECRET).toString(
            CryptoJS.enc.Utf8
          )
      ) {
        const token = jwt.sign(
          { success: true, email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: "2d" }
        );
        res.status(200).json({
          message: "success",
          token: token,
          name: user.name,
          email: user.email,
        });
      } else {
        res.status(200).json({ message: "Invalid Credential" });
      }
    } else {
      res.status(200).json({ message: "failed" });
    }
  } else {
    res.status(400).json({ error: "this method is not allowed" });
  }
};

export default connectDB(handler);
