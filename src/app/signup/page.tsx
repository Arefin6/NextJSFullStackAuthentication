"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";
export default function SignUpPage(){
    const router = useRouter()
    const [user,setUser] = React.useState({
        userName:'',
        email:'',
        password:''
    })
    const [loading,setLoading] = React.useState(false);
    const OnSignUp =async()=>{
        try {
           setLoading(true)
           const response = await axios.post("/api/users/signup", user);
           console.log("Sign Up success",response.data);
           router.push('/login')  
        } catch (error:any) {
           console.log("Sign Up failed",error.message);
           toast.error(error.message) 
        }finally{
          setLoading(false) 
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>{loading?"Processing":"Sign Up"}</h1> 
           <br/>
           <label className="m-2">UserName</label>
           <input
           className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
           id="username"
           type="text"
           value={user.userName}
           placeholder="username"
           onChange={(e)=>setUser({...user,userName:e.target.value})}
           />
           <label className="m-2">Email</label>
           <input
           className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
           id="email"
           type="email"
           value={user.email}
           placeholder="email"
           onChange={(e)=>setUser({...user,email:e.target.value})}
           />
           <label className="m-2">Password</label>
           <input
           className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
           id="password"
           type="password"
           value={user.password}
           placeholder="password"
           onChange={(e)=>setUser({...user,password:e.target.value})}
           />
           <button 
           onClick={OnSignUp}
           className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Signup Here</button>
           <Link href="/login">Visit Login Page</Link>
        </div>
    )
}