import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
};

const RoundedButton: React.FC<Props> = ({
    title,
    onPress,
    backgroundColor = '#007AFF',
    textColor = '#fff',
}) => (
    <TouchableOpacity
        style={[styles.button, { backgroundColor }]}
        onPress={onPress}
    >
        <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RoundedButton;
