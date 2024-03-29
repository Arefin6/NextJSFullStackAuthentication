"use client"
import axios from "axios";
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { toast } from "react-hot-toast";
export default function LoginUpPage(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:'',
        password:''
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const OnLogin =async()=>{
        try {
            setLoading(true);
            const response = await axios.post('/api/users/login',user);
            toast.success('Login Success')
            router.push('/profile')
        } catch (error:any) {
           console.log("Login Failed",error.message)
           toast.error(error.message) 
        }finally{
         setLoading(false)
        }
    }
    useEffect(()=>{
      if(user.email.length>0 && user.password.length>0){
        setButtonDisabled(false)
      }
      else{
        setButtonDisabled(true)
      }
    },[user])

    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>Login</h1> 
           <br/>
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
           onClick={OnLogin}
           className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login Here</button>
           <Link href="/signup">Visit Signup Page</Link>
        </div>
    )
}