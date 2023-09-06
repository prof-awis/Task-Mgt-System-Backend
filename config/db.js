const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

const connectToDB = ()=>{
  mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

}



module.exports = connectToDB
