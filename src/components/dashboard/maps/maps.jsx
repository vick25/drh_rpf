'use client';
import React, { useRef, useState } from "react";
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-control-geocoder";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, CircleMarker } from "react-leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerRetina from "leaflet/dist/images/marker-icon-2x.png";
import styles from "./maps.module.css";
import { useEffect } from "react";
import Link from "next/link";

Leaflet.Icon.Default.mergeOptions({
    iconRetinaUrl: markerRetina,
    iconUrl: markerIcon,
    shadowUrl: markerShadow
});

const MapComponent = () => {

    const zoom = 5;
    const containerStyle = {
        width: "100%",
        height: "600px"
    }
    const center = {
        lat: -3.626137,
        lng: 22.821603
    }
    const initialMarkers = [
        {
            position: {
                lat: -4.625485,
                lng: 15.821091
            },
            draggable: true
        },
        {
            position: {
                lat: -5.625293,
                lng: 23.817926
            },
            draggable: false
        },
        {
            position: {
                lat: -1.625182,
                lng: 20.81464
            },
            draggable: true
        },
        {
            position: {
                lat: -8.625182,
                lng: 25.81464
            },
            draggable: true
        },
    ];

    const [markers, setMarkers] = useState(initialMarkers);
    const [markerData, setMarkerData] = useState([]);

    const mapClicked = async (event) => {
        console.log(event.latlng.lat, event.latlng.lng)
    }

    const markerClicked = (marker, index) => {
        console.log(marker.position.lat, marker.position.lng)
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

    const CircleMarkerContent = (props) => {
        const { position, onMarkerClick } = props;

        return <CircleMarker center={position} radius={10} color="transparent" fillColor="red" stroke="black"
            opacity={1} eventHandlers={{
                click: event => onMarkerClick(event)
            }}>
            <Popup>
                <b>{position.lat}, {position.lng}</b><br />
                <Link href={`/dashboard/forms/`}>Click here</Link>
            </Popup>
        </CircleMarker>
    };

    const MarkerContent = (props) => {
        const markerRef = useRef();
        const { position, draggable, onMarkerClick, onDragEnd } = props;

        return <Marker
            position={position}
            draggable={draggable}
            eventHandlers={{
                click: event => onMarkerClick(event),
                dragend: () => onDragEnd(markerRef.current.getLatLng())
            }}
            ref={markerRef}
        >
            <Popup>
                <b>{position.lat}, {position.lng}</b>
            </Popup>
        </Marker>
    }

    return (
        <MapContainer
            style={containerStyle}
            center={center}
            zoom={zoom}
            scrollWheelZoom={false}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapContent
                onClick={mapClicked}
            />
            {markers.map((marker, index) => (
                <CircleMarkerContent
                    key={index}
                    position={marker.position}
                    onMarkerClick={event => markerClicked(marker, index)}
                />
            ))}
        </MapContainer>
    );
}; {/* <MarkerContent
                    key={index}
                    position={marker.position}
                    draggable={marker.draggable}
                    onMarkerClick={event => markerClicked(marker, index)}
                    onDragEnd={event => markerDragEnd(event, index)}
                /> */}

export default MapComponent;