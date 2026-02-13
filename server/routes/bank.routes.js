import express from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { rateLimit } from "../middleware/rateLimit.middleware.js";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";
import { auditLog } from "../utils/audit.js";

const router = express.Router();

// GET /api/bank/balance
router.get("/balance", requireAuth, rateLimit({ max: 40 }), async (req, res) => {
  const acc = await Account.findOne({ userId: req.user.id });
  if (!acc) return res.status(404).json({ error: "Account not found" });

  auditLog("BALANCE_VIEW", { userId: req.user.id });
  res.json({
    accountType: acc.accountType,
    accountNoMasked: acc.accountNoMasked,
    balance: acc.balance,
  });
});

// GET /api/bank/transactions?limit=5
router.get("/transactions", requireAuth, rateLimit({ max: 40 }), async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit || "5", 10), 20);
  const txns = await Transaction.find({ userId: req.user.id })
    .sort({ date: -1 })
    .limit(limit)
    .select("-__v");

  auditLog("TXN_VIEW", { userId: req.user.id, limit });
  res.json({ transactions: txns });
});

export default router;
