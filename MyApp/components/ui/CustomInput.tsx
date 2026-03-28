import React from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

// Описуємо пропси
interface CustomInputProps extends TextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
                                                            value,
                                                            onChangeText,
                                                            placeholder,
                                                            error,
                                                            ...props
                                                        }) => {
    return (
        <View style={{ marginBottom: 16 }}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#666"
                style={{
                    backgroundColor: '#2C2C2E',
                    padding: 14,
                    borderRadius: 12,
                    fontSize: 16,
                    color: '#fff',
                    borderWidth: 1,
                    borderColor: error ? '#FF3B30' : '#3A3A3C',
                }}
                {...props} // інші props TextInput
            />
            {error ? (
                <Text style={{ color: '#FF3B30', marginTop: 4 }}>{error}</Text>
            ) : null}
        </View>
    );
};