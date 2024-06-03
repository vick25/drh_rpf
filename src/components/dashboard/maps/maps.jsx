'use client';

import React, { useContext, useEffect, useRef, useState } from "react";
import { CircleMarker, LayersControl, MapContainer, Popup, TileLayer, Tooltip, useMapEvents, GeoJSON } from "react-leaflet";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";
// import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import "leaflet/dist/leaflet.css";
import "@changey/react-leaflet-markercluster/dist/styles.min.css";
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import "leaflet-control-geocoder";
import Leaflet from "leaflet";
import Link from "next/link";
import styles from "./maps.module.css";
import { kmlString } from "@/lib/kml";
import { features } from "@/app/data/provinces_rdc.json"
import { FormsContext } from "@/contexts/formsContext";
// import { popup } from "leaflet";

// Leaflet.Icon.Default.mergeOptions({
//     iconRetinaUrl: markerRetina,
//     iconUrl: markerIcon,
//     shadowUrl: markerShadow
// });

const MapComponent = ({ geojsonData }) => {
    const { state: { selectedForm } } = useContext(FormsContext);
    console.log(selectedForm);

    const map_container_ref = useRef(null);
    const popupRef = useRef(null);
    const { BaseLayer } = LayersControl;

    const [provinces, setProvinces] = useState([]);

    const zoom = 5;
    const containerStyle = {
        width: "100%",
        height: "100dvh"
    }
    const center = {
        lat: -3.626137,
        lng: 22.821603
    }

    const [markers, setMarkers] = useState(geojsonData);
    const [markerData, setMarkerData] = useState([]);

    const mapClicked = async (event) => {
        console.log(event.latlng.lat, event.latlng.lng)
    }

    const markerClicked = (feature, index) => {
        console.log(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
    }

    const markerDragEnd = (event, index) => {
        console.log(event.lat, event.lng)
    }

    const getAddress = (lat, lng) => {
        const geocoder = Leaflet.Control.Geocoder.nominatim();
        return new Promise((resolve, reject) => {
            geocoder.reverse(
                { lat, lng },
                zoom,
                results => results.length ? resolve(results[0].name) : reject(null)
            );
        })
    }

    useEffect(() => {
        if (markerData)
            if (markerData.coordinates && typeof markerData.coordinates[0] !== 'undefined') {
                flyToMarker(markerData.coordinates, 11);
            }
    }, [markerData]);

    useEffect(() => {
        setProvinces(features);
    }, []);

    const MapContent = ({ onClick }) => {
        const map = useMapEvents({
            click: event => onClick(event)
        })
        return null;
    }

    const flyToMarker = (coordinates, zoom) => {
        if (coordinates && typeof coordinates[0] !== 'undefined') {
            map.flyTo(coordinates, zoom, {
                animate: true,
                duration: 1.5
            });
        }
    };

    const handleMouseover = (e) => {
        console.log(popupRef)
        console.log('mouse over: ', e);
        e.target.openPopup();
        if (popupRef.current) {
            popupRef.current.openPopup();
        }
    };

    const handleMouseout = (e) => {
        e.target.closePopup();
        if (popupRef.current) {
            popupRef.current.closePopup();
        }
    };

    const CircleMarkerContent = (props) => {
        const { position, onMarkerClick, id, title } = props;
        //color="transparent" fillColor="red" stroke="black"
        // console.log(title);

        const kmlContent = kmlString(position[0], position[1], title);

        return <CircleMarker center={position} radius={10} fillColor={"rgb(255,0,195)"} color={"#000"}
            opacity={1} fillOpacity={1} eventHandlers={{
                click: event => onMarkerClick(event)
            }}>
            <Popup className={styles.customPopup} ref={popupRef}>
                <b>{position[0]}, {position[1]}</b>
                <br /><br />
                <a href={`data:application/vnd.google-earth.kml;base64,${btoa(kmlContent)}`} download={`${title.replaceAll(' ', '_')}.kml`} title="Open Google Earth Pro">
                    Download Point KML
                </a>
                <br /><br />
                {<Link href={`/dashboard/forms/${id}`}>Afficher informations...</Link>}
            </Popup>

            <Tooltip>{title}</Tooltip>
        </CircleMarker>
    };

    const onEachFeature = (province, layer) => {
        // console.log(province);
        let popupContent = province.properties.nom;
        if (province.properties) {
            if (selectedForm) {
                const count = selectedForm.reduce((acc, obj) => {
                    if (obj['group_hs1kr38/province'] === popupContent) {
                        return acc + 1;
                    }
                    return acc;
                }, 0);
                popupContent += ` ${count}`;
            }
            // layer.options.fillColor = "red";
            layer.bindPopup(`${popupContent}`); // Customize the popup content as needed
        }
        // layer.on({
        //     mouseover: onMouseOver,
        //     mouseout: onMouseOut,
        //     click: zoomToFeature
        // });
    };

    // const geojsonMarkerOptions = {
    //     radius: 10,
    //     fillColor: "rgb(255,0,195)",
    //     color: "#000",
    //     weight: 0,
    //     opacity: 1,
    //     fillOpacity: 1,
    // };

    // const pointToLayer = (feature, latlng) => {
    //     return L.circleMarker(latlng, geojsonMarkerOptions);
    // }

    // const MarkerContent = (props) => {
    //     const markerRef = useRef();
    //     const { position, draggable, onMarkerClick, onDragEnd } = props;

    //     return <Marker
    //         position={position}
    //         draggable={draggable}
    //         eventHandlers={{
    //             click: event => onMarkerClick(event),
    //             dragend: () => onDragEnd(markerRef.current.getLatLng())
    //         }}
    //         ref={markerRef}
    //     >
    //         <Popup>
    //             <b>{position.lat}, {position.lng}</b>
    //         </Popup>
    //     </Marker>
    // }

    const provincesStyle = {
        fillColor: '#FFFFFF',
        weight: 1,
        color: '#000',
        fillOpacity: 0.7
    };

    return (
        <MapContainer
            ref={map_container_ref}
            style={containerStyle}
            center={center}
            zoom={zoom}
            maxZoom={18}
            scrollWheelZoom={true}
        >
            <LayersControl>
                <BaseLayer checked name="ArcGIS World">
                    <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution='Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
                    />
                </BaseLayer>
                <BaseLayer name="OpenStreetMap">
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                </BaseLayer>
                <BaseLayer name="Open Topography">
                    <TileLayer
                        url="http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                        attribution='Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                        maxNativeZoom={17}
                    />
                </BaseLayer>
            </LayersControl>

            <MapContent
                onClick={mapClicked}
            />

            <GeoJSON style={provincesStyle} data={provinces} onEachFeature={onEachFeature} />

            <MarkerClusterGroup chunkedLoading>
                {geojsonData.features.map((feature, index) => (
                    <CircleMarkerContent
                        key={index}
                        id={feature.properties['unique_id']}
                        position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                        title={feature.properties['group_io1lf88/structure_execution']}
                        // onEachFeature={event => onEachFeature(feature, index)}
                        onMarkerClick={event => markerClicked(feature, index)}
                    />
                ))}
            </MarkerClusterGroup>
        </MapContainer>
    );
}; {/* 
mouseover: (e) => handleMouseover(e), mouseout: (e) => handleMouseout(e) 
<MarkerContent
                    key={index}
                    position={marker.position}
                    draggable={marker.draggable}
                    onMarkerClick={event => markerClicked(marker, index)}
                    onDragEnd={event => markerDragEnd(event, index)}
                /> */}

export default MapComponent;