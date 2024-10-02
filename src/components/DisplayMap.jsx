import React, { useCallback, useState } from 'react'
import { 
    APIProvider, 
    Map, 
    AdvancedMarker,
    useAdvancedMarkerRef,
    InfoWindow
} from '@vis.gl/react-google-maps'
import PlaceAutocomplete from './PlaceAutocomplete';
import MapHandler from './MapHandler';

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function DisplayMap(props) {

    const [position, setPosition] = useState({lat: 41.4925 , lng: -99.9018});
    const [zoom, setZoom] = useState(4);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    
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

    const handleMarkerClick =
        useCallback(() => setInfoWindowShown(isShown => !isShown), []);

    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    
    return (    
        <APIProvider apiKey={apiKey} solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>            
            <div className='h-500 w-3/5 mx-auto mt-24'>                
                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                <Map 
                zoom={zoom} 
                center={position} 
                mapId={mapId} 
                reuseMaps={true} 
                onCenterChanged={(map) => setPosition(map.detail.center)}
                onZoomChanged={(map) => setZoom(map.detail.zoom)}
                options={{
                    gestureHandling: 'greedy',
                    draggable: true,
                    disableDefaultUI: true,
                    zoomControl: true,
                    fullscreenControl: true
                }}
                >
                    <button onClick={centerMapUserLocation} className='relative bottom-14 inset-x-3 w-20 border-2 border-black bg-white z-10'>My City</button>
                    <AdvancedMarker ref={markerRef} position={null} onClick={handleMarkerClick}/> 
                    {infoWindowShown && (
                    <InfoWindow anchor={marker} onClose={handleClose} shouldFocus={true}>
                        <p className='font-bold text-sm'>{selectedPlace.name}</p>
                        <p className='py-1'>{selectedPlace.formatted_address}</p>
                        <button className='border-2 border-black p-1' onClick={props.openNewPlaceModal}>Rate & Review</button>
                    </InfoWindow>  
                    )}      
                </Map>                
                <MapHandler place={selectedPlace} marker={marker} />
            </div>      
        </APIProvider>    
    )
}
