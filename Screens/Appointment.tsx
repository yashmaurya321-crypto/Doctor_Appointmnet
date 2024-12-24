import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import Header from '../Componenet/Header';
import { useDispatch, useSelector } from 'react-redux';
import { updateConsultationType, updateAppointmentDateTime } from "../redux/AppointmentSlice";
import img1 from '../assets/doctor.jpeg';

interface AppointmentProps {
    navigation: any;
    route: {
        params: {
            data: {
                image: string;
                name: string;
                speciality: string;
                video: string;
            };
        };
    };
}

const Appointment: React.FC<AppointmentProps> = ({ navigation, route }) => {
    const dispatch = useDispatch();
    const { data } = route.params;
    const currentAppointment = useSelector((state: any) => state.appointments.currentAppointment);
    const [step, setStep] = useState<number>(1);
    const [selectedConsultation, setSelectedConsultation] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const generateDates = (): Array<{ date: string; day: string }> => {
        const dates: Array<{ date: string; day: string }> = [];
        const today = new Date();
        for (let i = 0; i < 30; i++) {
            const futureDate = new Date(today);
            futureDate.setDate(today.getDate() + i);
            const day = futureDate.toLocaleDateString('en-US', { weekday: 'short' });
            const date = futureDate.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
            dates.push({ date, day });
        }
        return dates;
    };

    const dates = generateDates();
    const timeSlots = {
        morning: ['09:00AM', '09:35AM', '10:05AM'],
        afternoon: ['12:00PM', '12:35PM', '01:05PM'],
        evening: ['04:00PM', '05:30PM', '07:00PM'],
    };

    return (
        <ScrollView style={styles.container}>
            <Header title={step === 1 ? 'Choose Consultation' : step === 2 ? 'Choose Date' : 'Choose Time Slot'} nav={'Profile'} />
            <View style={styles.progressBar}>
                <View style={[styles.progressStep, step >= 1 && styles.activeStep]} />
                <View style={[styles.progressStep, step >= 2 && styles.activeStep]} />
                <View style={[styles.progressStep, step >= 3 && styles.activeStep]} />
            </View>
            {step === 1 && (
                <View style={styles.content}>
                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Image source={{ uri: data.image }} style={{ width: 64, height: 64, borderRadius: 12 }} />
                        <View style={{ marginLeft: 12 }}>
                            <Text style={{ fontSize: 23 }}>{data.name}</Text>
                            <Text style={{ color: "gray" }}>{data.speciality}</Text>
                        </View>
                    </View>
                    <View style={styles.consultationOptions}>
                        <TouchableOpacity
                            style={[styles.consultationBox, selectedConsultation === 'Chat' && styles.selectedConsultationBox]}
                            onPress={() => { setSelectedConsultation('Chat'); console.log(selectedConsultation); }}
                        >
                            <Text style={styles.consultationTitle}>Chat Consultation</Text>
                            <Text style={styles.consultationPrice}>Free</Text>
                            <Text style={styles.recommended}>Recommended</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.consultationBox, selectedConsultation === 'Video' && styles.selectedConsultationBox]}
                            onPress={() => { setSelectedConsultation('Video'); console.log(selectedConsultation); }}
                        >
                            <Text style={styles.consultationTitle}>Video Consultation</Text>
                            <Text style={styles.consultationPrice}>{data.video}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={[styles.proceedButton, !selectedConsultation && styles.disabledButton]}
                        onPress={() => {
                            dispatch(updateConsultationType(selectedConsultation));
                            selectedConsultation && setStep(2);
                        }}
                        disabled={!selectedConsultation}
                    >
                        <Text style={styles.proceedButtonText}>Proceed</Text>
                    </TouchableOpacity>
                </View>
            )}
            {step === 2 && (
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Pick Appointment Date</Text>
                    <FlatList
                        data={dates}
                        numColumns={3}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[styles.dateBox, selectedDate === item.date && styles.selectedDateBox]}
                                onPress={() => setSelectedDate(item.date)}
                            >
                                <Text style={styles.dateText}>{item.date}</Text>
                                <Text style={styles.dayText}>{item.day}</Text>
                            </TouchableOpacity>
                        )}
                        contentContainerStyle={styles.dateList}
                    />
                    <TouchableOpacity
                        style={[styles.proceedButton, !selectedDate && styles.disabledButton]}
                        onPress={() => { selectedDate && setStep(3); }}
                        disabled={!selectedDate}
                    >
                        <Text style={styles.proceedButtonText}>Confirm Date</Text>
                    </TouchableOpacity>
                </View>
            )}
            {step === 3 && (
                <View style={styles.content}>
                    <Text style={styles.sectionTitle}>Pick a time slot</Text>
                    {Object.entries(timeSlots).map(([period, slots], index) => (
                        <View key={index} style={styles.timeSlotSection}>
                            <Text style={styles.timeSlotPeriod}>{period.charAt(0).toUpperCase() + period.slice(1)} (09AM - 12PM)</Text>
                            <View style={styles.timeSlotContainer}>
                                {slots.map((slot, idx) => (
                                    <TouchableOpacity
                                        key={idx}
                                        style={[styles.timeSlotBox, selectedTime === slot && styles.selectedTimeSlotBox]}
                                        onPress={() => setSelectedTime(slot)}
                                    >
                                        <Text style={[styles.timeSlotText, selectedTime === slot && styles.selectedTimeSlotText]}>
                                            {slot}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    ))}
                    <TouchableOpacity
                        style={[styles.proceedButton, !selectedTime && styles.disabledButton]}
                        onPress={() => {
                            console.log(`Consultation: ${selectedConsultation}, Date: ${selectedDate}, Time: ${selectedTime}`);
                            dispatch(updateAppointmentDateTime({ date: selectedDate, time: selectedTime }));
                            console.log(currentAppointment.id);
                            navigation.navigate('Confirm', { data });
                        }}
                        disabled={!selectedTime}
                    >
                        <Text style={styles.proceedButtonText}>Confirm Appointment</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    );
};

export default Appointment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
    },
    progressBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 10,
    },
    progressStep: {
        width: 50,
        height: 5,
        backgroundColor: '#ddd',
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activeStep: {
        backgroundColor: '#4CAF50',
    },
    content: {
        paddingHorizontal: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    dateList: {
        marginTop: 10,
        justifyContent: 'center',
    },
    dateBox: {
        width: 100,
        height: 100,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    selectedDateBox:{
       borderColor:'#4CAF50',
       backgroundColor:'#e8f5e9'
   },
   dateText:{
       fontSize :16,
       fontWeight:'bold',
       color:'#333'
   },
   dayText:{
       fontSize :14,
       color:'#777'
   },
   timeSlotSection:{
       marginVertical :10
   },
   timeSlotPeriod:{
       fontSize :16,
       fontWeight:'bold',
       color:'#555',
       marginBottom :5
   },
   timeSlotContainer:{
       flexDirection:'row',
       flexWrap:'wrap'
   },
   consultationOptions:{
       display:'flex',
       flexDirection:'row',
       justifyContent:'space-between',
       marginTop :20
   },
   consultationBox:{
       width:'48%',
       borderWidth :1,
       borderColor:'#ddd',
       borderRadius :12,
       padding :15,
       backgroundColor:'#fff',
       alignItems:'center'
   },
   selectedConsultationBox:{
       borderColor:'#28a745',
       borderWidth :2
   },
   consultationTitle:{
       fontSize :13,
       fontWeight:'500',
       marginBottom :5
   },
   consultationPrice:{
       fontSize :16,
       color:'#333'
   },
   recommended:{
       marginTop :8,
       fontSize :14,
       color:'#fff',
       backgroundColor:'#28a745',
       paddingVertical :4,
       paddingHorizontal :10,
       borderRadius :8,
       alignSelf :'flex-start'
   },
   proceedButton:{
      marginTop :30,
      backgroundColor:'#28a745',
      paddingVertical :15,
      borderRadius :8,
      alignItems :'center'
   },
   proceedButtonText:{
      color:'#fff',
      fontSize :18,
      fontWeight :'500'
   },
   disabledButton:{
      backgroundColor :'#ddd'
   },
   timeSlotBox:{
      padding :10,
      margin :5,
      borderRadius :5,
      borderWidth :1,
      borderColor :'#ddd',
      backgroundColor :'#fff'
   },
   selectedTimeSlotBox:{
      borderColor :'#4CAF50',
      backgroundColor :'#e8f5e9'
   },
   timeSlotText:{
      fontSize :14,
      color :'#555'
   },
   selectedTimeSlotText:{
      color :'#4CAF50',
      fontWeight :'bold'
   }
});
