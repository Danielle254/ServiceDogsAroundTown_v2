import React from 'react'

export default function Nav({ page, togglePage }) {

  const navButtonStyle = 'px-4 rounded-full font-bold'

  return (
    <header className='flex flex-row justify-between pb-4 pt-4 px-4'>
      <h1 className='text-xl'>Service Dogs Around Town</h1>
      <nav className='flex flex-row gap-4'>
        <button className={`${navButtonStyle} ${page === 'map' ? 'bg-lightblue text-black' : ''}`} onClick={() => togglePage('map')}>Map</button>
        <button className={`${navButtonStyle} ${page === 'about' ? 'bg-lightblue text-black' : ''}`} onClick={() => togglePage('about')}>About</button>
       </nav>
    </header>
    
  )
}
