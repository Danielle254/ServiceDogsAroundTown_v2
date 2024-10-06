import React from 'react'

export default function Nav(props) {
  return (
    <header className='flex flex-row justify-between'>
      <h1 className='text-xl'>Service Dogs Around Town</h1>
      <nav className='flex flex-row gap-4'>
        <button>Map</button>
        <button>About</button>
        <button>Login</button>
      </nav>
    </header>
    
  )
}
