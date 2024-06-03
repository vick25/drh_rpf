import React from 'react';
import Statistics from '@/components/dashboard/chart/statistics';

const ReportsPages = () => {
    return (
        <div className='flex flex-col items-center justify-center text-center'>
            <svg className="text-yellow-500 mt-6 w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m0-4h.01M12 8v4m0 4h.01m0 4h-4v-4h4v4z"></path>
            </svg>
            <h1 className='text-4xl font-bold text-gray-500'>Page en construction...</h1>
            <p className="text-xl text-gray-600 mt-4">We&apos;re working hard to bring you a better experience. Stay tuned!</p>
            {/* <Statistics /> */}
        </div>
    )
}

export default ReportsPages