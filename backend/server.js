import express from "express";
import cors from "cors";
import doteenv from "dotenv";
doteenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log("Server is running on port",PORT)
});
app.get("/",(req,res) => {
    res.send("Website is live really ");

});