import React, {forwardRef, useState} from 'react'
import ReactStars from 'react-rating-stars-component'
import formatDate from '../../utilities/formatDate'


const DetailView = forwardRef(({place, closeModal}, ref) => {
    const [expandDeniedAccess, setExpandDeniedAccess] = useState(false);
    const [expandSafetyIssues, setExpandSafetyIssues] = useState(false);
    const [expandpublicNote, setExpandPublicNote] = useState(false);

    function closeFromEvent(event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }
    return (
        <dialog ref={ref} className='w-1/2 bg-white text-darkblue rounded shadow p-4 h-4/5 relative' onClick={closeFromEvent}>
            <button onClick={closeModal} className='absolute top-4 right-4 hover:border-[1px] hover:border-darkblue'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
            <p className='text-2xl font-bold mb-4'>{place.name}</p>
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
        </dialog>
    );
});

export default DetailView;
