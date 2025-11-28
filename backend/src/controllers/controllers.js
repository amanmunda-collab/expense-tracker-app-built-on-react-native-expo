 
 import { sql } from "../config/database.js";


 export async function getTransactionsByUserId(req,res){
      try {
        const { userId } = req.params;
        const transactions =
          await sql`SELECT * FROM expenses WHERE user_id = ${userId} ORDER BY created_at DESC`;
        res.status(200).json(transactions);
        console.log("Expenses fetched successfully", transactions);
      } catch (err) {
        console.log("Error fetching expenses", err);
        res.status(500).json({ error: "Internal server error" });
      }
    
}
export async function getTransactionsSummary(req,res){
 
  try {
    const { userId } = req.params;

    const balanceResult = await sql` 
        SELECT COALESCE(SUM(amount),0) as balance FROM expenses WHERE user_id = ${userId} 
        `;
    const incomeResult = await sql`
        SELECT COALESCE(SUM(amount),0) as income FROM expenses WHERE user_id = ${userId} AND amount > 0
        `;
    const expenseResult = await sql`
        SELECT COALESCE(SUM(amount),0) as expense FROM expenses WHERE user_id = ${userId} AND amount < 0
        `;
        const responseData = {
      balance: balanceResult[0].balance,
      income: incomeResult[0].income,
      expense: expenseResult[0].expense,
    }
    res.status(200).json(responseData);
   console.log("Expense summary fetched successfully",responseData);
  } catch (err) {
    console.log("Error fetching expense summary", err);
    res.status(500).json({ error: "Internal server error" });
  }

}
export async function createTransaction(req,res){
 
  try {
    const { user_id, title, amount, category } = req.body;
    if (!user_id || !title || !amount || !category) {
      return res.status(400).json({
        message: "all fields are required",
      });
    }
    const transactions =
      await sql` INSERT INTO  expenses(user_id,title,amount,category) 
   VALUES(${user_id},${title},${amount},${category})
   RETURNING * `;
    console.log("Expense created successfully", transactions);
    res.status(201).json(transactions[0]);
  } catch (err) {
    console.log("Error creating expense", err);
    res.status(500).json({ error: "Internal server error" });
  }
 
}
export async function deleteTransaction(req,res){
 
  try {
    const { txnId } = req.params;
    if (isNaN(parseInt(txnId))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
      console.log("Invalid transaction ID");
    }
    const result =
      await sql`DELETE FROM expenses WHERE txn_id = ${txnId} RETURNING * `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.log("Error deleting expenses", err);
    res.status(500).json({ error: "Internal server error" });
  }
  
}