import React from 'react'

export default function Nav(props) {

  return (
    <header className='flex flex-row justify-between pb-4 pt-4 px-4 bg-blue-300'>
      <h1 className='text-xl'>Service Dogs Around Town</h1>
      <nav className='flex flex-row gap-4'>
        <button id='map-page-button' className={`border-2 border-gray-400 rounded p-2 bg-white ${props.page === 'map' ? 'border-blue-800' : ''}`}>Map</button>
        <button id='about-page-button' className={`border-2 border-gray-400 rounded p-2 bg-white ${props.page === 'about' ? 'border-blue-800' : ''}`}>About</button>
        <button className='border-2 border-gray-400 rounded p-2 bg-white'>Login</button>
      </nav>
    </header>
    
  )
}
