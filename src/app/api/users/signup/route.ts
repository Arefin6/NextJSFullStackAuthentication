import { connect } from "../../../../dbConfig/dbConfig";
import { User } from "../../../../models/UserModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

connect()

export async function POST(request:NextRequest){
    try {
      const reqBody = await request.json();
      console.log(reqBody)
      const {userName,email,password} = reqBody;
      // check if user exists
       const user = await User.findOne({email})
       if(user){
         return NextResponse.json({error:"User Already Exists"},{status:400})
       }
       // hash Password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt)
       const newUser = new User({
        userName,
        email,
        password: hashedPassword
    })

    const savedUser = await newUser.save()
    console.log(savedUser);

    //send verification email

    //await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})

    return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser
    })

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}