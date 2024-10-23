import React from 'react'

export default function Nav({ page, togglePage }) {

  return (
    <header className='flex flex-row justify-between px-4 py-2'>
      <h1 className='text-xl'>Service Dogs Around Town</h1>
      <nav className='flex flex-row gap-4'>
        <button className={`btn-nav ${page === 'map' ? 'btn-nav-selected' : ''}`} onClick={() => togglePage('map')}>Map</button>
        <button className={`btn-nav ${page === 'about' ? 'btn-nav-selected' : ''}`} onClick={() => togglePage('about')}>About</button>
       </nav>
    </header>
    
  )
}
