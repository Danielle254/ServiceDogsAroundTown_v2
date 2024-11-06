import React, {useState} from 'react'
import ReactStars from 'react-rating-stars-component'


export default function PlaceCard({place}) {
  const [showDetail, setShowDetail] = useState(false);
  const visitYear = place.dateVisited.slice(0, 4);
  let visitMonth = place.dateVisited.slice(5, 7);
  if(visitMonth[0] === '0') {visitMonth = visitMonth[1]}  
  let visitDay = place.dateVisited.slice(8);
  if(visitDay[0] === '0') {visitDay = visitDay[1]}
  const formattedDate = `${visitMonth}/${visitDay}/${visitYear}`;

  const slice1 = place.address.indexOf(',');
  const streetAddress = place.address.slice(0, slice1);
  const cityState = place.address.slice(slice1 + 2, place.address.length - 5);

  function publicNoteSummary(str) {
    const maxChars = 100;
    const truncateIndex = str.indexOf(" ", maxChars);
    return truncateIndex === -1 ? str : str.substring(0, truncateIndex) + "...";
  }

  return (
    <div className='bg-accentblue p-2 rounded shadow-sm shadow-gray-800'>  
      <p className='text-base font-bold mb-2'>{place.name}</p>        
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-col gap-1'>
          <p className='text-sm'>{streetAddress}</p>
          <p className='text-sm'>{cityState}</p>   
          <p className='text-sm'>Last Visited: {formattedDate}</p>       
        </div>
        <div>
          <div className='flex flex-row gap-2 items-center min-w-[120px] justify-end'>
            <p className='text-sm'>Staff</p>
            <ReactStars
            count={5}
            value={place.rateStaff}
            size={16}
            activeColor={'#24ACDD'}
            edit={false}
            />
          </div>
          <div className='flex flex-row gap-2 items-center min-w-[120px] justify-end'>
            <p className='text-sm'>Space</p>
            <ReactStars
            count={5}
            value={place.rateSpace}
            size={16}
            activeColor={'#24ACDD'}
            edit={false}
            />
          </div>
          <div className='flex flex-row gap-2 items-center min-w-[120px] justify-end'>
            <p className='text-sm'>Floor</p>
            <ReactStars
            count={5}
            value={place.rateFloor}
            size={16}
            activeColor={'#24ACDD'}
            edit={false}
            />
          </div>
        </div>
      </div>
      {place.deniedAccess === 'true' &&
      <div className='text-sm py-1 my-1 rounded-full w-2/5 flex flex-row  justify-center gap-2 items-center bg-red-950'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
        <p>Denied Access</p>
      </div>
      }
      {showDetail && place.deniedAccess === 'true' && <p className='w-full bg-red-950 text-white border-2 border-red-900 text-sm rounded my- px-1'>{place.deniedAccessDetails}</p>
      }
      {place.safetyIssues === 'true' &&
      <div className='text-sm py-1 my-1 rounded-full w-2/5 bg-yellow-700 flex flex-row justify-center gap-2 items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
        <p>Safety Issues</p>
      </div>
      }
      {showDetail && place.safetyIssues === 'true' && <p className='w-full bg-yellow-700 border-2 border-yellow-600 text-white text-sm rounded my-2 px-1'>{place.safetyIssuesDetails}</p>
      }
      <p className='text-sm italic rounded my-2'>{showDetail ? place.publicNote : publicNoteSummary(place.publicNote)}</p>
      <div onClick={() => setShowDetail(!showDetail)} className='flex flex-row text-sm items-center cursor-pointer justify-self-end pl-2 pr-1 text-lightblue rounded-full'>
        <p>{showDetail ? 'Less' : 'More'}</p>
        {showDetail ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
        </svg>
        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>}
      </div>
    </div>
  )
}
