import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer';
import MapPage from './components/MapPage/MapPage';
import AboutPage from './components/AboutPage/AboutPage'


function App() {
  const [page, setPage] = useState('map');
  const [places, setPlaces] = useState([
    {coords: {lat: 46.75868, lng: -114.08766}, name: 'Lolo Steakhouse'}, 
    {coords: {lat: 46.84997, lng: -114.01759}, name: "Paul's Pancake Parlour"}, 
    {coords: {lat: 46.89410, lng: -114.04103}, name: 'test'}]);
  const [addFormVisible, setAddFormVisible] = useState(false);
  
    function togglePage (buttonId) {
      if (buttonId === "map") {
        setPage('map')
      }
      if (buttonId === 'about') {
        setPage('about')
      } 
    }

    function handleFormVisible() {
      setAddFormVisible(true);
    }

    function addNewPlace(e, place) {
      e.preventDefault();
      setPlaces([...places, place]);
      setAddFormVisible(false);
    }

  return (
    <div className=''>
      <div className='min-h-screen flex flex-col bg-darkblue text-white'>
        <Nav 
        page={page}
        togglePage={togglePage}
        />
        <MapPage 
        page={page}
        places={places}
        openNewPlaceModal={() => setOpenNewPlace(true)}
        handleFormSubmit={addNewPlace}
        addFormVisible={addFormVisible}
        handleFormVisible={handleFormVisible}
        />
        <AboutPage
        page={page}
        />        
        <Footer />
      </div>
    </div>
  )
}

export default App
