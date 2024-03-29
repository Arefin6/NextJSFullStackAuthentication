import { connect } from "../../../../dbConfig/dbConfig";
import { User } from "../../../../models/UserModel";
import { NextRequest,NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import jwt from'jsonwebtoken';

connect()

export async function POST(request:NextRequest){
    try {
      const reqBody = await request.json();
      console.log(reqBody)
      const {email,password} = reqBody;
      // check if user exists
       const user = await User.findOne({email})
       if(!user){
         return NextResponse.json({error:"No User Found"},{status:400})
       }
       // Check Password
       const verifyPassword = await bcrypt.compare(password,user.password); 
       if(!verifyPassword){
        return NextResponse.json({error:"Password Didnot Match"},{status:401})
       }
    

    //create Token Data
     const tokenData = {
        id:user._id,
        username:user.userName,
        email:user.email
     }
    // create Token
    const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn:'1d'});

    const response = NextResponse.json({
        message: "Login successful",
        success: true,
    })

    response.cookies.set('token',token,{httpOnly:true})

    return response;

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}