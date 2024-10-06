import { useState } from 'react'
import './App.css'
import DisplayMap from './components/DisplayMap'
import Nav from './components/Nav'


function App() {

  const [page, setPage] = useState('map');
  

  return (
    <div className=''>
      <div className='mx-10 my-4' >
        <Nav 
        page={page}
        />
        <DisplayMap 
        page={page}
        />
      </div>
    </div>
  )
}

export default App
