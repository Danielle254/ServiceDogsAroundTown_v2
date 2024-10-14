import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer';
import MapPage from './components/MapPage/MapPage';
import AboutPage from './components/AboutPage/AboutPage'


function App() {

  const [page, setPage] = useState('map');
  const [places, setPlaces] = useState([{lat: 46.75868, lng: -114.08766}, {lat: 46.84997, lng: -114.01759}, {lat: 46.89410, lng: -114.04103}]);

  function togglePage (buttonId) {
    if (buttonId === "map") {
      setPage('map')
    }
    if (buttonId === 'about') {
      setPage('about')
    } 
  }
  

  return (
    <div className=''>
      <div className='min-h-screen flex flex-col'>
        <Nav 
        page={page}
        togglePage={togglePage}
        />
        <MapPage 
        page={page}
        places={places}
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
