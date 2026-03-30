import React from 'react';
import {
    View,
    TextInput,
    Text,
    TextInputProps,
    StyleProp,
    ViewStyle,
    TextStyle,
} from 'react-native';

type CustomInputProps = Omit<TextInputProps, 'value' | 'onChangeText'> & {
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    error?: string;
    style?: StyleProp<ViewStyle>;
    inputStyle?: StyleProp<TextStyle>;
    errorStyle?: StyleProp<TextStyle>;
};

export const CustomInput: React.FC<CustomInputProps> = ({
                                                            value,
                                                            onChangeText,
                                                            placeholder,
                                                            error,
                                                            style,
                                                            inputStyle,
                                                            errorStyle,
                                                            ...props
                                                        }) => {
    return (
        <View style={[{ marginBottom: 16 }, style]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor="#666"
                style={[
                    {
                        backgroundColor: '#2C2C2E',
                        padding: 14,
                        borderRadius: 12,
                        fontSize: 16,
                        color: '#fff',
                        borderWidth: 1,
                        borderColor: error ? '#FF3B30' : '#3A3A3C',
                    },
                    inputStyle,
                ]}
                {...props}
            />
            {error && (
                <Text style={[{ color: '#FF3B30', marginTop: 4 }, errorStyle]}>
                    {error}
                </Text>
            )}
        </View>
    );
};