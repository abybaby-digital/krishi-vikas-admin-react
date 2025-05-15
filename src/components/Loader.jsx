import React from 'react'

const Loader = ({task}) => {
    return (

        <div className="preloader bg-white h-screen fixed z-50 top-0 left-0 w-full flex justify-center items-center">
            <div className="flex flex-col items-center">
                <span className="kv_loader"></span>
            <p className='mt-10 text-black font-semibold'>{task}</p>
            </div>
        </div>

    )
}

export default Loader
