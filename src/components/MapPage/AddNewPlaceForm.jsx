import React, { useState, useEffect } from 'react'
import ReactStars from 'react-rating-stars-component'
import { useMapsLibrary } from '@vis.gl/react-google-maps'

export default function NewPlace({name, address, handleSubmit, handleFormVisible}) {
    const today = new Date().toJSON().slice(0, 10);
    const geo = useMapsLibrary('geocoding');
    const [geocodingService, setGeocodingService] = useState(null);
    const [newPlaceData, setNewPlaceData] = useState({
        name: '',
        coords: {},
        dateVisited: '',
        deniedAccess: '',
        deniedAccessDetails: '',
        safetyIssues: '',
        safetyIssuesDetails: '',
        rateStaff: 0,
        rateSpace: 0,
        rateFloor: 0,
        publicNote: ''
    });

    useEffect(() => {
        if (!geo) return;
        setGeocodingService(new window.google.maps.Geocoder());
    }, [geo]);

    useEffect(() => {
        if (!geocodingService || !address) return;
        geocodingService.geocode({ address }, (results, status) => {
            if (results && status === "OK") {
                setNewPlaceData({
                    ...newPlaceData,
                    coords: {
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng()},
                    name: name
                });
            }
        });
    }, [geocodingService]);

    function handleFormChange(e) {
        const {name, value} = e.target;
        setNewPlaceData({
                ...newPlaceData,
                [name]: value
        }
        );
    };

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
        <div className='px-4'>
            <h3 className='text-lg font-bold'>{name}</h3>
            <h3 className='mb-4'>{address}</h3>
            <form className='flex flex-col gap-6' onSubmit={(e) => {
                handleSubmit(e, newPlaceData);
                setNewPlaceData({
                    name: '',
                    coords: {},
                    dateVisited: '',
                    deniedAccess: '',
                    deniedAccessDetails: '',
                    safetyIssues: '',
                    safetyIssuesDetails: '',
                    rateStaff: 0,
                    rateSpace: 0,
                    rateFloor: 0,
                    publicNote: ''
                });
            }}>
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
                        coords: {},
                        dateVisited: '',
                        deniedAccess: '',
                        deniedAccessDetails: '',
                        safetyIssues: '',
                        safetyIssuesDetails: '',
                        rateStaff: 0,
                        rateSpace: 0,
                        rateFloor: 0,
                        publicNote: ''
                    });
                }} className='text-center font-bold rounded w-full bg-gray-600 py-2 hover:shadow-md hover:shadow-gray-700'>Cancel</button>
            </form>
        </div>
        )
}