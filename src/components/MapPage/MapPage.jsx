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

export default function MapComponent({ page, places, handleFormSubmit, addFormVisible, handleFormVisible }) {

    const [markerRef, marker] = useAdvancedMarkerRef();
    const [activeMarker, setActiveMarker] = useState(null);  
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [position, setPosition] = useState({lat: 40 , lng: -97});
    const [zoom, setZoom] = useState(4); 
    const [mapAction, setMapAction] = useState('allPlaces');

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
        setActiveMarker(places[index]);
    }
    
    if (page === 'map') {
    
        return (    
            <APIProvider apiKey={apiKey} >  
            <div className='grid grid-cols-9 h-full overflow-hidden pb-4'>          
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
                        fullscreenControl: true,
                        clickableIcons: false
                    }}
                    >
                        <button onClick={centerMapUserLocation} className='px-2 py-1 font-bold bg-darkblue text-white hover:border-2 hover:border-lightblue border-2 border-darkblue rounded text-sm absolute top-4 right-16'>My City</button>          
                        <AdvancedMarker ref={markerRef} position={null} clickable={true} onClick={() => handleMarkerClick()}>
                        <Pin
                                background={'#53cbe2'}                                
                                glyphColor={'#0E1B41'}   
                                borderColor={'#0E1B41'} 
                                scale={1.2}                            
                        />
                        </AdvancedMarker>
                        {infoWindowShown && 
                            <InfoWindow anchor={marker} onClose={handleClose} shouldFocus={true}>            
                                <div>
                                    <p className='font-bold text-sm text-darkblue'>{selectedPlace.name}</p>
                                    <p className='py-1 text-darkblue'>{selectedPlace.formatted_address}</p>
                                    {!addFormVisible && <button onClick={handleFormVisible} className='btn-info-window'>Rate & Review</button>}
                                </div>                           
                            </InfoWindow>
                        }
                        {places.map((place, index) => 
                            <AdvancedMarker                         
                                position={place.coords} 
                                key={index}
                                clickable={true} 
                                onClick={() => handleActiveMarker(index)}>
                                <Pin
                                    background={'#0E1B41'}
                                    borderColor={'#0E1B41'}
                                    glyphColor={'#53cbe2'}
                                    scale={1.2}
                                />                   
                            </AdvancedMarker>)
                        }
                        {activeMarker && 
                            <InfoWindow position={activeMarker.coords} onCloseClick={() => setActiveMarker(null)}>
                                <div>
                                    <p className='font-bold text-sm text-darkblue pb-1'>{activeMarker.name}</p>
                                    <button className='btn-info-window'>View Details</button>
                                </div>
                            </InfoWindow>
                        }                        
                    </Map>                
                    <MapHandler place={selectedPlace} marker={marker} />                    
                </div> 
                <div className='col-span-3 flex flex-col gap-4 overflow-y-auto bg-darkblue'>
                    <div className='flex flex-row justify-between py-2 px-1 bg-lightgreen sticky top-0 z-10'>
                        <button className={`btn-map-nav ${mapAction === 'allPlaces' ? 'btn-map-nav-selected' : ''}`} onClick={() => setMapAction('allPlaces')}>All Places</button>
                        <button className={`btn-map-nav ${mapAction === 'myPlaces' ? 'btn-map-nav-selected' : ''}`} onClick={() => setMapAction('myPlaces')}>My Places</button> 
                        <button className={`btn-map-nav ${mapAction === 'add' ? 'btn-map-nav-selected' : ''}`} onClick={() => setMapAction('add')}>Add New Place</button>                        
                    </div>
                    {mapAction === 'add' && !addFormVisible &&
                        <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    }
                    {mapAction === 'add' && addFormVisible &&
                        <AddNewPlaceForm                        
                        name={selectedPlace.name}
                        address={selectedPlace.formatted_address}
                        handleSubmit={handleFormSubmit}
                        handleFormVisible={handleFormVisible}
                        />
                    }
                    {mapAction === 'allPlaces' &&
                        <PlaceCardList 
                        places={places}
                        />
                    }
                </div> 
            </div>                         
            </APIProvider>    
        )
    }
    
    
}
