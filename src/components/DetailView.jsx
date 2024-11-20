import React, {forwardRef, useState} from 'react'
import ReactStars from 'react-rating-stars-component'
import formatDate from '../utilities/formatDate'


const DetailView = forwardRef(({place, closeModal, isLoggedIn, deletePlace, userId}, ref) => {
    const [expandDeniedAccess, setExpandDeniedAccess] = useState(false);
    const [expandSafetyIssues, setExpandSafetyIssues] = useState(false);

    function closeFromEvent(event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }
    return (
        <dialog ref={ref} className='w-1/2 bg-white text-darkblue rounded shadow p-4 h-4/5 relative' onClick={closeFromEvent}>
            <button onClick={() => {closeModal(); setExpandDeniedAccess(false); setExpandSafetyIssues(false);}} className='absolute top-4 right-4 hover:border-[1px] hover:border-darkblue'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <div className='flex flex-row gap-2'>
                <p className='text-2xl font-bold mb-4'>{place.name}</p>
                {isLoggedIn && place.author === userId && place.isFavorite === 'true' &&
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#e80e0e" className="size-6 mt-1">
                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
                }
            </div>
            <p className='text-base mb-2'>{place.address}</p>
            <p className='text-base mb-2'>{`Last Visited: ${formatDate(place.dateVisited)}`}</p>
            <div className='flex flex-row gap-2 items-center max-w-48 justify-between font-bold'>
                <p className='text-lg'>Staff</p>
                <ReactStars
                count={5}
                value={place.rateStaff}
                size={28}
                activeColor={'#24ACDD'}
                edit={false}
                />
            </div>
            <div className='flex flex-row gap-2 items-center max-w-48 justify-between font-bold'>
                <p className='text-lg'>Space</p>
                <ReactStars
                count={5}
                value={place.rateSpace}
                size={28}
                activeColor={'#24ACDD'}
                edit={false}
                />
            </div>
            <div className='flex flex-row items-center max-w-48 justify-between font-bold'>
                <p className='text-lg'>Floor</p>
                <ReactStars
                count={5}
                value={place.rateFloor}
                size={28}
                activeColor={'#24ACDD'}
                edit={false}
                />
            </div>
            {place.deniedAccess === "true" &&
            <div>
                <button onClick={() => setExpandDeniedAccess(!expandDeniedAccess)} className='flex flex-row gap-2 border-2 border-red-950 bg-red-100 text-red-950 px-2 py-1 mt-4 rounded-full text-nowrap items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
                </svg>Denied Access 
                    {expandDeniedAccess ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>}
                </button>
                {expandDeniedAccess && <p className='text-base mt-2 border-[1px] border-red-950 p-1 rounded'>{place.deniedAccessDetails}</p>}
            </div>
            }
            {place.safetyIssues === "true" &&
            <div>
                <button onClick={() => setExpandSafetyIssues(!expandSafetyIssues)} className='flex flex-row gap-2 border-2 border-yellow-950 bg-yellow-100 text-yellow-950 px-2 py-1 mt-4 rounded-full text-nowrap items-center'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg>Safety Issues 
                    {expandSafetyIssues ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
                    </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>}
                </button>
                {expandSafetyIssues && <p className='text-base mt-2 border-[1px] border-yellow-950 rounded p-1'>{place.safetyIssuesDetails}</p>}
            </div>
            }
            <div className='mt-4'>
                <p className='text-lg font-bold'>Review:</p>
                <p className='text-base border-[1px] border-darkblue p-1 rounded'>{place.publicNote}</p>
            </div>
            {isLoggedIn && place.author === userId && place.privateNote.length > 1 &&
            <div className='mt-4'>
                <div className='flex flex-row gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 cursor-help"><title>This is only visible to you</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    <p className='text-lg font-bold'>Private/Personal Note:</p>                    
                </div>
                <p className='text-base border-[1px] border-darkblue p-1 rounded'>{place.privateNote}</p>
            </div>
            }
            {isLoggedIn && place.author === userId &&
            <div className='flex flex-row gap-4'>
                <button className='grow text-sm py-1 bg-gray-500 text-darkblue font-bold rounded mt-8' onClick={() => deletePlace(place.id)}>Edit Review</button>
                <button className='grow text-sm py-1 font-bold bg-darkblue text-white rounded mt-8' onClick={() => deletePlace(place.id)}>Delete Review</button>
            </div>
            }
        </dialog>
    );
});

export default DetailView;
