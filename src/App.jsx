import React from 'react'
import { useOutletContext } from 'react-router-dom';
import MapPage from './pages/MapPage';


function App() {  
  const [places, addNewPlace, addFormVisible, handleFormVisible] = useOutletContext();

  return (
    <div className='h-screen flex flex-col bg-darkblue text-white'>
      <MapPage 
      places={places}
      handleFormSubmit={addNewPlace}
      addFormVisible={addFormVisible}
      handleFormVisible={handleFormVisible}
      />
    </div>
  )
}

export default App
