const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
// async function connectToMongoDB(url) {
//   return mongoose.connect(url);
// }
const DB_NAME = "usl-shortener"
const connectToMongoDB= async ()=>{
  try {
      await mongoose.connect(`${process.env.ATLAS_URI}/${DB_NAME}`);
  } catch (error) {
      console.log("MONGODB connection error: ", error);
      process.exit(1)
  }
}

module.exports = {
  connectToMongoDB,
};
