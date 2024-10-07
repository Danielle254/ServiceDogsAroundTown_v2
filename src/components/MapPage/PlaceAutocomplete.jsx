import { useMapsLibrary } from '@vis.gl/react-google-maps'
import React, { useEffect, useRef, useState } from 'react'

export default function PlaceAutocomplete({onPlaceSelect}) {
    const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
    const inputRef = useRef(null);
    const places = useMapsLibrary('places');

    useEffect(() => {
        if (!places || !inputRef.current) return;        

        const options = {
            fields: ["geometry", "name", "formatted_address"]
        };

        setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
    }, [places]);

    useEffect(() => {
        if (!placeAutocomplete) return;

        placeAutocomplete.addListener("place_changed", () => {
            onPlaceSelect(placeAutocomplete.getPlace());
        });
    }, [onPlaceSelect, placeAutocomplete]);

    return (
        <div className='flex flex-col'>
            <label htmlFor={'search'} >Add a Place</label>
            <input id={'search'} ref={inputRef} className=' text-lg border-black border-2' placeholder='' />
        </div>
    )
}
