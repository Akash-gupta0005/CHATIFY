import React from 'react'
import { LoaderIcon } from 'lucide-react'

export const PageLoader = () => {
    return (
        <div className='home d-flex justify-content-center align-items-center' style={{height:"100vh"}}>
            <LoaderIcon className='size-10 animate-spin'/>
        </div>
    )
}
