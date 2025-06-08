"use client";
import axios from "axios"
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import React, { useState } from 'react'

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing")
  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logout successful')
      router.push('/login')
    } catch (error : unknown) {
      if (error instanceof Error) {
      console.log(error.message)
      toast.error(error.message);
      }
    }
  }

  const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id)
  }
  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <hr />
        <p>Profile Page</p>
        <h2>
          {data === 'nothing'
            ? "Nothing"
            : <Link href={`/profile/${data}`}>{data}</Link>}
        </h2>
        <button
        onClick={getUserDetails}
        className='bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
        >Get User Detail</button>
        <button
        onClick={logout}
        className='bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded '
        >Logout</button>
    </div>
  )
}

