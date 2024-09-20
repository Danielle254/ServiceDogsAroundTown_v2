import React from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function DisplayMap() {
    
    const position = { lat: 46.869018, lng: -114.026812};
  
    return (    
        <APIProvider apiKey={apiKey}>
            <div className='h-screen'>
                <Map zoom={12} center={position} mapId={mapId}>
                </Map>
            </div>      
        </APIProvider>    
    )
}
