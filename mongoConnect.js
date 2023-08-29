const mongoose = require("mongoose");
require('dotenv').config()

module.exports = mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(()=>{
  console.log("DB connected successfully");
}).catch((err)=>{
  console.log("cannot connect",err.message)
});

// const db = mongoose.connection;

// db.on("error", console.error.bind(console, "database connection error"));
// db.once("open", () => {
//   console.log(`database connection established`);
// });

// module.exports = db;
