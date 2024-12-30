import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'

export default function NewPlace({name, address, coords, handleSubmit, handleFormVisible, userId}) {
    const today = new Date().toJSON().slice(0, 10);
    const [newPlaceData, setNewPlaceData] = useState({
        name: name,
        address: address,
        coords: {
            lat: coords.lat(),
            lng: coords.lng()
        },
        author: userId,
        isFavorite: false,
        dateVisited: '',
        deniedAccess: '',
        deniedAccessDetails: '',
        safetyIssues: '',
        safetyIssuesDetails: '',
        rateStaff: 0,
        rateSpace: 0,
        rateFloor: 0,
        privateNote: '',
        publicNote: ''
    });

    function handleFormChange(e) {
        const {name, value} = e.target;
        setNewPlaceData({
                ...newPlaceData,
                [name]: value
        }
        );
    };

    function toggleFavorite() {
        const favValue = newPlaceData.isFavorite;
        setNewPlaceData({
            ...newPlaceData,
            isFavorite: !favValue
        }
        );
    }

    function updateStaffRating(rating) {
        setNewPlaceData((prevData) => {
            return {
                ...prevData,
                rateStaff: rating
            }
        });
    }

    function updateSpaceRating(rating) {
        setNewPlaceData((prevData) => {
            return {
                ...prevData,
                rateSpace: rating
            }
        });
    }

    function updateFloorRating(rating) {
        setNewPlaceData((prevData) => {
            return {
                ...prevData,
                rateFloor: rating
            }
        });
    }

    return (
        <div className='pb-4 sm:pb-0 px-4'>
            <h3 className='text-xl font-bold'>{name}</h3>
            <h3 className='mb-4'>{address}</h3>
            <form className='flex flex-col gap-6' onSubmit={(e) => {
                handleSubmit(e, newPlaceData);
                setNewPlaceData({
                    name: '',
                    address: '',
                    coords: {},
                    author: '',
                    isFavorite: false,
                    dateVisited: '',
                    deniedAccess: '',
                    deniedAccessDetails: '',
                    safetyIssues: '',
                    safetyIssuesDetails: '',
                    rateStaff: 0,
                    rateSpace: 0,
                    rateFloor: 0,
                    privateNote: '',
                    publicNote: ''
                });
            }}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='favorite' className='text-sm cursor-pointer'>Favorite</label>
                    <input 
                    type='checkbox' 
                    id='favorite' 
                    name='isFavorite'
                    onChange={toggleFavorite}
                    checked={newPlaceData.isFavorite} 
                    className='w-5 h-5 rounded cursor-pointer' />        
                </div>
                <div className='flex flex-col gap-1'>          
                    <label htmlFor='visit-date' className='text-sm'>Date Visited</label>
                    <input
                    required
                    id='visit-date'
                    type='date'
                    value={newPlaceData.dateVisited}
                    name='dateVisited'
                    onChange={handleFormChange}
                    className='text-gray-800 w-1/2 py-2 rounded cursor-pointer'
                    max={today}
                    min='2020-01-01'
                    />
                </div>                
                <fieldset>
                    <legend className='text-sm mb-2'>Were you Denied Access?</legend> 
                    <div className='flex flex-row gap-4'>
                        <div>     
                            <input
                                type='radio'
                                id='access-issue-yes'
                                name='deniedAccess'
                                value={'true'}
                                onChange={handleFormChange}
                                checked={newPlaceData.deniedAccess === 'true'}
                                required
                                className='opacity-0 cursor-pointer h-0 w-0 peer'
                            />         
                            <label htmlFor='access-issue-yes' className='border-2 border-white rounded py-1 px-2 text-center cursor-pointer hover:border-lightblue hover:text-lightblue peer-checked:bg-lightblue peer-checked:text-darkblue peer-checked:font-bold'>Yes</label>            
                        </div>    
                        <div>                            
                            <input
                            type='radio'
                            id='access-issue-no'
                            value={'false'}
                            name='deniedAccess'
                            onChange={handleFormChange}
                            checked={newPlaceData.deniedAccess === 'false'}
                            className='opacity-0 h-0 w-0 cursor-pointer peer'
                            />
                            <label htmlFor='access-issue-no' className='border-2 border-white rounded py-1 px-3 text-center cursor-pointer hover:border-lightblue hover:text-lightblue peer-checked:bg-lightblue peer-checked:text-darkblue peer-checked:font-bold'>No</label> 
                        </div>  
                    </div>                  
                    {newPlaceData.deniedAccess === 'true' && 
                    <div className='mt-2'>
                        <label htmlFor='access-issue-detail' className='text-sm'>Please describe the issue and the outcome:</label>            
                        <textarea 
                        id='access-issue-detail'
                        className='w-full text-black rounded'
                        value={newPlaceData.deniedAccessDetails}
                        name='deniedAccessDetails'
                        onChange={handleFormChange}
                        maxLength={1000}
                        rows={3}
                        ></textarea>
                    </div>}
                </fieldset>                
                <fieldset>
                    <legend className='text-sm mb-2'>Were there Safety Issues that affected your Service Dog?</legend>      
                    <div className='flex flex-row gap-4'>
                        <div>                                                     
                            <input
                            type='radio'
                            id='safety-issue-yes'                     
                            value={'true'}
                            name='safetyIssues'
                            onChange={handleFormChange}
                            checked={newPlaceData.safetyIssues === 'true'}
                            required
                            className='opacity-0 h-0 w-0 cursor-pointer peer'
                            />   
                            <label htmlFor='safety-issue-yes' className='border-2 border-white rounded py-1 px-2 text-center cursor-pointer hover:border-lightblue hover:text-lightblue peer-checked:bg-lightblue peer-checked:text-darkblue peer-checked:font-bold'>Yes</label>                          
                        </div>    
                        <div>                            
                            <input
                                type='radio'
                                id='safety-issue-no'                     
                                value={'false'}    
                                name='safetyIssues' 
                                onChange={handleFormChange}             
                                checked={newPlaceData.safetyIssues === 'false'}
                                className='opacity-0 h-0 w-0 cursor-pointer peer'
                            />
                            <label htmlFor='safety-issue-no' className='border-2 border-white rounded py-1 px-3 text-center cursor-pointer hover:border-lightblue hover:text-lightblue peer-checked:bg-lightblue peer-checked:text-darkblue peer-checked:font-bold'>No</label>
                        </div>
                    </div>                   
                    {newPlaceData.safetyIssues === 'true' && 
                    <div>
                        <label htmlFor='safety-issue-detail' className='text-sm'>Please describe the safety issues:</label>
                        <br/>
                        <textarea 
                        id='safety-issue-detail'
                        className='w-full text-black rounded'
                        value={newPlaceData.safetyIssuesDetails}
                        name='safetyIssuesDetails'
                        onChange={handleFormChange}
                        maxLength={1000}
                        rows={3}
                        ></textarea>
                    </div>}  
                </fieldset>                  
                <div>           
                    <label className='text-sm'>Rate the Staff</label>
                    <ReactStars
                    count={5}
                    size={36}
                    isHalf={false}
                    activeColor={'#24ACDD'}
                    a11y={true}
                    value={newPlaceData.rateStaff}
                    onChange={updateStaffRating}
                    />
                </div> 
                <div>
                    <label title='was there sufficient room for your Service Dog to be out of the way of traffic?' className='text-sm'>Rate the Space Ⓘ</label>
                    <ReactStars
                    count={5}
                    size={36}
                    isHalf={false}
                    activeColor={'#24ACDD'}
                    a11y={true}
                    value={newPlaceData.rateSpace}
                    onChange={updateSpaceRating}
                    />
                </div>
                <div>
                    <label title='what was the condition of the floor?' className='text-sm'>Rate the Floor Ⓘ</label>
                    <ReactStars
                    count={5}
                    size={36}
                    isHalf={false}
                    activeColor={'#24ACDD'}
                    a11y={true}
                    value={newPlaceData.rateFloor}
                    onChange={updateFloorRating}
                    />  
                </div>
                <div>         
                    <label htmlFor='private-note' className='text-sm flex flex-row gap-2 items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 cursor-help" aria-hidden='true'><title>This is only visible to you</title>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                    Private/Personal Note:</label>
                    <textarea 
                    id='private-note'
                    className='w-full text-black rounded'
                    value={newPlaceData.privateNote}
                    name='privateNote'
                    onChange={handleFormChange}
                    maxLength={1200}
                    rows={4}
                    ></textarea>
                </div>     
                <div>         
                    <label htmlFor='public-note' className='text-sm'>Note for Other Visitors:</label>
                    <textarea 
                    id='public-note'
                    className='w-full text-black rounded'
                    value={newPlaceData.publicNote}
                    name='publicNote'
                    onChange={handleFormChange}
                    maxLength={1200}
                    required
                    rows={4}
                    ></textarea>
                </div> 
                <input 
                type='submit'
                className='text-center bg-lightblue text-darkblue font-bold rounded cursor-pointer w-full py-2 hover:shadow-md hover:shadow-gray-700'
                />
                <button onClick={() => {
                    handleFormVisible();
                    setNewPlaceData({
                        name: '',
                        address: '',
                        coords: {},
                        author: '',
                        isFavorite: false,
                        dateVisited: '',
                        deniedAccess: '',
                        deniedAccessDetails: '',
                        safetyIssues: '',
                        safetyIssuesDetails: '',
                        rateStaff: 0,
                        rateSpace: 0,
                        rateFloor: 0,
                        privateNote: '',
                        publicNote: ''
                    });
                }} className='text-center font-bold rounded w-full bg-gray-600 py-2 hover:shadow-md hover:shadow-gray-700'>Cancel</button>
            </form>
        </div>
        )
}