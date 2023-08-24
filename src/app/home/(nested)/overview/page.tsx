"use client"

import './sentiment.css'

const Overview = () => {
    
    return (
    <div className=''>
        <div>
            This is an overview of your performance across all connected social medias
        </div>
        <div className='flex justify-center mt-3'>
            <button className='w-full py-3 px-5 rounded-md text-white font-bold'>
                Show me around
            </button>
        </div>
    </div>
    )
}

export default Overview;