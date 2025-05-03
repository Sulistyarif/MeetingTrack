import { Dimensions, FlatList, Image, Linking, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { FAB } from 'react-native-paper';
import InputField from '../components/InputField';

const meetingsJson: Meeting[] = meetingsData;

const MeetingListPage = () => {
    const navigation = useNavigation();
    const screenWidth = Dimensions.get('window').width;
    const addMeeting = useMeetingStore((state) => state.addMeeting);
    const setSelectedMeeting = useMeetingStore((state) => state.setSelectedMeeting);
    const selectedMeeting = useMeetingStore((state) => state.selectedMeeting);
    const resetMeetings = useMeetingStore((state) => state.resetMeetings);
    const meetings = useMeetingStore((state) => state.meetings);
    const [refreshing, setRefreshing] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Search actions
    const [showSearch, setShowSearch] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredMeetings, setFilteredMeetings] = useState<Meeting[]>([]);


    // Snackbar
    const [visibleAlert, setVisibleAlert] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        // load data from JSON
        if (meetings.length === 0) {
            meetingsData.forEach((meeting) => addMeeting(meeting));
        }
    }, []);

    useEffect(() => {
        if (searchText.trim() === '') {
            setFilteredMeetings(meetings);
        } else {
            const keyword = searchText.toLowerCase();
            setFilteredMeetings(
                meetings.filter(m =>
                    m.title.toLowerCase().includes(keyword) ||
                    m.speaker.toLowerCase().includes(keyword)
                )
            );
        }
    }, [searchText, meetings]);


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
            flexShrink: 1,
            maxWidth: screenWidth * 0.55,
            color: '#0097A7',
        },
        speakerText: {
            fontSize: 15,
            color: '#757575',
        }
    })

    const renderItem = ({ item }: { item: Meeting }) => {
        return (
            <TouchableOpacity onPress={() => {
                setSelectedMeeting(item);
                setShowConfirm(true);
            }} onLongPress={() => onLongTapped(item)}
                delayLongPress={300} style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', marginVertical: 10, padding: 10, borderWidth: 0, borderRadius: 15, backgroundColor: '#F3FFFC', elevation: 1 }}>
                    <Thumbnail uri={item.thumbnail} style={{ width: 100, height: 100, borderRadius: 15 }} />
                    <View style={{ marginHorizontal: 10, justifyContent: 'center' }} />
                    <View>
                        <Text style={styles.titleItem} numberOfLines={1}
                            ellipsizeMode="tail">{item.title}</Text>
                        <View style={{ marginVertical: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="account" size={20} color="#9E9E9E" />
                            <View style={{ marginHorizontal: 5 }} />
                            <Text style={styles.speakerText}>{item.speaker}</Text>
                        </View>
                        <View style={{ marginVertical: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="calendar" size={20} color="#9E9E9E" />
                            <View style={{ marginHorizontal: 5 }} />
                            <Text style={styles.speakerText}>{formatMeetingDate(item.date)}</Text>
                        </View>
                        <View style={{ marginVertical: 2 }} />
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="clock-time-eight-outline" size={20} color="#9E9E9E" />
                            <View style={{ marginHorizontal: 5 }} />
                            <Text style={styles.speakerText}>{item.startTime} - {item.endTime}</Text>
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
                        <TouchableOpacity
                            onPress={() => {
                                setSearchText('');
                                setShowSearch(curr => !curr);
                            }}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 20,
                                backgroundColor: '#00BCD4',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Icon name="magnify" size={28} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginVertical: 10 }} />
                    {showSearch && (
                        <InputField
                            placeholder="Search Meetings"
                            value={searchText}
                            onChangeText={text => setSearchText(text)}
                            inputBackgroundColor="#F4F4FF"
                        />
                    )}
                    <FlatList data={filteredMeetings} renderItem={renderItem} showsVerticalScrollIndicator={false} refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                    <FAB
                        icon="plus"
                        style={{
                            position: 'absolute',
                            right: 10,
                            bottom: 20,
                            backgroundColor: '#00BCD4',
                        }}
                        color="#fff"
                        onPress={() => navigation.navigate('CreateMeeting' as never)}
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