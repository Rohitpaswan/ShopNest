const app = require("./app");
const {serverPort} = require("./secret");
const connectDB = require("./db/connection")


app.listen(3000 , async() =>{
    console.log(`running on port ${serverPort}`);
    //await connectDB();
})