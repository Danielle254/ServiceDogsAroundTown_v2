import React, { useCallback, useState, useRef } from 'react'
import { 
    APIProvider, 
    Map, 
    AdvancedMarker,
    useAdvancedMarkerRef,
    InfoWindow,
    Pin
} from '@vis.gl/react-google-maps'
import MapHandler from '../components/MapHandler'
import PlaceAutocomplete from '../components/PlaceAutocomplete';
import PlaceCardList from '../components/PlaceCardList';
import AddNewPlaceForm from '../components/AddNewPlaceForm'
import DetailView from '../components/DetailView';

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function MapPage({ places, handleFormSubmit, addFormVisible, handleFormVisible }) {

    const [markerRef, marker] = useAdvancedMarkerRef();
    const [activeMarker, setActiveMarker] = useState(null);  
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [position, setPosition] = useState({lat: 40 , lng: -97});
    const [zoom, setZoom] = useState(4); 
    const [mapAction, setMapAction] = useState('allPlaces');
    const [activeId, setActiveId] = useState(null);
    const modalTarget = useRef(null);

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
    
    function findIndex(id) {
        const index = places.findIndex((each) => each.id === id);
        return index;
    }

    function handleActiveMarker(id) {    
        setActiveMarker(places[findIndex(id)]);
    }

    function openModal(id) {
        modalTarget.current?.showModal();
        setActiveId(id);
    }

    function closeModal() {
        modalTarget.current?.close();
    }
    
    
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
                    <button onClick={centerMapUserLocation} className='px-2 py-1 font-bold bg-darkblue text-white hover:border-2 hover:border-lightblue border-2 border-darkblue rounded text-base absolute top-4 right-16'>My City</button>          
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
                                <p className='font-bold text-base text-darkblue'>{selectedPlace.name}</p>
                                <p className='py-1 text-darkblue text-sm'>{selectedPlace.formatted_address}</p>
                                {!addFormVisible && <button onClick={handleFormVisible} className='btn-info-window'>REVIEW THIS PLACE</button>}
                            </div>                           
                        </InfoWindow>
                    }
                    {places.map((place) => 
                        <AdvancedMarker                         
                            position={place.coords} 
                            key={place.id}
                            clickable={true} 
                            onClick={() => handleActiveMarker(place.id)}>
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
                                <p className='font-bold text-base text-darkblue pb-1'>{activeMarker.name}</p>
                                <button className='btn-info-window' onClick={() => openModal(activeMarker.id)}>VIEW DETAILS</button>
                            </div>
                        </InfoWindow>
                    }                        
                </Map>                
                <MapHandler place={selectedPlace} marker={marker} />                    
            </div> 
            <div className='col-span-3 flex flex-col gap-4 overflow-y-auto bg-darkblue'>
                <div className='flex flex-row justify-around py-2 px-1 bg-lightgreen sticky top-0 z-10'>
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
                    openModal={openModal}
                    />
                }
            </div> 
        </div>   
        {activeId && <DetailView 
        ref={modalTarget} 
        closeModal={closeModal} 
        place={places[findIndex(activeId)]}
        />}                        
        </APIProvider>    
    )
}
