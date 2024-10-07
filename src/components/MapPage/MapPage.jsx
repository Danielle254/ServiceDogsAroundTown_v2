import { React, useState } from 'react'
import MapComponent from './MapComponent'
import Sidebar from './Sidebar'


export default function MapPage(props) {

    const [selectedPlace, setSelectedPlace] = useState(null);
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

    if (props.page === 'map') {
        return (
            <div className='grid grid-cols-8 grow'>
                <MapComponent 
                selectedPlace={selectedPlace}
                position={position}
                zoom={zoom}
                />
                <Sidebar 
                selectedPlace={selectedPlace}
                centerMapUserLocation={centerMapUserLocation}
                setSelectedPlace={setSelectedPlace}
                />
            </div>
        )
    }
}
