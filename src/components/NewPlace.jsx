import React, { useEffect, useRef, useState } from 'react'

export default function NewPlace(props) {
    const ref = useRef();

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
        >
            <h2>Add New Place</h2>
            <form>
            <label htmlFor='date'></label>
            <input
            required
            id='date'
            type='date'
            />
            </form>
        </dialog>
        )
}