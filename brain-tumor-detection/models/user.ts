import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add the name"],
  },
  email: {
    type: String,
    required: [true, "please add the email"],
    unique: [true, "please enter a new email"],
  },
  password: {
    type: String,
    required: [true, "please add the password"],
  },
});
const User = mongoose.models.users || mongoose.model("users", userSchema);
export default User;
