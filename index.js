// import express from "express"  // yha humne express ko import kr diya
// import dotenv from "dotenv"
// dotenv.config() // dotenv ke under ke config naam ka function hota hai jisse hume aise call krna hota hai

// import connectDb from "./config/db.js"
// import authRouter from "./routes/auth.routes.js"
// import cookieParser from "cookie-parser"
// import cors from "cors"
// import userRouter from "./routes/user.routes.js"
// import geminiResponse from "./gemini.js"

// const app = express() // yh humne chota sa server bna diya and express ko cll  kr diy hai mtlb express ke under jitne bhi method hai jitne bh function hai hum usko app ki through use kr skte hai

// app.use(cors({
//     origin: "http://localhost:5173",
        
   
//     credentials:true
// }))


// const port = process.env.PORT || 5000
// app.use(express.json()) // koi bhi hum data leke aynge to hume usse json ke form main convert krna padega th hum middleware use karnge app.use(express.json())iski help se body ke under undefined nhi ayega

// app.use(cookieParser())
// app.use("/api/auth", authRouter)
// app.use("/api/user", userRouter);

// // app.get("/", async (req, res) => {
// //     let prompt = req.query.prompt
// //     let data = await geminiResponse(prompt)
// //     res.json(data)
    
// // })

// app.listen(port, () => {
//     connectDb()
//     // yha pe humne isse isliye cll karwaya h q ki jaise he humara server listen karega waise he humara database connect ho gya hai uska bh message aa jayega  server is stated ke badd q ki console pe likhi hui cheez phle run hoti hai that's why
    
//     console.log("Sever is Started")
// })


import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import geminiResponse from "./gemini.js";

const app = express();
app.use(
  cors({
    origin: "https://frntvirtualai.netlify.app/",  //ok
    credentials: true,
  }),
);
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDb();
  console.log("server started");
});

