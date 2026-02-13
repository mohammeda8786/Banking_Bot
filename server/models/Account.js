import mongoose from "mongoose";

const accountSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    accountNoMasked: { type: String, required: true }, // store masked only for safety
    accountType: { type: String, enum: ["SAVINGS", "CURRENT"], default: "SAVINGS" },
    balance: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default mongoose.model("Account", accountSchema);
