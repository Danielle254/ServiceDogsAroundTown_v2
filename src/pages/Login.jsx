import React from 'react'
import { useOutletContext } from 'react-router-dom';
import googleSignInButton from '../assets/images/google sign in.png'

export default function Login() {
  const [places, addNewPlace, deletePlace, updatePlace, addFormVisible, handleFormVisible, isLoggedIn, googleLogin, handleLogout, userId] = useOutletContext();

  return (
    <div className='rounded shadow bg-white w-full h-1/2 lg:w-96 lg:h-96 lg:mx-auto my-auto flex flex-col justify-center items-center gap-10'>
      {isLoggedIn ? 
      <button className='text-darkblue border-2 border-darkblue w-4/5 rounded-full py-1 font-bold hover:bg-darkblue hover:text-white' onClick={handleLogout}>Log Out</button>
      :
      <>
      <p className='text-lg text-darkblue text-center'>Login to create and manage your own entries</p>
      <button className='flex flex-row justify-center' onClick={googleLogin}><img src={googleSignInButton} className='h-12'/></button> 
      </>
      }           
    </div>
  )
}
