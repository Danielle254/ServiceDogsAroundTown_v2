import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'

export default function NewPlace(props) {
    
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
        setNewPlaceData({
            ...newPlaceData,
            [name]: value
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
            <form className='p-1'>
                <label htmlFor='visit-date'>Date Visited</label>
                <input
                required
                id='visit-date'
                type='date'
                value={newPlaceData.dateVisited}
                name='dateVisited'
                onChange={handleFormChange}
                />
                <fieldset>
                    <legend>Were you Denied Access?</legend>
                    <label htmlFor='access-issue-yes'>Yes</label>
                    <input
                    type='radio'
                    id='access-issue-yes'
                    value={'access-issue-yes'}
                    checked={newPlaceData.deniedAccess === 'access-issue-yes'}
                    />
                    <label for='access-issue-no'>No</label>
                    <input
                    type='radio'
                    id='access-issue-no'
                    value={'access-issue-no'}
                    checked={newPlaceData.deniedAccess === 'access-issue-no'}
                    />
                </fieldset>
                <label htmlFor='access-issue-detail'>Please describe the issue and the outcome:</label>
                <br/>
                <textarea 
                id='access-issue-detail'
                className='w-full'
                value={newPlaceData.deniedAccessDetails}
                name='deniedAccessDetails'
                onChange={handleFormChange}
                ></textarea>
                <fieldset>
                    <legend>Were there Safety Issues that affected your Service Dog?</legend>
                    <label htmlFor='safety-issue-yes'>Yes</label>
                    <input
                    type='radio'
                    id='safety-issue-yes'
                    value={'safety-issue-yes'}
                    checked={newPlaceData.safetyIssues === 'safety-issue-yes'}
                    />
                    <label htmlFor='safety-issue-no'>No</label>
                    <input
                    type='radio'
                    id='safety-issue-no'
                    value={'safety-issue-no'}
                    checked={newPlaceData.safetyIssues === 'safety-issue-no'}
                    />
                </fieldset>
                <label htmlFor='safety-issue-detail'>Please describe the safety issues:</label>
                <br/>
                <textarea 
                id='safety-issue-detail'
                className='w-full'
                value={newPlaceData.safetyIssuesDetails}
                name='safetyIssuesDetails'
                onChange={handleFormChange}
                ></textarea>
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
                className='w-full'
                value={newPlaceData.publicNote}
                name='publicNote'
                onChange={handleFormChange}
                ></textarea>
                <input 
                type='submit'
                className='text-center border-white border px-4 rounded'
                />
            </form>
        </div>
        )
}