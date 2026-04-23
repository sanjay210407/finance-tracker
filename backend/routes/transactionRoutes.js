const express = require("express");
const mongoose = require("mongoose");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

const getUserObjectId = (userId) => new mongoose.Types.ObjectId(userId);
const pickTransactionFields = ({ type, amount, category, date }) => ({
  ...(type !== undefined && { type }),
  ...(amount !== undefined && { amount }),
  ...(category !== undefined && { category }),
  ...(date !== undefined && { date }),
});

// Add transaction
router.post("/", auth, async (req, res) => {
  try {
    const transaction = await Transaction.create({
      ...req.body,
      user: req.user,
    });

    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all transactions
router.get("/", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ IMPORTANT: place /stats BEFORE /:id
router.get("/stats", auth, async (req, res) => {
  try {
    const userId = getUserObjectId(req.user);
    const stats = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete transaction (secure)
router.delete("/:id", auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!transaction) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/monthly", auth, async (req, res) => {
  try {
    const userId = getUserObjectId(req.user);
    const data = await Transaction.aggregate([
      {
        $match: { user: userId },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const updated = await Transaction.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user,
      },
      pickTransactionFields(req.body),
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Transaction not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
