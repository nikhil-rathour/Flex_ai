import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: String,
  name: String,
  email: String,
  picture: String,
});

export default mongoose.model("User", userSchema);
