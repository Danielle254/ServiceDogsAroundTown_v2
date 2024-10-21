import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'

export default function NewPlace(props) {

    const today = new Date().toJSON().slice(0, 10);
    const [newPlaceData, setNewPlaceData] = useState({
        businessName: props.name,
        location: props.address,
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

    function handleFormChange(e) {
        const {name, value} = e.target;
        setNewPlaceData((prevData) => {
            return {
                ...prevData,
                [name]: value
        }
        })
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
        <div className='bg-blue-950 rounded'>
            <h2 className='text-lg text-center py-1'>Add New Place</h2>
            <h3 className='px-1'>{newPlaceData.businessName}</h3>
            <form className='p-1' onSubmit={(e) => props.handleSubmit(e, newPlaceData)}>
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
                className='text-center border-white border px-4 rounded'
                />
            </form>
        </div>
        )
}