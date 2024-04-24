const multer = require("multer");
const path = require("path");

 // Set the file size limit (in bytes)
const maxSize = 3 * 1024 * 1024;  //(3MB)

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
   
     cb(null, 'public/images/users');
   },
   filename: function (req, file, cb) {
      // Get the file extension
      const ext = file.mimetype.split('/')[1];
      // Generate a random number for uniqueness
      let randomNumber =  Math.round(Math.random() * 1e9);
      // Create the filename
      const filename = `user-${randomNumber}-${Date.now()}.${ext}`;
      cb(null, filename);
   }
 });

// Define the file filter function
function fileFilter (req, file, cb) {
  if(file.mimetype.startsWith('image')) { 
    cb(null, true);
  } else {
    cb("Upload only images", false);
  }
}

// Pass the filter to multer
const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: maxSize }
});

module.exports = { upload };
