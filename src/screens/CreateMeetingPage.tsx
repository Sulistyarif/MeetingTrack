import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import InputField from '../components/InputField'
import CustomSnackbar from '../components/CustomSnacbar'
import { useMeetingStore } from '../stores/UseMeetingStore'
import { Meeting } from '../models/Meetings'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
                            <Text style={styles.titleText}>New Meeting</Text>
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

export default CreateMeetingPage