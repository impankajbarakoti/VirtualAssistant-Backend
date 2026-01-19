// import mongoose from 'mongoose'
// const connectDb = async () => { //connectDb ke naam se hum ek async function banyege jise hum index.js file main call karwayenge
//     try {
//         await mongoose.connect(process.env.MONODB_URL);
//         //Try ke help se kaise hum mongoose ke through database ko connect krte hai  connect krwane ke liye hume await likhna padta ha jo ki important hai
//         console.log("Database is connected"); // isse se terminal main likh ke aa jayega ki Database connect ho gya hai

//     } catch (error) {
//      console.log(error);

//     }
// }

// export default connectDb

import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONODB_URL);
    console.log("db connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;