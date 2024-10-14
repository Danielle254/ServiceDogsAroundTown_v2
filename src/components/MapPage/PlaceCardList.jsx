import React from 'react'
import PlaceCard from './PlaceCard'

export default function PlaceCardList(props) {

    return(
        props.places.map((place, index) =>
            <PlaceCard 
            name={place.name}
            key={index}
            />
          )
    )
  
}
