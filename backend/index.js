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
const corsOptions = {
    origin: 'https://breadandbetter.vercel.app', // Frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],   // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
    credentials: true,  // Allow credentials (if needed)
  };
// Middleware
app.use(cors(corsOptions
));
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
