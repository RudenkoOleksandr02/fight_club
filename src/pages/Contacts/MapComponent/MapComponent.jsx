import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import classes from './MapComponent.module.css';
import PrimaryButton from "../../../components/ui/Buttons/PrimaryButton/PrimaryButton";

const center = {
    lat: 50.2288216,
    lng: 30.6471656
};

const MapComponent = () => {
    const handleOpenGoogleMaps = () => {
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${center.lat},${center.lng}`;
        window.open(googleMapsUrl, '_blank');
    };

    return (
        <div className={classes.wrapper}>
            <div className={classes.mapContainer}>
                <LoadScript googleMapsApiKey="AIzaSyAwBqyVQ4sinz1yYh6HQtsl2eaPuG5kKnA">
                    <GoogleMap
                        mapContainerClassName={classes.map}
                        center={center}
                        zoom={16}
                    >
                        <Marker
                            position={center}
                            label={{
                                text: "Blossom",
                                color: "#DB4338",
                                fontSize: "14px",
                                className: classes.markerLabel
                            }}
                        />
                    </GoogleMap>
                </LoadScript>
                <div className={classes.mapButton}>
                    <PrimaryButton onClick={handleOpenGoogleMaps}>
                        Ми в Google maps
                    </PrimaryButton>
                </div>
            </div>
        </div>
    );
};

export default MapComponent;
