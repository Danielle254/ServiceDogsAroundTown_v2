import React from 'react'
import logo from '../../src/assets/logo.png'

export default function Nav({ page, togglePage }) {

  return (
    <header className='flex flex-row justify-between px-4 py-2'>
      <div className='inline-flex gap-2'>
        <img src={logo} className='h-8'/>
        <h1 className='text-3xl font-title'>SERVICE DOGS AROUND TOWN</h1>
      </div>
      
      <nav className='flex flex-row gap-4'>
        <button className={`btn-nav ${page === 'map' ? 'btn-nav-selected' : ''}`} onClick={() => togglePage('map')}>Map</button>
        <button className={`btn-nav ${page === 'about' ? 'btn-nav-selected' : ''}`} onClick={() => togglePage('about')}>About</button>
       </nav>
    </header>
    
  )
}
