import React, { useState } from 'react'
import ReactStars from 'react-rating-stars-component'

export default function NewPlace(props) {
    
    const [placeToAdd, setPlaceToAdd] = useState({});

    return (
        <div className='bg-blue-950 rounded'>
            <h2 className='text-lg text-center py-1'>Add New Place</h2>
            <h3 className='px-1'>{props.name}</h3>
            <form className='p-1'>
                <label htmlFor='visit-date'>Date Visited</label>
                <input
                required
                id='visit-date'
                type='date'
                />
                <fieldset>
                    <legend>Were you Denied Access?</legend>
                    <label htmlFor='access-issue-yes'>Yes</label>
                    <input
                    type='radio'
                    id='access-issue-yes'
                    />
                    <label for='access-issue-no'>No</label>
                    <input
                    type='radio'
                    id='access-issue-no'
                    />
                </fieldset>
                <label htmlFor='access-issue-detail'>Please describe the issue and the outcome:</label>
                <br/>
                <textarea 
                id='access-issue-detail'
                className='w-full'
                ></textarea>
                <fieldset>
                    <legend>Were there Safety Issues that affected your Service Dog?</legend>
                    <label htmlFor='safety-issue-yes'>Yes</label>
                    <input
                    type='radio'
                    id='safety-issue-yes'
                    />
                    <label htmlFor='safety-issue-no'>No</label>
                    <input
                    type='radio'
                    id='safety-issue-no'
                    />
                </fieldset>
                <label htmlFor='safety-issue-detail'>Please describe the safety issues:</label>
                <br/>
                <textarea 
                id='safety-issue-detail'
                className='w-full'
                ></textarea>
                <label>Rate the Staff</label>
                <ReactStars
                count={5}
                size={20}
                isHalf={false}
                />
                <label title='was there sufficient room for your Service Dog to be out of the way of traffic?'>Rate the Space Ⓘ</label>
                <ReactStars
                count={5}
                size={20}
                isHalf={false}
                />
                <label title='what was the condition of the floor?'>Rate the Floor Ⓘ</label>
                <ReactStars
                count={5}
                size={20}
                isHalf={false}
                />
                <label htmlFor='public-note'>Notes for Other Visitors</label>
                <br/>
                <textarea 
                id='public-note'
                className='w-full'
                ></textarea>
            </form>
        </div>
        )
}