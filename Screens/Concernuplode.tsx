import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Picker } from '@react-native-picker/picker';
import Header from '../Componenet/Header';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';
import { updateConcernDetails, updateAppointment } from '../redux/AppointmentSlice';

const ConcernUpload = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [severity, setSeverity] = useState('');
  const [duration, setDuration] = useState('');
  const [timeUnit, setTimeUnit] = useState('Days');
  const [description, setDescription] = useState('');
  const [sleepPattern, setSleepPattern] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const { appointmentId } = route.params;
  console.log("from concern upload",appointmentId);
  const appointments = useSelector((state) => state.appointments.appointments);
  const currentAppointment = appointments.find(app => app.id === appointmentId);

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
        setSelectedFile({
          name: concernData['3'].uploadedFiles,
          uri: concernData['3'].uploadedFiles,
        });
      }
    }
  }, [currentAppointment]);

  const handleStep1Submit = () => {
    if (!severity || !duration) {
      Alert.alert('Required Fields', 'Please fill in all required fields');
      return;
    }
    console.log("Dispatching action with payload:", { id : 1734947032829, step, data : { severity: severity,
      howLongFacing: `${duration} ${timeUnit}`} });
    dispatch(updateConcernDetails({
      id: appointmentId,  
      step: '1',
      data: {
        severity: severity,
        howLongFacing: `${duration} ${timeUnit}` 
      }
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
      data: {
        description: description,
        sleepPattern: sleepPattern
      }
    }));
    nextStep();
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
        copyToCacheDirectory: true,
      });
  console.log("File upload result:", result);
      if (result.assets[0].name) {
        const fileData = {
          name: result.assets[0].name,
          uri: result.assets[0].uri,
          mimeType: result.assets[0].mimeType || '',
        };
        
        // Set the selected file data and log the file immediately
        setSelectedFile(fileData);
        console.log("Selected file:", fileData);
  
        Alert.alert('Success', 'File uploaded successfully');
      } else {
        Alert.alert('Error', 'No file selected');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to upload file. Please try again.');
      console.error('File upload error:', err);
    }
  };
  
  

  const handleSubmitAll = () => {
    if (selectedFile) {
      dispatch(updateConcernDetails({
        id: appointmentId,
        step: '3',
        data: {
          uploadedFiles: selectedFile.name // Assuming you are sending the file name or URI to the backend
        }
      }));
    }
    navigation.navigate('Complete');
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <ScrollView style={styles.container}>
      <Header title={'Your Concern'} nav={'OnSkip'}/>
      <View style={styles.progressContainer}>
        {[1, 2, 3].map((stepNum) => (
          <View
            key={stepNum}
            style={[
              styles.progressStep,
              step >= stepNum && styles.activeProgressStep,
            ]}
          />
        ))}
      </View>

      {step === 1 && (
        <View style={styles.stepContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Concern</Text>
            <View style={styles.prefilledBox}>
              <Text style={styles.prefilledText}>{currentAppointment.concern.type} </Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Select Severity of Your Concern</Text>
            <View style={styles.severityContainer}>
              {['Mild', 'Moderate', 'Severe'].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.severityButton,
                    severity === level && styles.activeSeverity,
                  ]}
                  onPress={() => setSeverity(level)}
                >
                  <Text style={styles.severityText}>{level}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>How long have you been facing?</Text>
            <View style={styles.rowContainer}>
              <TextInput
                style={styles.durationInput}
                placeholder="Enter duration"
                keyboardType="numeric"
                value={duration}
                onChangeText={setDuration}
              />
              <Picker
                selectedValue={timeUnit}
                style={styles.timePicker}
                onValueChange={(itemValue) => setTimeUnit(itemValue)}
              >
                {['Days', 'Weeks', 'Months', 'Years'].map((unit) => (
                  <Picker.Item key={unit} label={unit} value={unit} />
                ))}
              </Picker>
            </View>
          </View>

          <TouchableOpacity
            style={[styles.button, (!severity || !duration) && styles.buttonDisabled]}
            onPress={handleStep1Submit}
            disabled={!severity || !duration}
          >
            <Text style={styles.buttonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={{ padding: 20 }}>
          <Text style={styles.heading}>Briefly Describe</Text>
          <TextInput
            style={styles.input}
            placeholder="Briefly describe your concern"
            value={description}
            onChangeText={setDescription}
            multiline
          />

          <Text style={styles.label}>Enter your sleep pattern</Text>
          <TextInput
            style={styles.input}
            placeholder="Sleep Pattern"
            value={sleepPattern}
            onChangeText={setSleepPattern}
          />

          <View>
            <Text style={styles.infoText}>
              90% of users who attached their reports with the doctor have successfully improved their health.
            </Text>
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={handleStep2Submit}
            disabled={!description || !sleepPattern}
          >
            <Text style={styles.buttonText}>Attach Reports</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => navigation.navigate('OnSkip', { appointmentId })}
          >
            <Text style={styles.skipText}>I'll do it later</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 3 && (
        <View style={{ padding: 20 }}>
          <Text style={styles.heading}>Attach Reports</Text>
          <TouchableOpacity style={styles.uploadBox} onPress={handleFileUpload}>
            {selectedFile ? (
              <View style = {{marginTop: 120}}>
                <Text style={styles.uploadText}>
                  Selected File: {selectedFile.name}
                </Text>
                {selectedFile.mimeType?.startsWith('image/') ? (
                  <Image
                    source={{ uri: selectedFile.uri }}
                    style={styles.imagePreview}
                    resizeMode="contain"
                  />
                ) : selectedFile.mimeType === 'application/pdf' ? (
                  <View style={styles.pdfPreview}>
                   
                  </View>
                ) : (
                  <Text style={styles.uploadText}>Preview not available for this file type.</Text>
                )}
              </View>
            ) : (
              <Text style={styles.uploadText}>
                Upload pdf, png, jpg, or svg file.
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleSubmitAll}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('OnSkip', { appointmentId })}
          >
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