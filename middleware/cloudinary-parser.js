const cloudinary = require('cloudinary').v2;
const multerStorageCloudinary = require('multer-storage-cloudinary');
const multer = require('multer');

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary
});

const parser = multer({ storage });

module.exports = parser;
