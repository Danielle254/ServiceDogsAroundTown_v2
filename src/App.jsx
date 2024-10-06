import { useState } from 'react'
import './App.css'
import Nav from './components/Nav'
import Footer from './components/Footer';
import MapPage from './components/MapPage/MapPage';
import AboutPage from './components/AboutPage/AboutPage'


function App() {

  const [page, setPage] = useState('map');
  

  return (
    <div className=''>
      <div className='mx-10 my-4'>
        <Nav 
        page={page}
        />
        <MapPage 
        page={page}
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
