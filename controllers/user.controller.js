// import { json, response } from "express"
// import uploadOnCloudinary from "../config/cloudinary.js"
// import geminiResponse from "../gemini.js"
// import User from "../models/user.model.js"
// import moment from "moment"

// export const getCurrentUser = async (req, res) => {
//     try {
//         const userId = req.userId
//         const user = await User.findById(userId).select("-password")
//             if (!user) {
//                 return res.status(400).json({message:"User Not Found"})
//         }
//         return res.status(200).json(user)

//     } catch (error) {

//          return res.status(400).json({ message: "Get Current user Error" });
//     }
// }

// export const updateAssistant = async (req, res) => {  // yha se abb assistant ka name fill krne ke  bdd jo bh aage ka proces hoga vh yha se kiya jayega iska yha pe hum logic likh rh hai  iske under ek th hum assistant ka name and assistant ka image ko update karnge
//     try {
//         console.log("BODY:", req.body);
//         console.log("FILE:", req.file);
//         console.log("USERID:", req.userId);

//         const { assistantName, imageUrl } = req.body
//         let assistantImage;
//         if (req.file) {
//             assistantImage= await uploadOnCloudinary(req.file.path)
//         }
//         else {

//             assistantImage=imageUrl
//         }

//         const user = await User.findByIdAndUpdate(req.userId, {
//             assistantName,assistantImage
//         },{ new: true }).select("-password")

//         return res.status(200).json(user)
//     } catch (error) {
//          console.log("Update Assistant Error:", error);
//         return res.status(400).json({ message: "Update Assistant Error" });
//     }
// }

// export const askToAssistant = async (req, res) => {
//     try {
//         const {command}=req.body
//       const user = await User.findById(req.userId);
//       user.history.push(command)
//       user.save()
//         const userName = user.name
//         const assistantName = user.assistantName

//         const result = await geminiResponse(command, assistantName ,userName);

//         const jsonMatch=result.match(/{[\s\S]*}/)  //match karega curly bracket open ha yh nh ko aur jo bbh S ka mean hai whitespaces yh hum isliye kr rheh h q ki hummne clean json chaiye

//         if (!jsonMatch) {
//             return res.status(400).json({response:"Sorry Sir ,I can't understand"})
//         }

//         const gemResult = JSON.parse(jsonMatch[0])
//         const type = gemResult.type
//         switch (type) {
//           case "get_date":
//             return res.json({
//               type,
//               userInput: gemResult.userInput,
//               response: `Current date is ${moment().format("YYYY-MM-DD")}`,
//             });
//           case "get_time":
//             return res.json({
//               type,
//               userInput: gemResult.userInput,
//               response: `Current time is ${moment().format("hh:mm A")}`,
//             });
//           case "get_day":
//             return res.json({
//               type,
//               userInput: gemResult.userInput,
//               response: `Today is ${moment().format("dddd")}`,
//             });
//           case "get_month":
//             return res.json({
//               type,
//               userInput: gemResult.userInput,
//               response: `Today is ${moment().format("MMMM")}`,
//             });

//             case "general":
//             case "google_search":
//             case "youtube_search":
//             case "youtube_play":
//             case "calculator_open":
//             case "instagram_open":
//             case "facebook_open":
//             case "weather_show":

//                 return res.json({
//                   type,
//                   userInput:gemResult.userInput,
//                   response: gemResult.response,
//                 });

//             default:
//                  return res.status(400).json({ response: "I didn't understand that Command" });
//         }

//     } catch (error) {
//           return res.status(500).json({ response: "Ask Assistant Error" });
//     }
// }

import uploadOnCloudinary from "../config/cloudinary.js";
import geminiResponse from "../gemini.js";
import User from "../models/user.model.js";
import moment from "moment";
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "get current user error" });
  }
};

export const updateAssistant = async (req, res) => {
  try {
    const { assistantName, imageUrl } = req.body;
    let assistantImage;
    if (req.file) {
      assistantImage = await uploadOnCloudinary(req.file.path);
    } else {
      assistantImage = imageUrl;
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        assistantName,
        assistantImage,
      },
      { new: true },
    ).select("-password");
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: "updateAssistantError user error" });
  }
};

export const askToAssistant = async (req, res) => {
  try {
    const { command } = req.body;
    const user = await User.findById(req.userId);
    user.history.push(command);
    user.save();
    const userName = user.name;
    const assistantName = user.assistantName;
    const result = await geminiResponse(command, assistantName, userName);

    const jsonMatch = result.match(/{[\s\S]*}/);
    if (!jsonMatch) {
      return res.ststus(400).json({ response: "sorry, i can't understand" });
    }
    const gemResult = JSON.parse(jsonMatch[0]);
    console.log(gemResult);
    const type = gemResult.type;

    switch (type) {
      case "get_date":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current date is ${moment().format("YYYY-MM-DD")}`,
        });
      case "get_time":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `current time is ${moment().format("hh:mm A")}`,
        });
      case "get_day":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `today is ${moment().format("dddd")}`,
        });
      case "get_month":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: `today is ${moment().format("MMMM")}`,
        });
      case "google_search":
      case "youtube_search":
      case "youtube_play":
      case "general":
      case "calculator_open":
      case "instagram_open":
      case "facebook_open":
      case "weather_show":
        return res.json({
          type,
          userInput: gemResult.userInput,
          response: gemResult.response,
        });

      default:
        return res
          .status(400)
          .json({ response: "I didn't understand that command." });
    }
  } catch (error) {
    return res.status(500).json({ response: "ask assistant error" });
  }
};