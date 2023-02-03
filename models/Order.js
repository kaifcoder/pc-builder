const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        quantity: { type: Number, default: 1 },
      },
    ],
    address: { type: String, required: true },
    status: { type: String, default: "Pending" },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

// export default mongoose.models("Order", orderSchema);
export default mongoose.models.Order || mongoose.model("Order", orderSchema);
