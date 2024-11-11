import React, {forwardRef} from 'react'

const DetailView = forwardRef(({place, closeModal}, ref) => {
    function closeFromEvent(event) {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    }
    return (
        <dialog ref={ref} className='w-1/2 h-1/2 bg-white text-black' onClick={closeFromEvent}>
            <p>{place.name}</p>
            <button onClick={closeModal}>Close</button>
        </dialog>
    );
});

export default DetailView;
