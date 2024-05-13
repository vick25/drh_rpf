import { fetchGeoJsonData } from '@/lib/data';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/dashboard/maps/maps'), {
    ssr: false
})

const MapsPage = async () => {
    const geojsonData = await fetchGeoJsonData();

    return (
        <>
            <MapComponent geojsonData={geojsonData} />
        </>
    )
}

export default MapsPage;