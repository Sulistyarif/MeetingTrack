// Format: Tuesday, April 29, 2025
export function formatMeetingDate(datetime: string): string {
    const dateObj = new Date(datetime);
    return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

// Format: 09:00 AM
export function formatMeetingTime(datetime: string): string {
    const dateObj = new Date(datetime);
    return dateObj.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
    });
}

// Format: 09:00 AM - 10:30 AM
export function formatMeetingTimeRange(startDatetime: string, endDatetime: string): string {
    const startTime = formatMeetingTime(startDatetime);
    const endTime = formatMeetingTime(endDatetime);
    return `${startTime} - ${endTime}`;
}

// Format: April 29, 2025  
export function formatMeetingDateSimple(datetime: string): string {
    const dateObj = new Date(datetime);
    return dateObj.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}
