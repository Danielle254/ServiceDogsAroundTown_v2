import React, {useEffect} from 'react'
import { useMap } from '@vis.gl/react-google-maps';

export default function MapHandler({place, marker}) {
    const map = useMap();

    useEffect(() => {
        if (!map || !place || !marker) return;
        if (place.geometry?.viewport) {
            map.fitBounds(place.geometry?.viewport);
        }
        marker.position = place.geometry?.location;
    }, [map, place, marker]);
  return (
    null
  )
}
