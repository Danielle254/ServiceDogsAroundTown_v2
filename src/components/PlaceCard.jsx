import React from "react";
import formatDate from '../utilities/formatDate'

export default function PlaceCard({place, openModal, myPlacesView}) {

  return (
    <div className='bg-accentblue p-2 rounded shadow-sm shadow-gray-800'> 
      <div className='flex flex-row gap-2'>
        <p className='text-lg font-bold mb-2'>{place.name}</p> 
        {myPlacesView && place.isFavorite &&
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e80e0e" className="size-5 mt-1" role="img"><title>favorite</title>
        <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
        </svg>
        }
      </div>     
            
      <p className='text-sm'>{place.address}</p>
      <p className='text-sm  text-gray-400 my-1'>Last Visited: {formatDate(place.dateVisited)}</p> 
      <div className="flex flex-row gap-x-2 flex-wrap">     
        {place.deniedAccess === 'true' &&
        <div className='text-sm px-2 my-1 rounded-full text-red-950 border-red-950 border-2 bg-red-100 flex flex-row items-center '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4" aria-hidden='true'>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <p className="text-nowrap">Denied Access</p>
        </div>
        }
        {place.safetyIssues === 'true' &&
        <div className='text-sm my-1 rounded-full px-2 bg-yellow-100 flex flex-row border-2 border-yellow-950 text-yellow-950 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4" aria-hidden='true'>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p className="text-nowrap">Safety Issues</p>
        </div>}
      </div>
      <button className="rounded text-darkblue text-sm bg-lightblue font-bold w-full my-2 shadow border-2 border-lightblue hover:border-2 hover:border-darkblue" onClick={() => openModal(place.id)}>View Details</button>
    </div>
  )
}
