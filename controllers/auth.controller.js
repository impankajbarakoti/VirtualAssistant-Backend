// // iske under hum controller likhnge apni authenticity ke liye

// import express from "express"
// import genToken from "../config/token.js";
// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs"
// export const signUp = async (req, res) => {

//     try {
//       //signup krte waqt hume user se uska name , email and password chiaye hoga signup kr liye ji ke humme req.body se  mil jayege

//         const { name, email, password } = req.body;
//         const existEmail = await User.findOne({ email })
//         //yha pe wait ka use user  model ko leke ane ke liye kiya gya ha
//         if (existEmail) {
//             return res.status(400).json({message:"Email is already exists ! Try with another Email"})
//         }

//         if (password.length<6) {
//             return res.status(400).json({ message:"Password must be atleast 6 Character !"
//               });
//         }


//         //Bcrypt ke under hash name ka function hota hai password ko saltround krne ke liye
//         const hashedPassword = await bcrypt.hash(password, 10)
        
//         //yha ab hume user create kr diya hai User model ke help se
//         const user = await User.create({
//             name,password:hashedPassword,email
//         })

//         // ab hume user ko successfully create kr diya hai ab hum ek token generate karwayenge token generate isliye hota h q  ki uss token m ek user ke signin id hoti h jo ki cookie-parser m save hoti h jike help se hum kitne din bh badd login karenge th humari id fetch ho jayege basically token ko genrate ke need hoti hai user ke sign krne per and login krne per  isliye hum ek function banyenge uss se phele  config ke under token.js  naam ke file baneynge iss file ke under hum function banyenge token ko generate krne ke liye
        
        
//         const token = await genToken(user._id)
//         //ab is token ko cookie ke under parse karnege
//         res.cookie("token" ,token, {
//             httpOnly: true,
//             maxAge: 7 * 24 * 60 * 60 * 1000,
//             samesite: "none",
//             secure:true // secure false isliye kra kyun ke abhi hum httpOnly use kr rhe hai therfore wrna https use krte th secure:true kerte
//         })


//         return res.status(201).json(user)
//     } catch (error) {
//         return res.status(500).json({message:`Sign up error ${error}`});
//     }
    
// }


// export const Login= async (req, res) => {
//   try {
//     const {email, password } = req.body;
//     const user = await User.findOne({ email });
   
//       if (!user) {
//           return res.status(400).json({ message: "Email doesn't exists ! Try with another Email" });
//       }
//         const isMatch = await bcrypt.compare(password, user.password)

//       if (!isMatch) {
//          return res.status(400).json({ message: "Incorrect Password" });
//       }
   
//        const token = await genToken(user._id);
   
//      res.cookie("token", token, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//       samesite: "none",
//       secure: true,
//     });

//     return res.status(200).json(user);
//       }
//   catch (error) {
//     return res.status(500).json({ message: `Login error ${error}` });
//   }
// };
    

// export const logOut = async (req, res) => {
//     try {
//         res.clearCookie("token", {
//           sameSite: "none",
//           secure: true,
//         });
//          return res.status(200).json({ message: "Logout Sucessfully "});
        
//     } catch (error) {
//       return res.status(500).json({ message: `Logout error ${error}`});
        
//     }
// }



import express from "express"
import genToken from "../config/token.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "email already exists !" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "password must be at least 6 characters !" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hashedPassword,
      email,
    });

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: `sign up error ${error}` });
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "email does not exists !" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "incorrect password" });
    }

    const token = await genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `login error ${error}` });
  }
};

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "log out successfully" });
  } catch (error) {
    return res.status(500).json({ message: `logout error ${error}` });
  }
};
        