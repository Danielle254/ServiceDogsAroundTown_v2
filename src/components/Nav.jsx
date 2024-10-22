import React from 'react'

export default function Nav(props) {

  const navButtonStyle = 'px-4 rounded-full font-bold'

  return (
    <header className='flex flex-row justify-between px-4 py-2'>
      <h1 className='text-xl'>Service Dogs Around Town</h1>
      <nav className='flex flex-row gap-4'>
        <button className={`${navButtonStyle} ${props.page === 'map' ? 'bg-lightblue text-black' : ''}`} onClick={() => props.togglePage('map')}>Map</button>
        <button className={`${navButtonStyle} ${props.page === 'about' ? 'bg-lightblue text-black' : ''}`} onClick={() => props.togglePage('about')}>About</button>
       </nav>
    </header>
    
  )
}
