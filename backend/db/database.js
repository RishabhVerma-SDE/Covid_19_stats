const mongoose = require("mongoose");



const database = (app) => {
       const mongoUrl =  process.env.MONGODB_URL+"covid_stats?retryWrites=true&w=majority&appName=CovidCreds";
       mongoose.connect(mongoUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
       }).then((res)=>{
        console.log("You are connected with mongodb")
       }).catch(error => {
        console.error("MongoDb error", error);
       })
}

module.exports = {
    database
}