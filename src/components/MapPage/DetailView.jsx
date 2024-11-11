import React, {forwardRef} from 'react'

const DetailView = forwardRef((props, ref) => {
    return (
        <dialog ref={ref} className='w-1/2 h-1/2 bg-white text-black'>
            {props.children}
        </dialog>
    );
});

export default DetailView;
