import React from 'react'
import { useOutletContext } from 'react-router-dom';
import MapPage from './pages/MapPage';


function App() {  
  const [places, addNewPlace, deletePlace, updatePlace, addFormVisible, handleFormVisible, isLoggedIn, googleLogin, handleLogout, userId] = useOutletContext();

  return (
    <MapPage 
    places={places}
    handleFormSubmit={addNewPlace}
    addFormVisible={addFormVisible}
    handleFormVisible={handleFormVisible}
    />
  )
}

export default App
