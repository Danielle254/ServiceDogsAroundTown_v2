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
import PlaceCardList from './PlaceCardList';
import AddNewPlaceForm from './AddNewPlaceForm'

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function MapComponent(props) {

    const [markerRef, marker] = useAdvancedMarkerRef();
    const [activeMarker, setActiveMarker] = useState(null);  
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [position, setPosition] = useState({lat: 40 , lng: -97});
    const [zoom, setZoom] = useState(4); 
    const [mapAction, setMapAction] = useState('add');
    const [addFormVisible, setAddFormVisible] = useState(false);

    const buttonStyling = 'px-2 font-bold';

    function handleMarkerClick() {        
        setInfoWindowShown(isShown => !isShown);
    }

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

    function handleActiveMarker(index) {        
        setActiveMarker(props.places[index]);
    }
    
    if (props.page === 'map') {
    
        return (    
            <APIProvider apiKey={apiKey} >  
            <div className='grid grid-cols-9 grow'>          
                <div className='col-span-6 pl-4'> 
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
                        <AdvancedMarker ref={markerRef} position={null} clickable={true} onClick={() => handleMarkerClick()}>
                        <Pin
                                background={'#808080'}                                
                                glyphColor={'#FFFFFF'}                                
                        />
                        </AdvancedMarker>
                        {infoWindowShown && 
                            <InfoWindow anchor={marker} onClose={handleClose} shouldFocus={true}>            
                                <div>
                                    <p className='font-bold text-sm text-black'>{selectedPlace.name}</p>
                                    <p className='py-1 text-black'>{selectedPlace.formatted_address}</p>
                                    <button onClick={() => setAddFormVisible(true)} className='border-2 border-black p-1 text-black'>Rate & Review</button>
                                </div>                           
                            </InfoWindow>
                        }
                        {props.places.map((place, index) => 
                            <AdvancedMarker                         
                                position={place.coords} 
                                key={index}
                                clickable={true} 
                                onClick={() => handleActiveMarker(index)}>
                                <Pin
                                    background={'#00008B'}
                                    borderColor={'#FFFFFF'}
                                    glyphColor={'#90D5FF'}
                                    scale={1.2}
                                />                   
                            </AdvancedMarker>)
                        }
                        {activeMarker && 
                            <InfoWindow position={activeMarker.coords} onCloseClick={() => setActiveMarker(null)}>
                                <div>
                                    <p className='font-bold text-sm text-black'>{activeMarker.name}</p>
                                    <button className='border-2 border-black p-1 text-black'>view details</button>
                                </div>
                            </InfoWindow>
                        }                        
                    </Map>                
                    <MapHandler place={selectedPlace} marker={marker} />                    
                </div> 
                <div className='col-span-3 flex flex-col gap-8 px-2'>
                    <div className='flex flex-row justify-between'>
                        <button onClick={centerMapUserLocation} className={`${buttonStyling} border-2 border-gray-400 rounded`}>My City</button>
                        <button className={`${buttonStyling} ${mapAction === 'view' ? 'underline' : ''}`} onClick={() => setMapAction('view')}>All Places</button>
                        <button className={`${buttonStyling} ${mapAction === 'add' ? 'underline' : ''}`} onClick={() => setMapAction('add')}>Add New Place</button>                        
                    </div>
                    {mapAction === 'add' && 
                        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    }
                    {mapAction === 'add' && addFormVisible &&
                        <AddNewPlaceForm />
                    }
                    {mapAction === 'view' &&
                        <PlaceCardList 
                        places={props.places}
                        />
                    }
                </div> 
            </div>                         
            </APIProvider>    
        )
    }
    
    
}
