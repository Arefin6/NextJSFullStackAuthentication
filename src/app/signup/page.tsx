"use client"
import Link from "next/link"
import React from "react"
export default function SignUpPage(){
    const [user,setUser] = React.useState({
        name:'',
        email:'',
        password:''
    })
    const OnSignUp =async()=>{
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
           <h1>Sign Up</h1> 
           <br/>
           <label className="m-2">UserName</label>
           <input
           className="p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
           id="username"
           type="text"
           value={user.name}
           placeholder="username"
           onChange={(e)=>setUser({...user,name:e.target.value})}
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