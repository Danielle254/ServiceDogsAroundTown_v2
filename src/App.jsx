import './App.css'
import DisplayMap from './components/DisplayMap'
import Banner from './components/Banner'
import NewPlace from './components/NewPlace'
import { useState } from 'react'


function App() {
  const [openNewPlace, setOpenNewPlace] = useState(true);
  

  return (
    <div className=''>
      <div className='max-w-[1200px] mx-auto' >
        <Banner />
        <DisplayMap 
        openNewPlaceModal={() => setOpenNewPlace(true)}
        />
        <NewPlace 
        openNewPlace={openNewPlace}
        closeNewPlace={() => setOpenNewPlace(false)}
        />
      </div>
    </div>
  )
}

export default App
