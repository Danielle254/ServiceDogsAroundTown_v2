import React from 'react'
import PlaceAutocomplete from './PlaceAutocomplete';

export default function Sidebar(props) {

    
  
  
    return (
        <div className='col-span-1'>
            <button onClick={props.centerMapUserLocation} className='w-20 border-2 border-black bg-white z-10'>My City</button>
            <PlaceAutocomplete onPlaceSelect={props.setSelectedPlace} />
        </div>
    )
}
