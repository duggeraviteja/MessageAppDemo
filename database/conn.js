const mongoose = require("mongoose");

 mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then(() => {
    console.log("Database connected succesfully");
}).catch((err)=>{
    console.log("Database not connected "+err);
})



