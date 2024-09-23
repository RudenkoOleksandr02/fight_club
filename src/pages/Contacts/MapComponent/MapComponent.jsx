import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import classes from './MapComponent.module.css';
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";
import IcoPin from './../../../assets/images/ico_mapPin.svg';

const containerStyle = {
    width: '100%',
    height: '100%'
};

const center = {
    lat: 50.22881659134103,
    lng: 30.647103613976906
};

const MapComponent = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyAwBqyVQ4sinz1yYh6HQtsl2eaPuG5kKnA',
        language: 'uk'
    });

    const [map, setMap] = useState(null);

    const onLoad = useCallback((map) => {
        map.setCenter(center);
        map.setZoom(16);
        setMap(map);
    }, []);

    const onUnmount = useCallback(() => {
        setMap(null);
    }, []);

    const handleOpenGoogleMaps = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.mapContainer}>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={16}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    >
                        <Marker
                            position={center}
                            icon={{
                                url: IcoPin,
                            }}
                            label={{
                                text: "Blossom",
                                color: "rgba(78, 118, 92, 1)",
                                fontSize: "14px",
                                className: classes.markerLabel,
                            }}
                        />
                    </GoogleMap>
                ) : (
                    <div>Завантаження картки...</div>
                )}
                <div className={classes.mapButton}>
                    <PrimaryButton onClick={handleOpenGoogleMaps}>
                        Ми в Google maps
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MapComponent);
