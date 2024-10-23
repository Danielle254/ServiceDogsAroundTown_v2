import React, { useState, useEffect } from 'react'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer';
import MapPage from './components/MapPage/MapPage';
import AboutPage from './components/AboutPage/AboutPage'
import {onSnapshot, addDoc } from 'firebase/firestore'
import { entriesCollection} from './firebase.js'


function App() {
  const [page, setPage] = useState('map');
  const [places, setPlaces] = useState([]);
  const [addFormVisible, setAddFormVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(entriesCollection, function(snapshot) {
      const entriesArr = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }))
      setPlaces(entriesArr);
    })
    return unsubscribe
  }, []);
  
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

  async function addNewPlace(e, place) {
    e.preventDefault();
    const docRef = await addDoc(entriesCollection, place);
    setAddFormVisible(false);
  }

  return (
    <div className='h-screen flex flex-col bg-darkblue text-white'>
      <Nav 
      page={page}
      togglePage={togglePage}
      />
      <MapPage 
      page={page}
      places={places}
      handleFormSubmit={addNewPlace}
      addFormVisible={addFormVisible}
      handleFormVisible={handleFormVisible}
      />
      <AboutPage
      page={page}
      />        
      <Footer />
    </div>
  )
}

export default App
