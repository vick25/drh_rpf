import { fetchGeoJsonData } from '@/lib/data';
import dynamic from 'next/dynamic';

export const metadata = {
    title: 'Maps | DRH Restauration'
};

const MapsPage = async () => {

    const MapComponent = dynamic(() => import('@/components/dashboard/maps/maps'), {
        ssr: false
    })
    const geojsonData = await fetchGeoJsonData();

    return (
        <>
            <MapComponent geojsonData={geojsonData} />
        </>
    )
}

export default MapsPage;