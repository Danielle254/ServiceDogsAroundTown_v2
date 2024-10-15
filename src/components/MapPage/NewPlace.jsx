import React, { useEffect, useRef, useState } from 'react'

export default function NewPlace(props) {
    const [placeToAdd, setPlaceToAdd] = useState({});
        // name, coords - from google maps
        // date visited, safety issues (bool), safety issues description (text if yes)
        // public note, denied access (bool), denied access description (text if yes)
    const ref = useRef();
    function handleChange (e) {
        let newValue = {}
    }

    useEffect(() => {
        if (props.openNewPlace) {
            ref.current?.showModal();
        } else {
            ref.current?.close();
        }
    }, [props.openNewPlace]);




    return (
        <dialog 
        ref={ref}
        onCancel={props.closeNewPlace}
        className='w-96 h-96'
        >
            <button onClick={props.closeNewPlace}>X</button>
            <h2>Add New Place</h2>
            <form>
                <label htmlFor='date'>Date Visited</label>
                <input
                required
                id='date'
                type='date'
                />
            </form>
        </dialog>
        )
}