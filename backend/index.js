// if(process.env.NODE_ENV != "production"){
//     require('dotenv').config();
//   }

import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

// const dbUrl = "mongodb://127.0.0.1:27017/otpVari1";
const dbUrl = process.env.ATLASDB_URL;

main()
.then(()=>{
    console.log("connected to database");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(dbUrl);
}

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
