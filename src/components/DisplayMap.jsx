import React from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function DisplayMap() {

    const defaultCenter = {lat: 41.4925 , lng: -99.9018};    
    
    return (    
        <APIProvider apiKey={apiKey}>
            <div className='h-screen'>
                <Map defaultZoom={4} defaultCenter={defaultCenter} mapId={mapId}>
                </Map>
            </div>      
        </APIProvider>    
    )
}
