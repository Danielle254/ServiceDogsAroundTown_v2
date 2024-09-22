import React, { useState } from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps'

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function DisplayMap() {

    const [position, setPosition] = useState({lat: 41.4925 , lng: -99.9018});
    const [zoom, setZoom] = useState(4);
    
    function centerMapUserLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, fail);
        } else {
            alert("Geolocation is not supported by your browser")
        }
    }

    function success(pos) {
        setPosition({lat: pos.coords.latitude, lng: pos.coords.longitude});
        setZoom(12);
    }

    function fail() {
        alert("Unable to retrieve your location");
    }
    
    return (    
        <APIProvider apiKey={apiKey}>            
            <div className='h-screen'>
                <button onClick={centerMapUserLocation} className='absolute top-12 inset-x-1/2 w-32 bg-white z-10'>My City</button>
                <Map 
                zoom={zoom} 
                center={position} 
                mapId={mapId} 
                reuseMaps={true} 
                onCenterChanged={(map) => setPosition(map.detail.center)}
                onZoomChanged={(map) => setZoom(map.detail.zoom)}
                options={{
                    gestureHandling: 'greedy',
                    draggable: true
                }}
                >                    
                </Map>
            </div>      
        </APIProvider>    
    )
}
