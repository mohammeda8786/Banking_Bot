import mongoose from "mongoose";

const txnSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ["DEBIT", "CREDIT"], required: true },
    description: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    balanceAfter: { type: Number, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("Transaction", txnSchema);
