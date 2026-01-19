import axios from "axios"
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
const apiUrl = process.env.GEMINI_API_URL;
const geminiResponse = async (command,assistantName,userName) => {
    try {

        if (!apiKey) {
          console.log("Error: GEMINI_API_KEY is missing in .env");
          return null;
        }
        

        const prompts = `You are a virtual assistant named ${assistantName} created by ${userName}.
        You are not Google. You will now behave like a voice-enabled assistant.
        Your task is to understand the user's natural language input and respond with json object like this :
        {
        "type":"general" | "google_search" |"youtube_search" |"youtube_play" |"get_time" | "get_date" |"get_day" |"get_month" |"calculator_open" |"instagram_open"|"facebook_open" |"weather_show",

        "userInput":"<original user input>" {only remove your name from userinput if exists} and agar kisi ne google ya youtube pe kuch search krne ko bola hai toh userInput me only voh search wala text aajaye,

        "response":"<a short spoken response to read out loud to the user>"   }
        
        Instructions:
        - "type":determine the intent of the user.
        - "userinput": original sentence the user spoke.
        - "response" : A short voice-friendly reply e.g., "Sure Sir ,Playing it now" ,"Here's what I found" ,"Sir Today is Tuesday",etc.


        Type meanings:

        - "general": if it'sv a factual or informational question aur agr koi aisa question tumhe puchta hai jiska answer tumhe pta ho  usko bh genreal category main  rkhna ans use short answer main dena 
        - "google_search": if user wants to search something on Google .
        - "youtube_search":if user wants to search something on Google .
        - "youtube_play": if user wants to direct  play a video or song .
        - "get_time": if user ask for current time .
        - "get_date": if user ask for today's date .
        - "get_day": if user ask what day it is.
        - "get_month": if user ask for the current month .
        - "calculator_open": if user wants to open a calculator .
        - "instagram_open": if user wants to open instagram .
        - "facebook_open":  if user wants to open facebook .
        - "weather-show":  if user wants to know weather .
        
        Important:
        - Use ${userName} agar koi puche tumhe kisne banaya hai ya tumhara janamdata kon hai . 
        - Only respond with the JSON object , nothing else .
       

        now your UserInput- ${command}

        `;
       const result = await axios.post(
         apiUrl,
         {
           contents: [
             {
               parts: [{ text: prompts }],
             },
           ],
         },
         {
           headers: {
             "Content-Type": "application/json",
             "x-goog-api-key": apiKey,
           },
         },
       );

       
     
 return result?.data?.candidates?.[0]?.content?.parts?.[0]?.text || null;

  } catch (error) {
    console.log("Gemini API Error:", error.response?.data || error.message);
    return null;
  }
}


export default geminiResponse