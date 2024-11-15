import React from 'react'
import { useOutletContext } from 'react-router-dom';
import googleSignInButton from '../assets/images/google sign in.png'

export default function Login() {
  const [places, addNewPlace, addFormVisible, handleFormVisible, isLoggedIn, googleLogin, handleLogout] = useOutletContext();

  return (
    <div className='rounded shadow bg-white w-96 h-96 mx-auto my-auto flex flex-col justify-center items-center gap-10'>
      {isLoggedIn ? 
      <button className='text-darkblue border-2 border-darkblue w-4/5 rounded-full py-1' onClick={handleLogout}>Log Out</button>
      :
      <>
      <p className='text-lg text-darkblue text-center'>Login to create and manage your own entries</p>
      <button className='w-4/5' onClick={googleLogin}><img src={googleSignInButton} className='h-16'/></button> 
      </>
      }           
    </div>
  )
}
