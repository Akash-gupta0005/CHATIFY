import React from 'react'
import { LoaderIcon } from 'lucide-react'

export const PageLoader = () => {
    return (
        <div className='home flex justify-center items-center'>
            <LoaderIcon className='size-8 animate-spin '/>
        </div>
    )
}
