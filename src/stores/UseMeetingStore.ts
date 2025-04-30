// src/stores/useMeetingStore.ts
import { create } from 'zustand';
import { Meeting } from '../models/Meetings';

interface MeetingStore {
    meetings: Meeting[];
    addMeeting: (meeting: Meeting) => void;
    updateMeeting: (id: number, updated: Partial<Meeting>) => void;
    deleteMeeting: (id: number) => void;
    resetMeetings: () => void;
    selectedMeeting: Meeting | null;
    setSelectedMeeting: (meeting: Meeting) => void;
}

export const useMeetingStore = create<MeetingStore>((set) => ({
    meetings: [],
    addMeeting: (meeting) =>
        set((state) => ({
            meetings: [...state.meetings, meeting],
        })),
    updateMeeting: (id, updated) =>
        set((state) => ({
            meetings: state.meetings.map((m) =>
                m.id === id ? { ...m, ...updated } : m
            ),
        })),
    deleteMeeting: (id) =>
        set((state) => ({
            meetings: state.meetings.filter((m) => m.id !== id),
        })),
    resetMeetings: () =>
        set(() => ({
            meetings: [],
        })),
    selectedMeeting: null,
    setSelectedMeeting: (meeting) => set({ selectedMeeting: meeting }),
}));
