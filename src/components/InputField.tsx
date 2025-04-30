import React from 'react';
import { View, TextInput, StyleSheet, Text, ViewStyle } from 'react-native';

type Props = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: ViewStyle;
    label?: string;
    secureTextEntry?: boolean;
};

const InputField: React.FC<Props> = ({
    placeholder,
    value,
    onChangeText,
    style,
    label,
    secureTextEntry = false,
}) => (
    <View style={[styles.wrapper, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputWrapper}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#8F8989"
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    </View>
);

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },
    label: {
        marginBottom: 6,
        fontSize: 16,
        color: '#fff',
    },
    inputWrapper: {
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#f3eefc',
        borderWidth: 0,
        borderColor: '#aaa',
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        fontSize: 16,
        color: '#000',
        backgroundColor: '#E0E0E0',
    },
});

export default InputField;
