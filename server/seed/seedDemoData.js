import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";

dotenv.config();

const randomBetween = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const maskAccount = (num) => {
  // example: 123456789012 -> ********9012
  const last4 = num.toString().slice(-4);
  return "********" + last4;
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // clean old demo data
    await Transaction.deleteMany({});
    await Account.deleteMany({});
    await User.deleteMany({ email: /demo.user/ });

    const passwordHash = await bcrypt.hash("Demo@123", 10);

    const users = [];
    for (let i = 1; i <= 10; i++) {
      users.push({
        name: `Demo User ${i}`,
        email: `demo.user${i}@mail.com`,
        password: passwordHash,
        role: "customer",
      });
    }

    const createdUsers = await User.insertMany(users);

    for (const u of createdUsers) {
      // create account
      const rawAcc = 100000000000 + randomBetween(1000, 9999); // fake
      let balance = randomBetween(5000, 250000);

      const account = await Account.create({
        userId: u._id,
        accountNoMasked: maskAccount(rawAcc),
        accountType: "SAVINGS",
        balance
      });

      // create 15 transactions
      for (let t = 1; t <= 15; t++) {
        const isDebit = Math.random() < 0.55;
        const amount = randomBetween(100, 15000);

        if (isDebit && balance - amount > 0) {
          balance -= amount;
          await Transaction.create({
            userId: u._id,
            amount,
            type: "DEBIT",
            description: ["Grocery", "Fuel", "UPI Transfer", "Shopping", "Bill Payment"][randomBetween(0, 4)],
            date: new Date(Date.now() - t * 86400000),
            balanceAfter: balance
          });
        } else {
          balance += amount;
          await Transaction.create({
            userId: u._id,
            amount,
            type: "CREDIT",
            description: ["Salary", "Cashback", "Refund", "Interest", "NEFT Credit"][randomBetween(0, 4)],
            date: new Date(Date.now() - t * 86400000),
            balanceAfter: balance
          });
        }
      }

      // update final account balance
      await Account.updateOne({ _id: account._id }, { balance });
    }

    console.log("✅ Seed complete: 10 demo users created");
    console.log("Login password for all demo users: Demo@123");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seed error:", err.message);
    process.exit(1);
  }
}

seed();
