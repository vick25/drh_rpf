import React from 'react'
// import MapComponent from '../../../components/dashboard/maps/maps';
import dynamic from 'next/dynamic';
import { fetchGeoJsonData } from '../../../lib/data';

const MapComponent = dynamic(() => import('@/components/dashboard/maps/maps'), {
    ssr: false
})

const MapsPage = async () => {
    const geojsonData = await fetchGeoJsonData();


    return (
        <div>
            <MapComponent geojsonData={geojsonData} />
        </div>
    )
}

export default MapsPage;