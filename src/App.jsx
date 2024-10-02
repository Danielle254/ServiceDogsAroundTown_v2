import './App.css'
import DisplayMap from './components/DisplayMap'
import Banner from './components/Banner'
import NewPlace from './components/NewPlace'
import { useState } from 'react'


function App() {
  const [openNewPlace, setOpenNewPlace] = useState(false);
  
  function toggleOpenNewPlace () {
    setOpenNewPlace(!openNewPlace);
  }

  return (
    <div className=''>
      <div className='max-w-[1200px] mx-auto' >
        <Banner />
        <DisplayMap 
        toggleOpenNewPlace={toggleOpenNewPlace}
        />
        <NewPlace 
        openNewPlace={openNewPlace}
        />
      </div>
    </div>
  )
}

export default App
