import React, {useEffect} from 'react'
import { auth } from '../firebase'
import googleSignIn from '../assets/images/google sign in.png'

export default function Login() {
  return (
    <div className='rounded shadow bg-white w-96 h-96 mx-auto my-auto flex flex-col justify-center items-center gap-10'>
      <p className='text-lg text-darkblue text-center'>Login to create and manage your own entries</p>
      <button className='w-4/5'><img src={googleSignIn} className='h-16'/></button>
      
    </div>
  )
}
