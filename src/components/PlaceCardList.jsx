import React from 'react'
import PlaceCard from './PlaceCard'

export default function PlaceCardList({places, openModal, type, userId}) {

    if (type === 'allPlaces') {
        return(
            <div className='mx-4 flex flex-col gap-3 pb-4 sm:pb-0'>
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

    if (type === 'myPlaces') {
        return(
            <div className='mx-4 flex flex-col gap-3 pb-4 sm:pb-0'>
                {places.filter((place) => place.author === userId).map((place) =>                
                    <PlaceCard 
                    place={place}
                    key={place.id}
                    openModal={openModal}
                    myPlacesView={true}
                    />            
                )}
              </div>
        )
    }

  
}
