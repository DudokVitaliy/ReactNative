import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
                                                              title,
                                                              onPress,
                                                              loading = false,
                                                              disabled = false,
                                                              style,
                                                              textStyle,
                                                          }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
            style={[
                {
                    backgroundColor: disabled ? '#ccc' : '#FFD60A',
                    padding: 16,
                    borderRadius: 14,
                    alignItems: 'center',
                },
                style,
            ]}
            disabled={disabled || loading}
        >
            {loading ? (
                <ActivityIndicator color="#000" />
            ) : (
                <Text style={[{ color: '#000', fontSize: 16, fontWeight: '700' }, textStyle]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
};