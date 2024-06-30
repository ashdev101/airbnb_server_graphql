


import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
    name: { type: String },
    email: { type: String },
    emailVerified: { type: Date },
    image: { type: String },
    password: { type: String },
    favourateIds :{type:Array , default : []}
    //@ts-ignore
},{timeStamp : true})


export const  User = mongoose.models.users || mongoose.model("users", UserSchema)