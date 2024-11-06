import React from 'react'
import PlaceCard from './PlaceCard'

export default function PlaceCardList({places}) {

    return(
        <div className='mx-4 flex flex-col gap-3'>
            {places.map((place, index) =>                
                <PlaceCard 
                place={place}
                key={index}
                />            
            )}
          </div>
    )
  
}
