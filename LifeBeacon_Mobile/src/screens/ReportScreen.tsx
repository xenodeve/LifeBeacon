import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ReportScreen = () => {
    const [status, setStatus] = useState('ต้องการความช่วยเหลือ');
    const [needs, setNeeds] = useState({
        food: false,
        water: false,
        meds: false,
        evacuation: false,
    });
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert("ไม่อนุญาต", "ต้องการสิทธิ์เข้าถึงกล้อง");
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSubmit = () => {
        console.log({ status, needs, description, image });
        Alert.alert("ส่งรายงานแล้ว", "คำขอของคุณถูกส่งไปยังทีมกู้ภัยเรียบร้อยแล้ว");
    };

    const toggleNeed = (key: keyof typeof needs) => {
        setNeeds(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const getNeedLabel = (key: string) => {
        switch (key) {
            case 'food': return 'อาหาร';
            case 'water': return 'น้ำ';
            case 'meds': return 'ยา';
            case 'evacuation': return 'อพยพ';
            default: return key;
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>รายงานสถานการณ์</Text>

            <View style={styles.section}>
                <Text style={styles.label}>สถานะ</Text>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.optionButton, status === 'ต้องการความช่วยเหลือ' && styles.selectedOption]}
                        onPress={() => setStatus('ต้องการความช่วยเหลือ')}
                    >
                        <Text style={[styles.optionText, status === 'ต้องการความช่วยเหลือ' && styles.selectedOptionText]}>ต้องการความช่วยเหลือ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.optionButton, status === 'ปลอดภัย' && styles.selectedOption]}
                        onPress={() => setStatus('ปลอดภัย')}
                    >
                        <Text style={[styles.optionText, status === 'ปลอดภัย' && styles.selectedOptionText]}>ปลอดภัย</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>ความต้องการ</Text>
                <View style={styles.grid}>
                    {Object.keys(needs).map((key) => (
                        <TouchableOpacity
                            key={key}
                            style={[styles.needButton, needs[key as keyof typeof needs] && styles.selectedNeed]}
                            onPress={() => toggleNeed(key as keyof typeof needs)}
                        >
                            <Text style={[styles.needText, needs[key as keyof typeof needs] && styles.selectedNeedText]}>
                                {getNeedLabel(key)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>รายละเอียดและข้อมูลติดต่อ</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    placeholder="อธิบายสถานการณ์, จำนวนคน, ข้อมูลติดต่อ..."
                    value={description}
                    onChangeText={setDescription}
                />
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>รูปภาพ</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
                        <Text style={styles.photoButtonText}>เลือกรูปภาพ</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
                        <Text style={styles.photoButtonText}>ถ่ายรูป</Text>
                    </TouchableOpacity>
                </View>
                {image && <Image source={{ uri: image }} style={styles.previewImage} />}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                <Text style={styles.submitButtonText}>ส่งรายงาน</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontFamily: 'IBMPlexSansThai_700Bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontFamily: 'IBMPlexSansThai_600SemiBold',
        marginBottom: 10,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
    },
    optionButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedOption: {
        backgroundColor: '#FF3B30',
        borderColor: '#FF3B30',
    },
    optionText: {
        color: '#333',
        fontFamily: 'IBMPlexSansThai_400Regular',
    },
    selectedOptionText: {
        color: 'white',
        fontFamily: 'IBMPlexSansThai_700Bold',
    },
    needButton: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        marginBottom: 5,
    },
    selectedNeed: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    needText: {
        color: '#333',
        fontFamily: 'IBMPlexSansThai_400Regular',
    },
    selectedNeedText: {
        color: 'white',
        fontFamily: 'IBMPlexSansThai_700Bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        textAlignVertical: 'top',
        fontFamily: 'IBMPlexSansThai_400Regular',
    },
    photoButton: {
        flex: 1,
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    photoButtonText: {
        color: '#333',
        fontFamily: 'IBMPlexSansThai_400Regular',
    },
    previewImage: {
        width: '100%',
        height: 200,
        marginTop: 10,
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 40,
    },
    submitButtonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'IBMPlexSansThai_700Bold',
    },
});

export default ReportScreen;
