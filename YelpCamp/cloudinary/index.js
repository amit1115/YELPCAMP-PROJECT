const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({                                   // associating our account wiht this cloudinary instance
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new CloudinaryStorage({                  // instance of cloudinary storage
    cloudinary, 
    params: {                                            // this CloudinaryStorage now configured its setup so it has credentials for our particular cloudinary account
        folder: 'YelpCamp',                              // it means we want to upload things to YelpCamp folder
        allowedFormats: ['jpeg','png','jpg']             // these image formats are allowed
    }
});

module.exports = {
    cloudinary,
    storage
}