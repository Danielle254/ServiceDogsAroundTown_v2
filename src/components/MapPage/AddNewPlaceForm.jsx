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
            <h3 className='mx-1 text-lg font-bold'>{name}</h3>
            <h3 className='mx-1 mb-4'>{address}</h3>
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
                <label htmlFor='visit-date' className='text-sm'>Date Visited</label>
                <br/>
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
                <fieldset className='mt-4'>
                    <legend className='text-sm'>Were you Denied Access?</legend>
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
                <label htmlFor='access-issue-detail' className='text-sm mt-4'>Please describe the issue and the outcome:</label>
                <br/>                
                <textarea 
                id='access-issue-detail'
                className='w-full text-black rounded'
                value={newPlaceData.deniedAccessDetails}
                name='deniedAccessDetails'
                onChange={handleFormChange}
                maxLength={1000}
                ></textarea></>}
                <fieldset className='mt-4'>
                    <legend className='text-sm'>Were there Safety Issues that affected your Service Dog?</legend>
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
                <label htmlFor='safety-issue-detail' className='text-sm mt-4'>Please describe the safety issues:</label>
                <br/>
                <textarea 
                id='safety-issue-detail'
                className='w-full text-black rounded'
                value={newPlaceData.safetyIssuesDetails}
                name='safetyIssuesDetails'
                onChange={handleFormChange}
                maxLength={1000}
                ></textarea></>}                
                <label className='text-sm'>Rate the Staff</label>
                <ReactStars
                count={5}
                size={30}
                isHalf={false}
                activeColor={'#24ACDD'}
                a11y={true}
                value={newPlaceData.rateStaff}
                onChange={updateStaffRating}
                />
                <label title='was there sufficient room for your Service Dog to be out of the way of traffic?' className='text-sm'>Rate the Space Ⓘ</label>
                <ReactStars
                count={5}
                size={30}
                isHalf={false}
                activeColor={'#24ACDD'}
                a11y={true}
                value={newPlaceData.rateSpace}
                onChange={updateSpaceRating}
                />
                <label title='what was the condition of the floor?' className='text-sm mt-4'>Rate the Floor Ⓘ</label>
                <ReactStars
                count={5}
                size={30}
                isHalf={false}
                activeColor={'#24ACDD'}
                a11y={true}
                value={newPlaceData.rateFloor}
                onChange={updateFloorRating}
                />                
                <label htmlFor='public-note' className='text-sm'>Note for Other Visitors:</label>
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
                className='text-center bg-lightblue text-darkblue hover:bg-lightgreen font-bold rounded cursor-pointer w-full mt-4'
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
                }} className='text-center font-bold border-2 border-white rounded w-full hover:bg-white hover:text-darkblue mt-4'>Cancel</button>
            </form>
        </div>
        )
}