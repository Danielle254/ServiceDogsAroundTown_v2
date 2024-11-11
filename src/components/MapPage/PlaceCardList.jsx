import React from 'react'
import PlaceCard from './PlaceCard'

export default function PlaceCardList({places, openModal}) {

    return(
        <div className='mx-4 flex flex-col gap-3'>
            {places.map((place) =>                
                <PlaceCard 
                place={place}
                key={place.id}
                openModal={openModal}
                />            
            )}
          </div>
    )
  
}
