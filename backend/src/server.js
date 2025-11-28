import express from "express";
import { sql } from "./config/database.js";
import ratelimiter from "./middleware/rate_limiter.js";

import routes from "./routes/routes.js";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

const app = express();


// middleware
// app.use() for using middleware functions
// syntax 
// app.use((req, res, next) => {
//   console.log(`Request received at: ${Date.now()}`);
//   next(); // MUST call next() to proceed
// });
// we can specify a path as the first argument. The middleware will only execute for requests whose path starts with that prefix.

// JavaScript

// // This middleware only runs for requests starting with '/admin'
// app.use('/admin', (req, res, next) => {
//   console.log('Admin route access attempt.');
//   // Add authentication logic here
//   next();
// });
app.use(cors());

app.use(express.json());
app.use(ratelimiter);
app.use("/api/expenses", routes);


const PORT = process.env.PORT || 3000;

async function init_db() {
  try {
    await sql`CREATE TABLE IF NOT EXISTS expenses(
 txn_id SERIAL PRIMARY KEY,
 user_id VARCHAR(255) NOT NULL,
 title VARCHAR(255) NOT NULL,
 amount DECIMAL(10,2) NOT NULL,
 category VARCHAR(255) NOT NULL,
 created_at DATE NOT NULL DEFAULT CURRENT_DATE
)`;
  } catch (err) {
    console.log("Database connection failed", err);
    process.exit(1);
  }
}

init_db().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
  });
});

