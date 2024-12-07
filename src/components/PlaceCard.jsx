import React from "react";
import formatDate from '../utilities/formatDate'

export default function PlaceCard({place, openModal}) {

  return (
    <div className='bg-accentblue p-2 rounded shadow-sm shadow-gray-800'>      
      <p className='text-lg font-bold mb-2'>{place.name}</p>       
      <p className='text-sm'>{place.address}</p>
      <p className='text-sm  text-gray-400 my-1'>Last Visited: {formatDate(place.dateVisited)}</p> 
      <div className="flex flex-row gap-x-2 flex-wrap">     
        {place.deniedAccess === 'true' &&
        <div className='text-sm px-2 my-1 rounded-full text-red-950 border-red-950 border-2 bg-red-100 flex flex-row items-center '>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <p className="text-nowrap">Denied Access</p>
        </div>
        }
        {place.safetyIssues === 'true' &&
        <div className='text-sm my-1 rounded-full px-2 bg-yellow-100 flex flex-row border-2 border-yellow-950 text-yellow-950 items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p className="text-nowrap">Safety Issues</p>
        </div>}
      </div>
      <button className="rounded text-darkblue text-sm bg-lightblue font-bold w-full my-2 shadow border-2 border-lightblue hover:border-2 hover:border-darkblue" onClick={() => openModal(place.id)}>View Details</button>
    </div>
  )
}
