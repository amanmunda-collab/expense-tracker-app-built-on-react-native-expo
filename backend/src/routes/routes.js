import express from "express";
import { sql } from "../config/database.js";
import { createTransaction, deleteTransaction, getTransactionsByUserId, getTransactionsSummary } from "../controllers/controllers.js";

const router = express.Router();

// get methods
router.get("/", (req, res) => {
  res.send("Website is live really ");
});

router.get("/:userId",getTransactionsByUserId);
router.get("/summary/:userId",getTransactionsSummary);
// delete methods
router.delete("/:txnId",deleteTransaction);

// post methods
router.post("/",createTransaction);

export default router;
