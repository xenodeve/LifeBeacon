import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Share } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';
import { startLocationTracking, stopLocationTracking } from '../services/LocationService';
import { getUserId } from '../services/UserManager';

const MapScreen = () => {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [isSharing, setIsSharing] = useState(false);
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const handleShareLocation = async () => {
        if (!isSharing) {
            // Start Sharing
            try {
                await startLocationTracking();
                setIsSharing(true);

                const userId = await getUserId();
                const liveLink = `https://lifebeacon.web.app/track/${userId}`; // Placeholder for now

                const result = await Share.share({
                    message: `ติดตามตำแหน่งของฉันแบบ Realtime ได้ที่นี่: ${liveLink}`,
                });

                if (result.action === Share.dismissedAction) {
                    // Optional: Stop sharing if they cancelled the share dialog immediately? 
                    // For now, keep it running as they might have copied the link.
                }
            } catch (error: any) {
                Alert.alert("Error", "Could not start live sharing: " + error.message);
                setIsSharing(false);
            }
        } else {
            // Stop Sharing
            try {
                await stopLocationTracking();
                setIsSharing(false);
                Alert.alert("Stopped", "Live location sharing has been stopped.");
            } catch (error: any) {
                Alert.alert("Error", "Could not stop live sharing: " + error.message);
            }
        }
    };

    const handleMyLocation = () => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } else {
            Alert.alert("Waiting for location", "Please wait while we fetch your location.");
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                showsMyLocationButton={false}
                initialRegion={{
                    latitude: 13.7563,
                    longitude: 100.5018,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                region={location ? {
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                } : undefined}
            >
                {location && (
                    <Marker
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title="My Location"
                        description="Current position"
                    />
                )}
            </MapView>

            <TouchableOpacity style={styles.myLocationButton} onPress={handleMyLocation}>
                <MaterialIcons name="my-location" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, isSharing && styles.buttonActive]}
                    onPress={handleShareLocation}
                >
                    <Text style={styles.buttonText}>
                        {isSharing ? "หยุดแชร์ตำแหน่ง (Live)" : "แชร์ตำแหน่ง (Live)"}
                    </Text>
                </TouchableOpacity>
            </View>

            {errorMsg && (
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errorMsg}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    myLocationButton: {
        position: 'absolute',
        bottom: 90, // Above the download button
        right: 20,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: '#FF3B30', // Red for stop action
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
        fontFamily: 'IBMPlexSansThai_700Bold',
    },
    errorContainer: {
        position: 'absolute',
        top: 50,
        left: 20,
        right: 20,
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        padding: 10,
        borderRadius: 5,
    },
    errorText: {
        color: 'white',
        textAlign: 'center',
        fontFamily: 'IBMPlexSansThai_400Regular',
    }
});

export default MapScreen;
