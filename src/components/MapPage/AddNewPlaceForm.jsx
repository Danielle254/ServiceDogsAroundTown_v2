import React, { useState } from 'react'

export default function NewPlace() {
    
    const [placeToAdd, setPlaceToAdd] = useState({});

    return (
        <div className=''>
            <h2>Add New Place</h2>
            <form>
                <label htmlFor='date'>Date Visited</label>
                <input
                required
                id='date'
                type='date'
                />
            </form>
        </div>
        )
}