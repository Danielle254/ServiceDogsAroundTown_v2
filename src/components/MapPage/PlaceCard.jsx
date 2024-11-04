import React from 'react'
import ReactStars from 'react-rating-stars-component'


export default function PlaceCard({place}) {
  const visitYear = place.dateVisited.slice(0, 4);
  let visitMonth = place.dateVisited.slice(5, 7);
  if(visitMonth[0] === '0') {visitMonth = visitMonth[1]}  
  let visitDay = place.dateVisited.slice(8);
  if(visitDay[0] === '0') {visitDay = visitDay[1]}
  const formattedDate = `${visitMonth}/${visitDay}/${visitYear}`;

  const slice1 = place.address.indexOf(',');
  const streetAddress = place.address.slice(0, slice1);
  const cityState = place.address.slice(slice1 + 2, place.address.length - 5);

  return (
    <div className='bg-accentblue p-1 rounded shadow-sm shadow-gray-800 hover:shadow-gray-700'>
      <p className='text-lg font-bold mb-1'>{place.name}</p>
      <div className='flex flex-row justify-between'>
        <div>
          <p className='text-sm'>{streetAddress}</p>
          <p className='text-sm'>{cityState}</p>
          <p className='text-sm'>Last Visited: {formattedDate}</p>
        </div>
        <div>
          <div className='flex flex-row gap-2 justify-self-end'>
            <p className='text-sm'>Staff</p>
            <ReactStars
            count={5}
            value={place.rateStaff}
            size={12}
            activeColor={'#24ACDD'}
            edit={false}
            />
          </div>
          <div className='flex flex-row gap-2 justify-self-end'>
            <p className='text-sm'>Space</p>
            <ReactStars
            count={5}
            value={place.rateSpace}
            size={12}
            activeColor={'#24ACDD'}
            edit={false}
            />
          </div>
          <div className='flex flex-row gap-2 justify-self-end'>
            <p className='text-sm'>Floor</p>
            <ReactStars
            count={5}
            value={place.rateFloor}
            size={12}
            activeColor={'#24ACDD'}
            edit={false}
            />
          </div>
        </div>
      </div>
      <div className='flex flex-row justify-between'>
        {place.deniedAccess === 'true' &&
        <div className='text-sm px-2 py-1 my-1 rounded-full w-2/5 flex flex-row justify-around items-center bg-red-800'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          <p>Denied Access</p>
        </div>
        }
        {place.safetyIssues === 'true' &&
        <div className='text-sm px-2 py-1 my-1 rounded-full w-2/5 bg-yellow-600 text-darkblue font-bold flex flex-row justify-around items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
          <p >Safety Issues</p>
        </div>
        }
      </div>
    </div>
  )
}
