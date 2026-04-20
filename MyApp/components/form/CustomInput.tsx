import React, { useState } from 'react';
import { Text, TextInput, TextInputProps, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CustomInputProps extends TextInputProps {
    label: string;
    isPassword?: boolean;
    error?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({ label, isPassword, error, style, ...props }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={styles.label}>{label}</Text>
            <View
                style={[
                    styles.inputContainer,
                    error ? { borderColor: 'red' } : { borderColor: 'transparent' },
                ]}
            >
                <TextInput
                    placeholderTextColor="rgba(14,62,62,0.45)"
                    secureTextEntry={isPassword && !showPassword}
                    style={[styles.input, isPassword && { letterSpacing: 3 }]}
                    {...props}
                />
                {isPassword && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Ionicons
                            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                            size={20}
                            color="#0E3E3E"
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

export default CustomInput;

const styles = StyleSheet.create({
    label: { fontSize: 15, fontWeight: '500', color: '#363130', marginBottom: 4 },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#DFF7E2',
        borderRadius: 20,
        paddingHorizontal: 16,
        height: 45,
        borderWidth: 1,
        justifyContent: 'space-between',
    },
    input: {
        flex: 1,
        fontSize: 14,
        color: '#0E3E3E',
    },
    error: {
        color: 'red',
        fontSize: 11,
        marginTop: 4,
    },
});