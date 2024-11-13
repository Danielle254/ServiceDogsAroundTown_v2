import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import {onSnapshot, addDoc } from 'firebase/firestore'
import { entriesCollection} from './firebase.js'
import App from './App.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Nav from './components/Nav.jsx';
import ScrollToTop from './Components/ScrollToTop.jsx';
import './index.css';

const Layout = () => {
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
    <div>
      <ScrollToTop />
      <Nav />
      <Outlet 
      context={[places, addNewPlace, addFormVisible, handleFormVisible]}
      />
    </div>
  )
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <App />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/login',
        element: <Login />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
