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
      <p>{place.name}</p>
      <p>{streetAddress}</p>
      <p>{cityState}</p>
      <p>Last Visited: {formattedDate}</p>
      <p>Staff</p>
      <ReactStars
      count={5}
      value={place.rateStaff}
      size={12}
      activeColor={'#24ACDD'}
      edit={false}
      />
      <p>Space</p>
      <ReactStars
      count={5}
      value={place.rateSpace}
      size={12}
      activeColor={'#24ACDD'}
      edit={false}
      />
      <p>Floor</p>
      <ReactStars
      count={5}
      value={place.rateFloor}
      size={12}
      activeColor={'#24ACDD'}
      edit={false}
      />
      {place.deniedAccess === 'true' &&
      <p>Denied Access on {formattedDate}</p>
      }
      {place.safetyIssues === 'true' &&
      <p>Safety Issues</p>
      }
    </div>
  )
}
