// // jo token huamara genrate hhua hai use find karega  like user ka email and password //
// import jwt from "jsonwebtoken";
// const isAuth = async (req, res, next) => {
//     try {
//         console.log("Cookies:", req.cookies);

//         const token = req.cookies.token
//         if (!token) {
//             return res.status(400).json({message:"Token not found !"})
//         }
//         const verifyToken = await jwt.verify(token, process.env.JWT_SECRET) //yha pe token verify hoyega

//         req.userId = verifyToken.userId
//         next()
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({message:"is Auth Error"})
//     }
// };

// export default isAuth;

import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "token not found" });
    }
    const verifyToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verifyToken.userId;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "is Auth error" });
  }
};

export default isAuth;