import React from 'react'

export default function PlaceCard({name}) {
  return (
    <div className='bg-card p-1 rounded'>
      <p>{name}</p>
    </div>
  )
}
