import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native';
import { useMeetingStore } from '../stores/UseMeetingStore';
import { Meeting } from '../models/Meetings';
import CustomSnackbar from '../components/CustomSnacbar';
import InputField from '../components/InputField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RoundedButton from '../components/RoundedButton';
import ConfirmModal from '../components/ConfirmModal';

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
        navigation.goBack();
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
                <View style={styles.container}>
                    <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* <Icon name="chevron-left" size={40} color="#000" onPress={() => navigation.navigate('CreateMeeting' as never)} /> */}
                            <Text style={styles.titleText}>Edit Meeting</Text>
                        </View>
                        <Icon name="check" size={40} color="#000" onPress={onSaveTapped} />
                    </View>
                    <View style={{ marginTop: 20 }} />
                    <Text style={styles.formLabel}>Title</Text>
                    <View style={{ marginBottom: 10 }} />
                    <InputField
                        placeholder="Enter meeting title"
                        value={title}
                        onChangeText={setTitle} />
                    <View style={{ marginTop: 15 }} />
                    <Text style={styles.formLabel}>Speaker</Text>
                    <View style={{ marginBottom: 10 }} />
                    <InputField
                        placeholder="Enter speaker name"
                        value={speaker}
                        onChangeText={setSpeaker} />
                    <View style={{ marginTop: 15 }} />
                    <Text style={styles.formLabel}>Thumbnail</Text>
                    <View style={{ marginBottom: 10 }} />
                    <InputField
                        placeholder="Enter thumbnail URL"
                        value={thumbnail}
                        onChangeText={setThumbnail} />
                    <View style={{ marginTop: 15 }} />
                    <Text style={styles.formLabel}>Link</Text>
                    <View style={{ marginBottom: 10 }} />
                    <InputField
                        placeholder="Enter meeting link"
                        value={link}
                        onChangeText={setLink} />
                    <View style={{ marginTop: 15 }} />
                    <Text style={styles.formLabel}>Date</Text>
                    <View style={{ marginBottom: 10 }} />
                    <InputField
                        placeholder="Enter date"
                        value={date}
                        onChangeText={setDate} />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flex: 1 }}>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.formLabel}>Start Time</Text>
                            <View style={{ marginBottom: 10 }} />
                            <InputField
                                placeholder="Enter start time"
                                value={startTime}
                                onChangeText={setStartTime} />
                        </View>
                        <View style={{ flex: 1, marginLeft: 5 }}>
                            <View style={{ marginTop: 15 }} />
                            <Text style={styles.formLabel}>End Time</Text>
                            <View style={{ marginBottom: 10 }} />
                            <InputField
                                placeholder="Enter end time"
                                value={endTime}
                                onChangeText={setEndTime} />
                        </View>
                    </View>
                    <RoundedButton title={'Delete'} onPress={() => setShowConfirm(true)} backgroundColor='#FF0000'>
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
                </View>
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
    },
    titleItem: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    speakerText: {
        fontSize: 15,
    },
    formLabel: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default EditMeetingPage