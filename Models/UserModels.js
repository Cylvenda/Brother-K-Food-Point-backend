import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true, unique:true},
    phone: {type:Number, required:true},
    password: {type:String, required:true},
    cartData: {type:Object, default:{}}
}, {minimize:false})

const userModel = mongoose.model.users || mongoose.model("users", userSchema);

export default userModel;