import React from 'react'
// import MapComponent from '../../../components/dashboard/maps/maps';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/dashboard/maps/maps'), {
    ssr: false
})

const MapsPage = () => {
    return (
        <div>
            <MapComponent />
        </div>
    )
}

export default MapsPage;