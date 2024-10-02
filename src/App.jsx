import './App.css'
import DisplayMap from './components/DisplayMap'
import Banner from './components/Banner'
import NewPlace from './components/NewPlace'


function App() {

  

  return (
    <div className=''>
      <div className='max-w-[1200px] mx-auto' >
        <Banner />
        <DisplayMap 
        />
        <NewPlace />
      </div>
    </div>
  )
}

export default App
