// import multer from "multer";
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     // destination mean kha pe save hogi ya bole th uplaod hogi
//     cb(null, "./public"); // where cb means call back
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname); // aur yh pe orginal name ka mtlb hai ki kis name se file save hogi th yha humne orginal file likh de hai
//   },
// });

// const upload = multer({ storage });

// export default upload;

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
export default upload;