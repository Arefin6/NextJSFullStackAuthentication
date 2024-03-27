import mongoose from "mongoose"

interface IUser{
    userName:string,
    email:string,
    password:string,
    isVerified:boolean,
    isAdmin:boolean,
    forgetPasswordToken?:string
    forgetPasswordExpire?:Date,
    verifyToken?:string,
    verifyTokenExpire?:string
}

const userSchema = new mongoose.Schema<IUser>({
  userName:{
     type:String,
     required:true
  },
  email:{
    type:String,
    required:true
 },
 password:{
    type:String,
    required:true
 },
 isVerified:{
    type:Boolean,
    default:false
 },
 isAdmin:{
    type:Boolean,
    default:false
 },
 forgetPasswordToken:{
    type:String
 },
 forgetPasswordExpire:Date,
 verifyToken:String,
 verifyTokenExpire:Date
})
export const User = mongoose.model('user',userSchema);