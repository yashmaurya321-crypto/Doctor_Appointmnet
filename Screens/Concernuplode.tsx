import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import Header from '../Componenet/Header';
import { useSelector, useDispatch } from 'react-redux';
import { updateConcernDetails } from '../redux/AppointmentSlice';

interface ConcernUploadProps {
  navigation: any;
  route: {
    params: {
      appointmentId: string;
    };
  };
}

const ConcernUpload: React.FC<ConcernUploadProps> = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState<number>(1);
  const [severity, setSeverity] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [timeUnit, setTimeUnit] = useState<string>('Days');
  const [description, setDescription] = useState<string>('');
  const [sleepPattern, setSleepPattern] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<{ name: string; uri: string } | null>(null);
  
  const { appointmentId } = route.params;
  const appointments = useSelector((state: any) => state.appointments.appointments);
  const currentAppointment = appointments.find((app: { id: string }) => app.id === appointmentId);

  useEffect(() => {
    if (currentAppointment?.concern) {
      const concernData = currentAppointment.concern;
      if (concernData['1']) {
        setSeverity(concernData['1'].severity || '');
        const durationParts = concernData['1'].howLongFacing?.split(' ') || [];
        if (durationParts.length === 2) {
          setDuration(durationParts[0]);
          setTimeUnit(durationParts[1]);
        }
      }
      if (concernData['2']) {
        setDescription(concernData['2'].description || '');
        setSleepPattern(concernData['2'].sleepPattern || '');
      }
      if (concernData['3']?.uploadedFiles) {
        setSelectedFile({ name: concernData['3'].uploadedFiles, uri: concernData['3'].uploadedFiles });
      }
    }
  }, [currentAppointment]);

  const handleStep1Submit = () => {
    if (!severity || !duration) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }
    dispatch(updateConcernDetails({
      id: appointmentId,
      step: '1',
      data: { severity: severity, howLongFacing: `${duration} ${timeUnit}` },
    }));
    nextStep();
  };

  const handleStep2Submit = () => {
    if (!description || !sleepPattern) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }
    dispatch(updateConcernDetails({
      id: appointmentId,
      step: '2',
      data: { description: description, sleepPattern: sleepPattern },
    }));
    nextStep();
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
      if (result.assets && result.assets.length > 0) {
        const fileData = {
          name: result.assets[0].name,
          uri: result.assets[0].uri,
          mimeType: result.assets[0].mimeType || '',
        };
        setSelectedFile(fileData);
        Alert.alert('Success', 'File uploaded successfully');
      } else {
        Alert.alert('Error', 'No file selected');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to upload file. Please try again.');
    }
  };

  const handleSubmitAll = () => {
    if (selectedFile) {
      dispatch(updateConcernDetails({
        id: appointmentId,
        step: '3',
        data: { uploadedFiles: selectedFile.name },
      }));
    }
    navigation.navigate('Complete');
  };

  const nextStep = () => setStep(step + 1);
  
  return (
    <ScrollView style={styles.container}>
      <Header title={'Your Concern'} nav={'OnSkip'} />
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((stepNum) => (
          <View key={stepNum} style={[styles.progressStep, step >= stepNum && styles.activeProgressStep]} />
        ))}
      </View>
      
      {/* Step Content */}
      {step === 1 && (
        <View style={styles.stepContainer}>
          <Text style={styles.label}>Select Severity of Your Concern</Text>
          <View style={styles.severityContainer}>
            {['Mild', 'Moderate', 'Severe'].map((level) => (
              <TouchableOpacity key={level} style={[styles.severityButton, severity === level && styles.activeSeverity]} onPress={() => setSeverity(level)}>
                <Text style={styles.severityText}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TextInput placeholder="Enter duration" value={duration} onChangeText={setDuration} keyboardType="numeric" style={styles.input} />
          <Picker selectedValue={timeUnit} onValueChange={(itemValue) => setTimeUnit(itemValue)} style={styles.timePicker}>
            {['Days', 'Weeks', 'Months', 'Years'].map((unit) => (
              <Picker.Item key={unit} label={unit} value={unit} />
            ))}
          </Picker>
          <TouchableOpacity onPress={handleStep1Submit} disabled={!severity || !duration} style={[styles.button, (!severity || !duration) && styles.buttonDisabled]}>
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {step === 2 && (
        <View style={{ padding: 20 }}>
          <TextInput placeholder="Briefly describe your concern" value={description} onChangeText={setDescription} multiline style={styles.input} />
          <TextInput placeholder="Sleep Pattern" value={sleepPattern} onChangeText={setSleepPattern} style={styles.input} />
          <TouchableOpacity onPress={handleStep2Submit} disabled={!description || !sleepPattern} style={[styles.button]}>
            <Text style={styles.buttonText}>Attach Reports</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OnSkip', { appointmentId })}>
            <Text style={styles.skipText}>I'll do it later</Text>
          </TouchableOpacity>
        </View>
      )}
      
      {step === 3 && (
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={handleFileUpload} style={styles.uploadBox}>
            {selectedFile ? (
              <>
                <Text style={styles.uploadText}>Selected File: {selectedFile.name}</Text>
                {/* Preview logic here */}
              </>
            ) : (
              <Text style={styles.uploadText}>Upload pdf, png, jpg, or svg file.</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSubmitAll} style={[styles.button]}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('OnSkip', { appointmentId })}>
            <Text style={styles.secondaryButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  progressStep: {
    height: 8,
    width: 60,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 5,
  },
  activeProgressStep: {
    backgroundColor: '#28a745',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    height: 90,
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  prefilledBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
  },
  prefilledText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  severityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  severityButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    marginHorizontal: 5,
    backgroundColor: '#f8f8f8',
  },
  activeSeverity: {
    backgroundColor: '#E5F4E9',
    borderColor: '#28A745',
  },
  severityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  durationInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#FFFFFF',
  },
  timePicker: {
    flex: 1,
    height: 55,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  button: {
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: '#cccccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  uploadBox: {
    height: 150,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'rgba(202, 217, 202, 0.3)',
  },
  uploadText: {
    color: '#555',
    fontSize: 14,
    textAlign: 'center',
  },
  secondaryButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#555',
    textDecorationLine: 'underline',
  },
  stepContainer: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginVertical: 20,
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
  pdfPreview: {
    width: 200,
    height: 200,
    marginTop: 50,
  },
  infoText: {
    textAlign: 'center',
    color: 'rgba(58, 100, 60, 1)',
    marginVertical: 10,
  },
  skipButton: {
    marginTop: 15,
    marginBottom: 15,
  },
  skipText: {
    color: 'gray',
    textAlign: 'center',
  }
});

export default ConcernUpload;