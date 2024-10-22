import React from 'react'
import PlaceCard from './PlaceCard'

export default function PlaceCardList({places}) {

    return(
        places.map((place, index) =>
            <PlaceCard 
            name={place.name}
            key={index}
            />
          )
    )
  
}
