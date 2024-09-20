import './App.css'
import { APIProvider, Map } from '@vis.gl/react-google-maps'

const apiKey = import.meta.env.VITE_MAPS_API_KEY;
const mapId = import.meta.env.VITE_MAPS_ID;

function App() {

  const position = { lat: 46.869018, lng: -114.026812};

  return (
    <APIProvider apiKey={apiKey}>
      <div style={{height: "100vh"}}>
        <Map zoom={9} center={position} mapId={mapId}>
        </Map>

      </div>
      
    </APIProvider>
  )
}

export default App
