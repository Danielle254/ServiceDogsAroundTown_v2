import React, { useCallback, useState } from 'react'
import { 
    APIProvider, 
    Map, 
    AdvancedMarker,
    useAdvancedMarkerRef,
    InfoWindow,
    Pin
} from '@vis.gl/react-google-maps'
import MapHandler from './MapHandler'
import PlaceAutocomplete from './PlaceAutocomplete';

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function MapComponent(props) {

    const [markerRef, marker] = useAdvancedMarkerRef();
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const handleMarkerClick =
        useCallback(() => setInfoWindowShown(isShown => !isShown), []);
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [position, setPosition] = useState({lat: 41.4925 , lng: -99.9018});
    const [zoom, setZoom] = useState(4); 
    const [mapAction, setMapAction] = useState('add');

    const buttonStyling = 'border-2 border-black bg-white px-2';

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
    
    if (props.page === 'map') {
    
        return (    
            <APIProvider apiKey={apiKey} >  
            <div className='grid grid-cols-9 grow'>          
                <div className='col-span-6'> 
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
                        <AdvancedMarker ref={markerRef} position={null} onClick={handleMarkerClick}/> 
                        {infoWindowShown && (
                        <InfoWindow anchor={marker} onClose={handleClose} shouldFocus={true}>
                            <p className='font-bold text-sm'>{selectedPlace.name}</p>
                            <p className='py-1'>{selectedPlace.formatted_address}</p>
                            <button className='border-2 border-black p-1'>Rate & Review</button>
                        </InfoWindow>  
                        )}      
                        {props.places.map((coords, index) => 
                        <AdvancedMarker 
                        position={coords} 
                        key={index}>
                            <Pin
                                background={'#00008B'}
                                borderColor={'#FFFFFF'}
                                glyphColor={'#90D5FF'}
                            />                        
                        </AdvancedMarker>
                        )
                        }
                    </Map>                
                    <MapHandler place={selectedPlace} marker={marker} />                    
                </div> 
                <div className='col-span-3 flex flex-col gap-8 p-2 bg-yellow-100'>
                    <div className='flex flex-row justify-between'>
                        <button onClick={centerMapUserLocation} className={buttonStyling}>My City</button>
                        <button className={`${buttonStyling} ${mapAction === 'add' ? 'bg-gray-300' : ''}`}>Add New Place</button>
                        <button className={buttonStyling}>View My Places</button>
                    </div>
                    {mapAction === 'add' && 
                    <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    }
                </div> 
            </div>                         
            </APIProvider>    
        )
    }
    
    
}
