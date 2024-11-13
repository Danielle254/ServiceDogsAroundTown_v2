import React from 'react'
import logo from '../../src/assets/logo.png'

export default function Nav() {

  return (
    <header className='flex flex-row justify-between py-2 px-4'>
      <div className='flex flex-row items-center gap-2'>
        <img src={logo} className='h-8'/>
        <h1 className='text-title font-title'>SERVICE DOGS AROUND TOWN</h1>
      </div>      
      <nav className='flex flex-row gap-14 mr-4'>
        <button className={`btn-nav ${page === 'map' ? 'btn-nav-selected' : ''}`} onClick={() => togglePage('map')}>Home</button>
        <button className={`btn-nav ${page === 'about' ? 'btn-nav-selected' : ''}`} onClick={() => togglePage('about')}>About</button>                
        <button className='btn-nav flex flex-row items-center gap-1'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor" className="size-5 ari">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/>
        </svg>
        Login</button>
       </nav>
    </header>
    
  )
}
