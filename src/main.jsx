import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore'
import { entriesCollection, auth, database } from './firebase.js'
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
  const [userId, setUserId] = useState(null);

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
  
  async function addNewPlace(e, place) {
    e.preventDefault();
    const docRef = await addDoc(entriesCollection, place);
    setAddFormVisible(false);
  }

  async function deletePlace(id) {
    const docRef = doc(database, "entries", id);
    await deleteDoc(docRef);
  }

  async function updatePlace(e, editedPlace) {
    e.preventDefault();
    const docRef = doc(database, "entries", editPlace.id);
    await setDoc(docRef, editedPlace);
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
        setUserId(user.uid);
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

  function handleFormVisible() {
    setAddFormVisible(!addFormVisible);
  }

  return (
    <div className='h-screen flex flex-col bg-darkblue text-white'>
      <Nav 
      isLoggedIn={isLoggedIn}
      />
      <Outlet 
      context={[places, addNewPlace, deletePlace, updatePlace, addFormVisible, handleFormVisible, isLoggedIn, googleLogin, handleLogout, userId]}
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
