import React, { useState } from 'react'
import { 
    APIProvider, 
    Map, 
    MapControl,
    AdvancedMarker,
    ControlPosition,
    useAdvancedMarkerRef
} from '@vis.gl/react-google-maps'
import PlaceAutocomplete from './PlaceAutocomplete';
import MapHandler from './MapHandler';

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function DisplayMap() {

    const [position, setPosition] = useState({lat: 41.4925 , lng: -99.9018});
    const [zoom, setZoom] = useState(4);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    
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
        <APIProvider apiKey={apiKey} solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>            
            <div className='h-screen'>
                <button onClick={centerMapUserLocation} className='absolute top-24 inset-x-4 w-32 bg-white z-10'>My City</button>
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
                    <AdvancedMarker ref={markerRef} position={null} />                    
                </Map>
                <MapControl position={ControlPosition.TOP} >
                    <div>
                        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    </div>
                </MapControl>
                <MapHandler place={selectedPlace} marker={marker} />
            </div>      
        </APIProvider>    
    )
}
