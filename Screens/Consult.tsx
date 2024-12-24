import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { updateDoctorImage, updateDoctorName } from '../redux/AppointmentSlice';
import Header from '../Componenet/Header';
import doctors from '../Componenet/Doctor';

interface Doctor {
  name: string;
  speciality: string;
  experience: string;
  image: string;
  video: number;
  reviews: Array<{
    star: number;
  }>;
}

interface RouteParams {
  active: string;
}

interface ConsultProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
  route: {
    params: RouteParams;
  };
}

type FilterType = 'All' | 'Hypertension' | 'Diabetes' | 'Obesity' | 'Anxiety' | 'PCOS' | 'Insomnia';

const Consult: React.FC<ConsultProps> = ({ navigation, route }) => {
    const [filter, setFilter] = useState<FilterType>('All');
    const dispatch = useDispatch();

    useEffect(() => {
        const { active } = route.params;
        setFilter(active as FilterType);
    }, []);

    const filteredDoctors: Doctor[] =
        filter === 'All' ? doctors : doctors.filter((doc) => doc.speciality === filter);

    return (
        <ScrollView style={styles.container}>
            <Header title="Consult" nav="Concern" />
            <View>
                <View style={styles.filterContainer}>
                    {(['All', 'Hypertension', 'Diabetes', 'Obesity', 'Anxiety', 'PCOS', 'Insomnia'] as FilterType[]).map((filterType) => (
                        <TouchableOpacity
                            key={filterType}
                            style={[styles.filterButton, filter === filterType && styles.activeFilter]}
                            onPress={() => setFilter(filterType)}
                        >
                            <Text style={[styles.filterText, filter === filterType && styles.activeFilterText]}>
                                {filterType}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <FlatList
                    data={filteredDoctors}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }: { item: Doctor }) => (
                        <TouchableOpacity
                            onPress={() => {
                                dispatch(updateDoctorName(item.name));
                                dispatch(updateDoctorImage(item.image));
                                navigation.navigate('Profile', { data: item });
                            }}
                        >
                            <View style={styles.card}>
                                <Image source={{ uri: item.image }} style={styles.image} />
                                <View style={styles.details}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Text style={styles.speciality}>{item.speciality}</Text>
                                    <Text style={styles.experience}>{item.experience} of Experience</Text>
                                    <Text style={styles.rating}>⭐ {item.reviews[0].star} stars</Text>
                                    <View style={styles.consultation}>
                                        <TouchableOpacity style={styles.videoButton}>
                                            <Text style={styles.videoButtonText}>Video Consultation</Text>
                                            <Text style={styles.videoButtonFeesText}>${item.video}</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.videoButton}>
                                            <Text style={styles.videoButtonText}>Chat Consultation Free</Text>
                                            <Text style={styles.videoButtonFeesText}>Free</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </ScrollView>
    );
};

export default Consult;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        margin: 10,
        padding: 10,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginRight: 15,
    },
    activeFilterText: {
        color: 'white',
    },
    videoButtonFeesText: {
        color: 'black',
        alignItems: 'center',
        justifyContent: 'center',
    },
    details: {
        flex: 1,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    speciality: {
        fontSize: 14,
        color: '#777',
        marginVertical: 2,
    },
    experience: {
        fontSize: 14,
        color: '#555',
        marginVertical: 2,
    },
    rating: {
        fontSize: 14,
        color: '#ff9900',
        marginVertical: 2,
    },
    consultation: {
        flexDirection: 'row',
        marginTop: 10,
        marginLeft: -65
    },
    videoButton: {
        backgroundColor: '#f5f5f5',
        padding: 8,
        borderRadius: 5,
        marginRight: 10,
        alignItems: 'center'
    },
    videoButtonText: {
        color: '#b0b0b0',
        fontSize: 12,
    },
    chatButton: {
        backgroundColor: '#fff',
        borderColor: '#00bfa5',
        borderWidth: 1,
        padding: 8,
        borderRadius: 5,
    },
    chatButtonText: {
        color: '#00bfa5',
        fontSize: 12,
    },
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    filterButton: {
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ddd',
        marginHorizontal: 5,
    },
    activeFilter: {
        backgroundColor: '#3A643C',
    },
    filterText: {
        fontSize: 12,
        color: '#333',
    },
});