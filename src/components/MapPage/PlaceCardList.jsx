import React from 'react'
import PlaceCard from './PlaceCard'

export default function PlaceCardList({places}) {

    return(
        <div className='mx-2 flex flex-col gap-2'>
            {places.map((place, index) =>
                
                <PlaceCard 
                name={place.name}
                note={place.publicNote}
                key={index}
                />            
            )}
          </div>
    )
  
}
