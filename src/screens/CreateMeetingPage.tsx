import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import InputField from '../components/InputField'
import CustomSnackbar from '../components/CustomSnacbar'
import { useMeetingStore } from '../stores/UseMeetingStore'
import { Meeting } from '../models/Meetings'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DateTimePicker from '@react-native-community/datetimepicker';
import { formatMeetingDateSimple } from '../utils/dateTimeHelpers'
import ConfirmModal from '../components/ConfirmModal'

const CreateMeetingPage = () => {
    const navigation = useNavigation();
    const addMeeting = useMeetingStore((state) => state.addMeeting);

    // Var
    const [title, setTitle] = useState('');
    const [speaker, setSpeaker] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [link, setLink] = useState('');
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Snackbar
    const [visibleSuccess, setVisibleSuccess] = useState(false);
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    // action to save
    const onSaveTapped = () => {
        if (!title || !speaker || !thumbnail || !link || !date || !startTime || !endTime) {
            console.log('Please complete all fields!');
            showSnackbarAlert('Please complete all fields!');
            return;
        }
        setShowConfirm(true)
    };

    // Snackbar action
    const showSnackbarSuccess = (msg: string) => {
        setSnackbarMessage(msg);
        setVisibleSuccess(true);
    };

    const onDismissSnackBarSuccess = () => {
        setVisibleSuccess(false);
    };

    const showSnackbarAlert = (msg: string) => {
        setSnackbarMessage(msg);
        setVisibleAlert(true);
    };

    const onDismissSnackBarAlert = () => {
        setVisibleAlert(false);
    };

    // UI
    return (
        <View style={{ flex: 1, backgroundColor: '#E0F7FA' }}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <KeyboardAwareScrollView style={styles.container}>
                    <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.titleText}>New Meeting</Text>
                        <TouchableOpacity style={styles.saveButton} onPress={onSaveTapped}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }} />
                    <Text style={styles.formLabel}>Title</Text>
                    <View style={{ marginBottom: 4 }} />
                    <InputField
                        placeholder="Enter meeting title"
                        value={title}
                        onChangeText={setTitle} />
                    <View style={{ marginTop: 12 }} />
                    <Text style={styles.formLabel}>Speaker</Text>
                    <View style={{ marginBottom: 4 }} />
                    <InputField
                        placeholder="Enter speaker name"
                        value={speaker}
                        onChangeText={setSpeaker} />
                    <View style={{ marginTop: 12 }} />
                    <Text style={styles.formLabel}>Thumbnail</Text>
                    <View style={{ marginBottom: 4 }} />
                    <InputField
                        placeholder="Enter thumbnail URL"
                        value={thumbnail}
                        onChangeText={setThumbnail} />
                    <View style={{ marginTop: 12 }} />
                    <Text style={styles.formLabel}>Link</Text>
                    <View style={{ marginBottom: 4 }} />
                    <InputField
                        placeholder="Enter meeting link"
                        value={link}
                        onChangeText={setLink} />
                    <View style={{ marginTop: 12 }} />
                    <Text style={styles.formLabel}>Date</Text>
                    <View style={{ marginBottom: 4 }} />
                    <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.inputField}>
                        <Text style={{ color: date ? '#000' : '#aaa' }}>
                            {date ? formatMeetingDateSimple(date) : 'Enter date'}
                        </Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={new Date()}
                            mode="date"
                            display="default"
                            onChange={(_, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    const d = selectedDate.toISOString().split('T')[0]; // yyyy-mm-dd
                                    setDate(d);
                                }
                            }}
                        />
                    )}
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 12 }} />
                            <Text style={styles.formLabel}>Start Time</Text>
                            <View style={{ marginBottom: 4 }} />
                            <TouchableOpacity onPress={() => setShowStartTimePicker(true)} style={styles.inputField}>
                                <Text style={{ color: startTime ? '#000' : '#aaa' }}>
                                    {startTime || 'Enter start time'}
                                </Text>
                            </TouchableOpacity>
                            {showStartTimePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={(_, selectedTime) => {
                                        setShowStartTimePicker(false);
                                        if (selectedTime) {
                                            const time = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                            setStartTime(time);
                                        }
                                    }}
                                />
                            )}
                        </View>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <View style={{ marginTop: 12 }} />
                            <Text style={styles.formLabel}>End Time</Text>
                            <View style={{ marginBottom: 4 }} />
                            <TouchableOpacity onPress={() => setShowEndTimePicker(true)} style={styles.inputField}>
                                <Text style={{ color: endTime ? '#000' : '#aaa' }}>
                                    {endTime || 'Enter end time'}
                                </Text>
                            </TouchableOpacity>
                            {showEndTimePicker && (
                                <DateTimePicker
                                    value={new Date()}
                                    mode="time"
                                    is24Hour={true}
                                    display="default"
                                    onChange={(_, selectedTime) => {
                                        setShowEndTimePicker(false);
                                        if (selectedTime) {
                                            const time = selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                                            setEndTime(time);
                                        }
                                    }}
                                />
                            )}
                        </View>
                    </View>
                    <CustomSnackbar
                        visible={visibleSuccess}
                        message={snackbarMessage}
                        onDismiss={onDismissSnackBarSuccess}
                        backgroundColor="#008000" // optional
                    />
                    <CustomSnackbar
                        visible={visibleAlert}
                        message={snackbarMessage}
                        onDismiss={onDismissSnackBarAlert}
                        backgroundColor="#f00" // optional
                    />
                    <ConfirmModal
                        visible={showConfirm}
                        message="Are you sure you want to create this meeting?"
                        onConfirm={() => {
                            setShowConfirm(false);
                            const newMeeting = {
                                id: Date.now(),
                                title,
                                speaker,
                                thumbnail,
                                link,
                                date,
                                startTime,
                                endTime,
                            } as Meeting;

                            addMeeting(newMeeting);
                            showSnackbarSuccess('Meeting created successfully!');
                            navigation.goBack();
                        }}
                        onCancel={() => setShowConfirm(false)}
                    />
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    safeAreaContainer: {
        margin: 20,
        flex: 1,
        backgroundColor: '#E0F7FA',
    },
    container: {
        flex: 1,
        backgroundColor: '#E0F7FA',
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#0097A7',
    },
    titleItem: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    speakerText: {
        fontSize: 15,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    inputField: {
        backgroundColor: '#e5e5e5',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    saveButton: {
        backgroundColor: '#007C91',
        borderRadius: 24,
        paddingHorizontal: 10,
        alignItems: 'center',
        marginTop: 15,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
})

export default CreateMeetingPage