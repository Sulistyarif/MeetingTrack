import React from 'react';
import { Snackbar, Text } from 'react-native-paper';


interface CustomSnackbarProps {
    visible: boolean;
    message: string;
    onDismiss: () => void;
    backgroundColor?: string;
    textColor?: string;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
    visible,
    message,
    onDismiss,
    backgroundColor = '#333', // default warna gelap
    textColor = '#fff', // default warna teks putih
}) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={onDismiss}
            duration={3000}
            style={{
                alignSelf: 'center',
                width: '90%',
                borderRadius: 8,
                backgroundColor: backgroundColor,
                paddingHorizontal: 0,
            }}
        >
            <Text style={{ color: textColor }}>{message}</Text>
        </Snackbar>
    );
};

export default CustomSnackbar;
