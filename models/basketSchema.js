const mongoose = require("mongoose");

const basketSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    availableQty: { type: Number, required: true },
    brand: { type: String, required: true },
  },
  { timestamps: true }
);
