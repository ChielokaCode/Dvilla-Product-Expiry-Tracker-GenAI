import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  country: String,
  dob: String,
  gender: String,
  phoneNo: String,
  password: String,
  confirmPassword: String,
});

const UserModel = model("users", UserSchema);
export default UserModel;
