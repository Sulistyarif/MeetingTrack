import { FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import React, { useEffect, useState } from 'react'
import { Meeting } from '../models/Meetings'
import meetingsData from '../data/meetings.json'
import { formatMeetingDate } from '../utils/dateTimeHelpers';
import { useNavigation } from '@react-navigation/native';
import { useMeetingStore } from '../stores/UseMeetingStore';
import Thumbnail from '../components/Thumbnail';
import CustomSnackbar from '../components/CustomSnacbar';
import ConfirmModal from '../components/ConfirmModal';
import { set } from '@gluestack-style/react';

const meetingsJson: Meeting[] = meetingsData;

const MeetingListPage = () => {
    const navigation = useNavigation();
    const addMeeting = useMeetingStore((state) => state.addMeeting);
    const setSelectedMeeting = useMeetingStore((state) => state.setSelectedMeeting);
    const selectedMeeting = useMeetingStore((state) => state.selectedMeeting);
    const resetMeetings = useMeetingStore((state) => state.resetMeetings);
    const meetings = useMeetingStore((state) => state.meetings);
    const [refreshing, setRefreshing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Snackbar
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        // load data from JSON
        if (meetings.length === 0) {
            meetingsData.forEach((meeting) => addMeeting(meeting));
        }
    }, []);

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
        }
    })

    const renderItem = ({ item }: { item: Meeting }) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedMeeting(item);
                setShowConfirm(true);
            }} onLongPress={() => onLongTapped(item)}
                delayLongPress={300} style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', marginVertical: 10, padding: 10, borderWidth: 0.2, borderRadius: 15 }}>
                    <Thumbnail uri={item.thumbnail} style={{ width: 100, height: 100, borderRadius: 10 }} />
                    <View style={{ marginHorizontal: 10, justifyContent: 'center' }} />
                    <View>
                        <Text style={styles.titleItem}>{item.title}</Text>
                        <View style={{ marginVertical: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="account" size={20} color="#000" />
                            <View style={{ marginHorizontal: 5 }} />
                            <Text style={styles.speakerText}>{item.speaker}</Text>
                        </View>
                        <View style={{ marginVertical: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="calendar" size={20} color="#000" />
                            <View style={{ marginHorizontal: 5 }} />
                            <Text>{formatMeetingDate(item.date)}</Text>
                        </View>
                        <View style={{ marginVertical: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="clock-time-eight-outline" size={20} color="#000" />
                            <View style={{ marginHorizontal: 5 }} />
                            <Text>{item.startTime} - {item.endTime}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }

    const onItemTapped = async (item: Meeting) => {
        console.log('Tapped item:', item);
        try {
            const supported = await Linking.canOpenURL(item.link);

            if (supported) {
                await Linking.openURL(item.link);
            } else {
                showSnackbarAlert('Unable to open the link. Please check the URL.');
            }
        } catch (error) {
            console.error('Failed to open URL:', error);
            showSnackbarAlert('Failed to open URL. Please try again.');
        }
    };

    const onLongTapped = (item: Meeting) => {
        setSelectedMeeting(item);
        navigation.navigate('EditMeeting' as never);
    };

    const onRefresh = () => {
        setRefreshing(true);
        setTimeout(() => {
            resetMeetings();
            meetingsJson.forEach((meeting) => addMeeting(meeting));
            setRefreshing(false);
        }, 1500);
    };

    // Snackbar action
    const showSnackbarAlert = (msg: string) => {
        setSnackbarMessage(msg);
        setVisibleAlert(true);
    };

    const onDismissSnackBarAlert = () => {
        setVisibleAlert(false);
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#E0F7FA' }}>
            <SafeAreaView style={styles.safeAreaContainer}>
                <View style={styles.container}>
                    <View style={{ marginTop: 10, marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={styles.titleText}>Meeting Track</Text>
                        <Icon name="plus" size={40} color="#000" onPress={() => navigation.navigate('CreateMeeting' as never)} />
                    </View>
                    <View style={{ marginVertical: 10 }} />
                    <FlatList data={meetings} renderItem={renderItem} showsVerticalScrollIndicator={false} refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                    <CustomSnackbar
                        visible={visibleAlert}
                        message={snackbarMessage}
                        onDismiss={onDismissSnackBarAlert}
                        backgroundColor="#f00" // optional
                    />
                    <ConfirmModal
                        visible={showConfirm}
                        message="This action will bring you join to the meeting. Do you want to continue?"
                        onConfirm={() => {
                            if (selectedMeeting) {
                                onItemTapped(selectedMeeting);
                            }
                            setShowConfirm(false);
                        }}
                        onCancel={() => setShowConfirm(false)}
                    />
                </View>
            </SafeAreaView>
        </View >
    )
}

export default MeetingListPage