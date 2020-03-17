import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import styled from 'styled-components';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import peopleIcon from '../../assets/peopleIcon.png';

const Container = styled.View`
  flex-grow: 1;
`;

function Maps({getLoc, setGetLoc}) {
    const [textLatitude, setTextLatitude] = useState(0);
    const [textLongitude, setTextLongitude] = useState(0);
    const [location, setLocation] = useState();
    const [errMsg, setErrMsg] = useState();

    const getLocationAsync = async () => {
        let status = await Permissions.askAsync(Permissions.LOCATION);

        if (status.status !== 'granted') {
            setErrMsg('Permission to access location was denied');
        } else {
            setErrMsg('Permssion granted')

            let currlocation = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });

            setLocation(currlocation);
            setTextLatitude(currlocation.coords.latitude);
            setTextLongitude(currlocation.coords.longitude);

        }
    }
    const region = {
        latitude: textLatitude,
        longitude: textLongitude,
        latitudeDelta: 0.0043,
        longitudeDelta: 0.0034
    }
    useEffect(() => {
            getLocationAsync();
    }, [getLoc]);
    console.log(location);

    console.log(textLatitude);
    console.log(textLongitude);
    console.log(errMsg);

    return (
        <Container>
            {textLatitude ?
                <MapView
                    style={{ flex: 1 }}
                    region={region}
                >
                    <Marker
                        coordinate={{
                            latitude: textLatitude,
                            longitude: textLongitude
                        }}
                    >
                        <Image style={{ height: 30, width: 30 }} resizeMode={"contain"} source={peopleIcon} />
                    </Marker>
                    <Marker
                        coordinate={{ latitude: 37.421995, longitude: -122.083 }}
                    >
                        <Image style={{ height: 30, width: 30 }} resizeMode={"contain"} source={peopleIcon} />
                    </Marker>
                    <Marker
                        coordinate={{ latitude: 37.421989, longitude: -122.085 }}
                    >
                        <Image style={{ height: 30, width: 30 }} resizeMode={"contain"} source={peopleIcon} />
                    </Marker>
                </MapView>
                : <Text>Loading Dulu</Text>}
        </Container>
    );
}

export default Maps;