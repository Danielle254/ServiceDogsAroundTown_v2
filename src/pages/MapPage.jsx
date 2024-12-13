import React, { useCallback, useState, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'
import { 
    APIProvider, 
    Map, 
    AdvancedMarker,
    useAdvancedMarkerRef,
    InfoWindow,
    Pin
} from '@vis.gl/react-google-maps'
import cityState from '../utilities/cityState'
import MapHandler from '../components/MapHandler'
import PlaceAutocomplete from '../components/PlaceAutocomplete'
import PlaceCardList from '../components/PlaceCardList'
import NewPlace from '../components/NewPlace'
import DetailView from '../components/DetailView'

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

export default function MapPage() {
    const [places, addNewPlace, deletePlace, updatePlace, addFormVisible, handleFormVisible, isLoggedIn, googleLogin, handleLogout, userId] = useOutletContext();
    const [markerRef, marker] = useAdvancedMarkerRef();
    const [activeMarker, setActiveMarker] = useState(null);  
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [position, setPosition] = useState({lat: 40 , lng: -97});
    const [zoom, setZoom] = useState(window.screen.width < 600 ? 3 : 4); 
    const [filter, setFilter] = useState('All Places');
    const [activeId, setActiveId] = useState(null);
    const modalTarget = useRef(null);
    const [mobileDisplay, setMobileDisplay] = useState('map');

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

    function resetActiveId() {
        setActiveId(null);
    }
    
    
    return (    
        <APIProvider apiKey={apiKey} >  
        <div className={mobileDisplay === 'map' ? 'h-full overflow-hidden flex flex-col sm:grid sm:grid-cols-9 sm:pb-4' : 'h-full overflow-hidden flex flex-col sm:grid sm:grid-cols-9 sm:pb-4'}>  
            {window.screen.width < 600 &&
            <div className='bg-lightblue flex flex-row text-sm'>                
                <button onClick={() => setMobileDisplay('map')} className={mobileDisplay === 'map' ? 'bg-accentblue py-2 w-1/3 underline underline-offset-4' : "py-2 px-2 w-1/3 text-darkblue"}>Map</button>
                <button onClick={() => setMobileDisplay('list')} className={mobileDisplay === 'list' ? 'bg-accentblue py-2 w-1/3 underline underline-offset-4' : "py-2 px-2 w-1/3 text-darkblue"}>List</button>
                <button className={mobileDisplay === 'add' ? 'bg-accentblue py-2 w-1/3 underline underline-offset-4' : "py-2 px-2 w-1/3 text-darkblue"} onClick={() => setMobileDisplay('add')}>Add</button>                 
            </div>
            }            
            {window.screen.width < 600 && mobileDisplay === 'map' &&
            <div className='h-full'>                     
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
                    <button onClick={centerMapUserLocation} className='px-2 py-1 font-bold bg-darkblue text-white sm:hover:border-2 sm:hover:border-lightblue border-2 border-darkblue rounded text-base absolute top-3 right-16 flex flex-row gap-1 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    My City</button>          
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
                                {!addFormVisible && <button onClick={handleFormVisible} className='btn-info-window'>Review This Place</button>}
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
                                <p className='text-sm text-darkblue pb-1'>{cityState(activeMarker.address)}</p>
                                <button className='btn-info-window' onClick={() => openModal(activeMarker.id)}>View Details</button>
                            </div>
                        </InfoWindow>
                    }                        
                </Map>                
                <MapHandler place={selectedPlace} marker={marker} />                    
            </div>
            }
            {window.screen.width < 600 && mobileDisplay === 'list' &&
            <div className='flex flex-col gap-4 overflow-y-auto bg-darkblue sm:col-span-3'>
                <div className='py-1 bg-lightblue sticky top-0 z-10 flex flex-col items-center'>
                    <div className='flex flex-row gap-2 items-center text-sm'>
                        <label htmlFor="filter" className='text-darkblue' >Filter:</label>
                        <select name='filter' id='filter' value={filter} onChange={e => setFilter(e.target.value)} className='bg-darkblue rounded'>
                            <option value="All Places">All Places</option>
                            <option value="My Places">My Places</option>
                            <option value="My Favorites">My Favorites</option>
                        </select>
                    </div>                     
                </div>                
                {filter === 'All Places' &&
                    <PlaceCardList 
                    places={places}
                    openModal={openModal}
                    type={'allPlaces'}
                    />
                }
                {filter === 'My Places' && isLoggedIn &&
                    <PlaceCardList 
                    places={places}
                    openModal={openModal}
                    userId={userId}
                    type={'myPlaces'}
                    />
                }
                {filter === 'My Places' && !isLoggedIn &&
                    <p className='text-center text-lg'>Please login to see your places</p>
                }
                {filter === 'My Favorites' && isLoggedIn &&
                    <PlaceCardList 
                    places={places}
                    openModal={openModal}
                    userId={userId}
                    type={'myFavorites'}
                    />
                }
                {filter === 'My Favorites' && !isLoggedIn &&
                    <p className='text-center text-lg'>Please login to see your favorite places</p>
                }
            </div> 
            }
            {window.screen.width < 600 && mobileDisplay === 'add' &&
            <div className='flex flex-col gap-4 overflow-y-auto bg-darkblue sm:col-span-3'>
                {!addFormVisible && isLoggedIn &&
                    <>
                    <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
                    {selectedPlace &&
                        <div className='bg-accentblue m-2 p-2 rounded shadow-sm shadow-gray-800'>      
                            <p className='text-lg font-bold mb-2'>{selectedPlace.name}</p>       
                            <p className='text-sm'>{selectedPlace.formatted_address}</p>                           
                            <button className="rounded text-darkblue text-sm bg-lightblue font-bold w-full my-2 shadow border-2 border-lightblue hover:border-2 hover:border-darkblue" onClick={handleFormVisible} >Review This Place</button>
                      </div>
                    }</>
                }
                {addFormVisible && isLoggedIn &&
                    <NewPlace                        
                    name={selectedPlace.name}
                    address={selectedPlace.formatted_address}
                    coords={selectedPlace.geometry.location}
                    handleSubmit={addNewPlace}
                    handleFormVisible={handleFormVisible}
                    userId={userId}
                    />
                }
                {!isLoggedIn &&
                    <p className='text-center text-lg'>Please login to add new places</p>
                }
            </div>
            }
            {window.screen.width > 600 &&
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
                    <button onClick={centerMapUserLocation} className='px-2 py-1 font-bold bg-darkblue text-white hover:border-2 hover:border-lightblue border-2 border-darkblue rounded text-base absolute top-3 right-16 flex flex-row gap-1 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                    </svg>
                    My City</button>          
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
                                {!addFormVisible && <button onClick={handleFormVisible} className='btn-info-window'>Review This Place</button>}
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
                                <p className='text-sm text-darkblue pb-1'>{cityState(activeMarker.address)}</p>
                                <button className='btn-info-window' onClick={() => openModal(activeMarker.id)}>View Details</button>
                            </div>
                        </InfoWindow>
                    }                        
                </Map>                
                <MapHandler place={selectedPlace} marker={marker} />                    
            </div>
            }
            {window.screen.width > 600 &&
            <div className=' flex flex-col gap-4 sm:col-span-3 sm:overflow-y-auto bg-darkblue'>
            <div className='flex flex-row justify-around py-2 px-1 bg-lightblue sm:sticky sm:top-0 z-10'>
                <button className={`btn-map-nav ${filter === 'All Places' ? 'btn-map-nav-selected' : ''}`} onClick={() => setFilter('All Places')}>All Places</button>
                <button className={`btn-map-nav ${filter === 'My Places' ? 'btn-map-nav-selected' : ''}`} onClick={() => setFilter('My Places')}>My Places</button> 
                <button className={`btn-map-nav ${filter === 'add' ? 'btn-map-nav-selected' : ''}`} onClick={() => setFilter('add')}>Add New Place</button>                        
            </div>
            {filter === 'add' && !addFormVisible && isLoggedIn &&
                <PlaceAutocomplete onPlaceSelect={setSelectedPlace} />
            }
            {filter === 'add' && addFormVisible && isLoggedIn &&
                <NewPlace                        
                name={selectedPlace.name}
                address={selectedPlace.formatted_address}
                coords={selectedPlace.geometry.location}
                handleSubmit={addNewPlace}
                handleFormVisible={handleFormVisible}
                userId={userId}
                />
            }
            {filter === 'add' && !isLoggedIn &&
                <p className='text-center text-lg'>Please login to add new places</p>
            }
            {filter === 'All Places' &&
                <PlaceCardList 
                places={places}
                openModal={openModal}
                type={'allPlaces'}
                />
            }
            {filter === 'My Places' && isLoggedIn &&
                <PlaceCardList 
                places={places}
                openModal={openModal}
                userId={userId}
                type={'myPlaces'}
                />
            }
            {filter === 'My Places' && !isLoggedIn &&
                <p className='text-center text-lg'>Please login to see your places</p>
            }
            {filter === 'My Favorites' && isLoggedIn &&
                <PlaceCardList 
                places={places}
                openModal={openModal}
                userId={userId}
                type={'myFavorites'}
                />
            }
            {filter === 'My Favorites' && !isLoggedIn &&
                <p className='text-center text-lg'>Please login to see your favorite places</p>
            }
            </div>
            }             
        </div>   
        {activeId && <DetailView 
        ref={modalTarget} 
        closeModal={closeModal} 
        place={places[findIndex(activeId)]}
        isLoggedIn={isLoggedIn}
        deletePlace={deletePlace}
        userId={userId}
        resetPlaceId={resetActiveId}
        updatePlace={updatePlace}
        />}                        
        </APIProvider>    
    )
}
