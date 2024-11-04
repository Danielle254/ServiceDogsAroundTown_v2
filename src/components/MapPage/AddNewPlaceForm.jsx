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
        <div className='px-2'>
            <h2 className='text-lg text-center py-1'>Add New Place</h2>
            <h3 className='px-1'>{name}</h3>
            <h3 className='px-1'>{address}</h3>
            <form className='p-1' onSubmit={(e) => {
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
                <div className='flex flex-row justify-between'>
                    <label htmlFor='visit-date'>Date Visited</label>
                    <input
                    required
                    id='visit-date'
                    type='date'
                    value={newPlaceData.dateVisited}
                    name='dateVisited'
                    onChange={handleFormChange}
                    className='text-black rounded'
                    max={today}
                    />
                </div>
                <fieldset>
                    <legend>Were you Denied Access?</legend>
                    <label htmlFor='access-issue-yes' className='pr-2'>Yes</label>
                    <input
                    type='radio'
                    id='access-issue-yes'
                    name='deniedAccess'
                    value={'true'}
                    onChange={handleFormChange}
                    checked={newPlaceData.deniedAccess === 'true'}
                    required
                    className='mr-6'
                    />
                    <label htmlFor='access-issue-no' className='pr-2'>No</label>
                    <input
                    type='radio'
                    id='access-issue-no'
                    value={'false'}
                    name='deniedAccess'
                    onChange={handleFormChange}
                    checked={newPlaceData.deniedAccess === 'false'}
                    />
                </fieldset>
                {newPlaceData.deniedAccess === 'true' && 
                <>
                <label htmlFor='access-issue-detail'>Please describe the issue and the outcome:</label>
                <br/>                
                <textarea 
                id='access-issue-detail'
                className='w-full text-black rounded'
                value={newPlaceData.deniedAccessDetails}
                name='deniedAccessDetails'
                onChange={handleFormChange}
                maxLength={1000}
                ></textarea></>}
                <fieldset>
                    <legend>Were there Safety Issues that affected your Service Dog?</legend>
                    <label htmlFor='safety-issue-yes' className='pr-2'>Yes</label>
                    <input
                    type='radio'
                    id='safety-issue-yes'                     
                    value={'true'}
                    name='safetyIssues'
                    onChange={handleFormChange}
                    checked={newPlaceData.safetyIssues === 'true'}
                    className='mr-6'
                    required
                    />
                    <label htmlFor='safety-issue-no' className='pr-2'>No</label>
                    <input
                    type='radio'
                    id='safety-issue-no'                     
                    value={'false'}    
                    name='safetyIssues' 
                    onChange={handleFormChange}             
                    checked={newPlaceData.safetyIssues === 'false'}
                    />
                </fieldset>
                {newPlaceData.safetyIssues === 'true' && <>
                <label htmlFor='safety-issue-detail'>Please describe the safety issues:</label>
                <br/>
                <textarea 
                id='safety-issue-detail'
                className='w-full text-black rounded'
                value={newPlaceData.safetyIssuesDetails}
                name='safetyIssuesDetails'
                onChange={handleFormChange}
                maxLength={1000}
                ></textarea></>}
                <div className='flex flex-row justify-between'>
                    <label>Rate the Staff</label>
                    <ReactStars
                    count={5}
                    size={24}
                    isHalf={false}
                    activeColor={'#24ACDD'}
                    a11y={true}
                    value={newPlaceData.rateStaff}
                    onChange={updateStaffRating}
                    />
                </div>
                <div className='flex flex-row justify-between'>
                    <label title='was there sufficient room for your Service Dog to be out of the way of traffic?'>Rate the Space Ⓘ</label>
                    <ReactStars
                    count={5}
                    size={24}
                    isHalf={false}
                    activeColor={'#24ACDD'}
                    a11y={true}
                    value={newPlaceData.rateSpace}
                    onChange={updateSpaceRating}
                    />
                </div>
                <div className='flex flex-row justify-between'>
                    <label title='what was the condition of the floor?'>Rate the Floor Ⓘ</label>
                    <ReactStars
                    count={5}
                    size={24}
                    isHalf={false}
                    activeColor={'#24ACDD'}
                    a11y={true}
                    value={newPlaceData.rateFloor}
                    onChange={updateFloorRating}
                    />
                </div>
                <label htmlFor='public-note'>Note for Other Visitors:</label>
                <br/>
                <textarea 
                id='public-note'
                className='w-full text-black rounded'
                value={newPlaceData.publicNote}
                name='publicNote'
                onChange={handleFormChange}
                maxLength={1200}
                required
                ></textarea>
                <input 
                type='submit'
                className='text-center bg-lightblue text-darkblue hover:bg-lightgreen font-bold rounded cursor-pointer w-full mb-2'
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
                }} className='text-center font-bold border-2 border-white rounded w-full hover:bg-white hover:text-darkblue'>Cancel</button>
            </form>
        </div>
        )
}