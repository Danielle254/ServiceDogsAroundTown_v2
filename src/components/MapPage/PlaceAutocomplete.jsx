import { useMapsLibrary } from '@vis.gl/react-google-maps'
import React, { useEffect, useRef, useState } from 'react'

export default function PlaceAutocomplete({onPlaceSelect}) {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef();
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;        

        const options = {
            fields: ["geometry", "name", "formatted_address"],
            componentRestrictions: {country: ['us']}
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
            inputRef.current.value = '';
        });
        
    }, [onPlaceSelect, placeAutocomplete]);

    return (
        <div className='flex flex-col'>
            <label htmlFor={'search'} >Type Business Name to Search, then Select</label>
            <input id={'search'} ref={inputRef} className='text-lg rounded-full mt-1 text-black pl-1' placeholder='' />
        </div>
    )
}
