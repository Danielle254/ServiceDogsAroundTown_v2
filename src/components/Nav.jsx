import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../src/assets/logo.png'

export default function Nav({isLoggedIn}) {

  return (
    <header className='flex flex-col gap-1 px-1 py-1 sm:flex-row sm:justify-between sm:py-2 sm:px-4 sm:gap-0 sm:items-center'>
      <div className='flex flex-row items-center gap-2 justify-center sm:justify-start'>
        <img src={logo} className='h-6 md:h-8'/>
        <h1 className='text-2xl xs:text-3xl md:text-title font-title'>SERVICE DOGS AROUND TOWN</h1>
      </div>      
      <nav>
        <ul className='flex flex-row justify-around xs:justify-center xs:gap-4 sm:gap-6 md:gap-14 md:mr-4'>
          <li>
            <NavLink to="/" className={({isActive}) => (isActive ? 'nav-link-active nav-link' : 'nav-link')} end>Home</NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({isActive}) => (isActive ? 'nav-link-active nav-link' : 'nav-link')} end>About</NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({isActive}) => (isActive ? 'nav-link-active nav-link flex flex-row gap-1 items-center' : 'nav-link flex flex-row gap-1 items-center')} end><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-4 md:size-5 ari" aria-hidden='true'>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
            </svg>{isLoggedIn ? 'Logout' : 'Login'}</NavLink>
          </li>
        </ul>
       </nav>
    </header>
    
  )
}
