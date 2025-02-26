const mongoose = require("mongoose");
const colors = require("colors");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected To Mongodb Database ${mongoose.connection.host}`.bgGreen.white
    );
  } catch (error) {
    console.log(`Mognodb Database Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;

// const mongoose = require("mongoose");
// const colors = require("colors");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(
//       `Connected to MongoDB Database: ${mongoose.connection.host}`.bgGreen.white
//     );
//   } catch (error) {
//     console.log(`MongoDB Database Error: ${error.message}`.bgRed.white);
//   }
// };

// module.exports = connectDB;
