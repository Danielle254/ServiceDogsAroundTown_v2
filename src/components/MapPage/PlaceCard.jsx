import React from 'react'

export default function PlaceCard(props) {
  return (
    <div className='bg-blue-950 p-1 rounded'>
      <p>{props.name}</p>
    </div>
  )
}
