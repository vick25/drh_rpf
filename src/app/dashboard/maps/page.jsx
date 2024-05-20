import { fetchGeoJsonData } from '@/lib/data';
import dynamic from 'next/dynamic'; import { Metadata } from 'next';

export const metadata = {
    title: 'Maps | DRH Restauration',
};

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