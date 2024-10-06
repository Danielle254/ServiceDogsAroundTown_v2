import React, { useCallback, useState } from 'react'
import { 
    APIProvider, 
    Map, 
    AdvancedMarker,
    useAdvancedMarkerRef,
    InfoWindow
} from '@vis.gl/react-google-maps'

import MapHandler from './MapHandler';

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function MapComponent(props) {

    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const handleMarkerClick =
        useCallback(() => setInfoWindowShown(isShown => !isShown), []);
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    
    
    return (    
        <APIProvider apiKey={apiKey} solutionChannel='GMP_devsite_samples_v3_rgmautocomplete'>             
            <div className='h-500 w-full col-span-6'> 
                <Map 
                zoom={props.zoom} 
                center={props.position} 
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
                    <AdvancedMarker ref={markerRef} position={null} onClick={handleMarkerClick}/> 
                    {infoWindowShown && (
                    <InfoWindow anchor={marker} onClose={handleClose} shouldFocus={true}>
                        <p className='font-bold text-sm'>{props.selectedPlace.name}</p>
                        <p className='py-1'>{props.selectedPlace.formatted_address}</p>
                        <button className='border-2 border-black p-1'>Rate & Review</button>
                    </InfoWindow>  
                    )}      
                </Map>                
                <MapHandler place={props.selectedPlace} marker={marker} />
            </div>                  
        </APIProvider>    
    )
    
    
}
