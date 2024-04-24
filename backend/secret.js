require('dotenv').config({ path: "./config.env" });
module.exports ={
    serverPort : process.env.PORT ,
    DATABASE_URI : process.env.DATABASE_URI, 
    defaultImgPath : process.env.DEFAULT_USER_IMAGE_PATH ||'public/images/default.png',
    secretKey: process.env.JWT_SECRET,
    smptUsername: process.env.SMPT_USERNAME,
    smptPassword: process.env.SMPT_PASSWORD,
    client_url: process.env.client_url 
}




