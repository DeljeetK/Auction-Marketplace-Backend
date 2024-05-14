const multer = require("multer");
 
const multerStorage = (destination) => multer.diskStorage({
  destination: (req, file, cb) => {
    const fileExtension = file.mimetype.split("/")[0];
    if (fileExtension === "image") {
      cb(null, destination);
    }
  },
  filename: (req, file, cb) => {
    let fileName = file.originalname;
 
    const cleanUrl = fileName.replace(/\s+/g, '');
    cb(null, `${Date.now()}_${cleanUrl}`);
  },
});
 
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, and .jpeg files are allowed"), false);
  }
};
 
const uploadProfileImage = multer({
  storage: multerStorage("public/profileImages"),
  fileFilter: fileFilter
});
 
const uploadProductImage = multer({
  storage: multerStorage("public/productImages"),
  fileFilter: fileFilter
});
 
module.exports = {
  uploadProfileImage,
  uploadProductImage
};