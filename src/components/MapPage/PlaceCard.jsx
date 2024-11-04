import React from 'react'

export default function PlaceCard({name, note}) {
  return (
    <div className='bg-accentblue p-1 rounded shadow-sm shadow-gray-800 hover:shadow-gray-700 hover:cursor-pointer'>
      <p>{name}</p>
      <p>{note}</p>
    </div>
  )
}
