import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { useMeetingStore } from '../stores/UseMeetingStore';
import { Meeting } from '../models/Meetings';
import CustomSnackbar from '../components/CustomSnacbar';
import InputField from '../components/InputField';
import RoundedButton from '../components/RoundedButton';
import ConfirmModal from '../components/ConfirmModal';
import { formatMeetingDateSimple } from '../utils/dateTimeHelpers';
import DateTimePicker from '@react-native-community/datetimepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditMeetingPage = () => {

    const navigation = useNavigation();
    const selectedMeeting = useMeetingStore((state) => state.selectedMeeting);
    const updateMeeting = useMeetingStore((state) => state.updateMeeting);
    const deleteMeeting = useMeetingStore((state) => state.deleteMeeting);

    // Var
    const [title, setTitle] = useState(selectedMeeting?.title || '');
    const [speaker, setSpeaker] = useState(selectedMeeting?.speaker || '');
    const [thumbnail, setThumbnail] = useState(selectedMeeting?.thumbnail || '');
    const [link, setLink] = useState(selectedMeeting?.link || '');
    const [date, setDate] = useState(selectedMeeting?.date || '');
    const [startTime, setStartTime] = useState(selectedMeeting?.startTime || '');
    const [endTime, setEndTime] = useState(selectedMeeting?.endTime || '');
    const [showConfirm, setShowConfirm] = useState(false);
    const [showConfirmSave, setShowConfirmSave] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);

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
        setShowConfirmSave(true);
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
                        <View style={{ flexDirection: 'row' }}>
                            {/* <Icon name="chevron-left" size={40} color="#000" onPress={() => navigation.navigate('CreateMeeting' as never)} /> */}
                            <Text style={styles.titleText}>Edit Meeting</Text>
                        </View>
                        <TouchableOpacity style={styles.saveButton} onPress={onSaveTapped}>
                            <Text style={styles.saveButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 12 }} />
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
                    <RoundedButton title={'Delete Meeting'} onPress={() => setShowConfirm(true)} backgroundColor='#FF0000'>
                    </RoundedButton>
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
                        message="Are you sure you want to delete this meeting?"
                        onConfirm={() => {
                            deleteMeeting(selectedMeeting!.id);
                            setShowConfirm(false);
                            navigation.goBack();
                            showSnackbarSuccess('Meeting deleted successfully!');
                        }}
                        onCancel={() => setShowConfirm(false)}
                    />
                    <ConfirmModal
                        visible={showConfirmSave}
                        message="Are you sure you want to save this changes?"
                        onConfirm={() => {
                            const newMeeting = {
                                id: selectedMeeting?.id,
                                title,
                                speaker,
                                thumbnail,
                                link,
                                date,
                                startTime,
                                endTime,
                            } as Meeting;

                            updateMeeting(newMeeting.id, newMeeting);
                            showSnackbarSuccess('Meeting updated successfully!');
                            setShowConfirmSave(false);
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
    }, saveButton: {
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

export default EditMeetingPage