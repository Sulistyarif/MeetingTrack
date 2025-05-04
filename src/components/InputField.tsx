import React from 'react';
import { View, TextInput, StyleSheet, Text, ViewStyle } from 'react-native';

type Props = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    style?: ViewStyle;
    label?: string;
    secureTextEntry?: boolean;
    placeholderTextColor?: string;
    inputBackgroundColor?: string;
};

const InputField: React.FC<Props> = ({
    placeholder,
    value,
    onChangeText,
    style,
    label,
    secureTextEntry = false,
    placeholderTextColor = '#90A4AE',
    inputBackgroundColor = '#E5E5E5',
}) => (
    <View style={[styles.wrapper, style]}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View style={styles.inputWrapper}>
            <TextInput
                style={[styles.input, { backgroundColor: inputBackgroundColor }]}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
            />
        </View>
    </View >
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
        borderWidth: 0,
        borderColor: '#aaa',
    },
    input: {
        paddingVertical: 8,
        paddingHorizontal: 14,
        fontSize: 16,
        color: '#000',
    },
});

export default InputField;
