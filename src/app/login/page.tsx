"use client";
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios, { Axios } from 'axios';
import toast from 'react-hot-toast';

function Login() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email:"",
    password:"",
  })

  const [buttonDisabled, setButtonDisabled] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  
  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile")
      
    } catch (error: unknown) {
      if (error instanceof Error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
      }
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0){
      setButtonDisabled(false)
    }else{
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1 className='text-4xl mb-3'>{loading? "processing" : "Login"}</h1>
      <hr className='text-white w-60 mb-2' />
      
      <label htmlFor="email">email</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='email' 
      />
      <label htmlFor="username">password</label>
      <input type="text"
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='password' 
      />
      <button
      onClick={onLogin}
      className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'> Login here</button>
      <Link href={"/signup"}>Visit for Signup</Link>
    </div>
  )
}

export default Login