import './App.css'
import DisplayMap from './components/DisplayMap'
import Banner from './components/Banner'


function App() {

  

  return (
    <div className=''>
      <div className='max-w-[1200px] mx-auto' >
        <Banner />
        <DisplayMap 
        />
      </div>
    </div>
  )
}

export default App
