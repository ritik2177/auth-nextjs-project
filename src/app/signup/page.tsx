"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from "react-hot-toast";
import axios from 'axios';

function Signup() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email:"",
    password:"",
    username:"",
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login")
      
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log("Signup failed", error.message);
        toast.error(error.message)
      }
    } finally{
      setLoading(false);
    }
  }



  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
      setButtonDisabled(false);
    }else{
      setButtonDisabled(true);
    }
  }, [user])
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl mb-3'>{loading ? "Processing" : "Signup"}</h1>
      <hr className='text-white w-60 mb-2' />
      <label htmlFor="username">username</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder='username' 
      />
      <label htmlFor="email">email</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email' 
      />
      <label htmlFor="password">password</label>
      <input type="password"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password' 
      />
      <button
      onClick={onSignup}
      className='cursor-pointer p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'> {buttonDisabled ? "No signup" : "Signup"} </button>
      <Link href={"/login"}>Visit login page</Link>
    </div>
  )
}

export default Signup