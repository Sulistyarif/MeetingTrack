import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ConfirmModalProps {
    visible: boolean;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ visible, message, onConfirm, onCancel }) => {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.button} onPress={onCancel}>
                            <Text style={styles.buttonText}>No</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={onConfirm}>
                            <Text style={styles.buttonText}>Yes</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ConfirmModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000088',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        elevation: 4,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 15,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: '#1976D2',
        borderRadius: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
