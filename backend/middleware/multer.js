import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "FoodSpot", // Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

// const storage = multer.diskStorage({
//   filename: function (req, file, callBack) {
//     callBack(null, file.originalname);
//   },
// });

const upload = multer({storage})

export default upload;