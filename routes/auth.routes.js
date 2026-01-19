// import express from "express"
// import { Login, logOut, signUp } from "../controllers/auth.controller.js"
// const authRouter = express.Router()

// //post method isliye use kiya q ki hum frontend se data leke aa rhe hain

// authRouter.post("/signup", signUp)
// authRouter.post("/signin", Login)
// authRouter.get("/logout",logOut)

// export default authRouter

import express from "express";
// import { Login, logOut, signUp } from "../controllers/auth.controllers.js";
import { Login,logOut, signUp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/signin", Login);
authRouter.get("/logout", logOut);
export default authRouter;