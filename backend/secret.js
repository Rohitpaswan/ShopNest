require('dotenv').config({ path: "./config.env" });
module.exports ={
    serverPort : process.env.PORT ,
    DATABASE_URI : process.env.DATABASE_URI
}




