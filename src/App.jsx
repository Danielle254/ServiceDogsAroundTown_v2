import React from 'react'
import MapPage from './pages/MapPage';


function App() {
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

  function handleFormVisible() {
    setAddFormVisible(!addFormVisible);
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
    </div>
  )
}

export default App
