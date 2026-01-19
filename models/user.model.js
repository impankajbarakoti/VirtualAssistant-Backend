// //sabse phele hum user ka schema banyegne and then model banyenge
//  // isse import krna jaruri hai kyun ki iski through ke hum model banyenge
// import mongoose from "mongoose";

// // schema banane ke liye hume phele apne schema ka naam rkhna hoga jis ke humne userSchema rkh diya hai ab naam define krke ab ise create h krna hoga th humne likha new mongoose.schema({},{}) ab is schema ke under do object hote hai phle wale object ke under banta hai humara schema and jo dusra object banta hai usme likhte hai timestamps iska mtlb hota  hai jaise jaise koi bh cheez create ho th uske sath uska time bbh create ho jaye ke yh chiz iss date ko create hu thi and may be time bh create ho jati haai

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       unique: true,
//       required: true
//     },
//     password: {
//       type: String,
//       required: true
//     },

//     assistantName: {
//       type: String
//     },
//     assistantImage: {
//       type: String
//         },

//     // then fhr hum ek history naam ka schema banyenge ke ab tk kya kya btt kr ke hai virtual assistant se ab history ko store krne ke liye hume ek history field ke arry banana hoga and uske under object create kr ke usme type:string rkhh denge
//         history: [
//             {type:String}
//     ]
//     }, { timestamps: true });

// // abhi tk humne user based schema banaya tha ab hum create karnege user  schema based ke upper user ka model banyenge

// const User = mongoose.model("User", userSchema)
// export default  User

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    assistantName: {
      type: String,
    },
    assistantImage: {
      type: String,
    },
    history: [{ type: String }],
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;