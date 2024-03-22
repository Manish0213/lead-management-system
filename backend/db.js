const mongoose = require("mongoose");
  const mongoUrl2 =`mongodb+srv://ratnawatmanish031:WptEuAC5F63CApi5@cluster0.qzzcoei.mongodb.net/assignment1?retryWrites=true&w=majority&appName=Cluster0`;
const connectToDatabse = () => {
  mongoose
    .connect(mongoUrl2)
    .then(() => console.log("Connected"))
    .catch((err) => console.error("Connection error:", err));
};
module.exports = connectToDatabse;
