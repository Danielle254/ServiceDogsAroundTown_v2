import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import {Outlet, RouterProvider, createBrowserRouter} from 'react-router-dom';
import {onSnapshot, addDoc} from 'firebase/firestore'
import { entriesCollection, auth } from './firebase.js'
import App from './App.jsx';
import About from './pages/About.jsx';
import Login from './pages/Login.jsx';
import Nav from './components/Nav.jsx';
import Error from './pages/Error.jsx';
import './index.css';

const Layout = () => {
  const [places, setPlaces] = useState([]);
  const [addFormVisible, setAddFormVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async(result) => {
      if (result.user) {
        setIsLoggedIn(true);
        window.location.href = '/';
      }
    })
  }

  async function checkIsLoggedIn() {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setIsLoggedIn(true);
      }
    })
  }

  useEffect(() => {
    checkIsLoggedIn();
  }, []);

  async function handleLogout() {
    await auth.signOut();    
    setIsLoggedIn(false);
  }

  return (
    <div className='h-screen flex flex-col bg-darkblue text-white'>
      <Nav 
      isLoggedIn={isLoggedIn}
      />
      <Outlet 
      context={[places, addNewPlace, addFormVisible, handleFormVisible, isLoggedIn, googleLogin, handleLogout]}
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
      },
      {
        path: '*',
        element: <Error />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
