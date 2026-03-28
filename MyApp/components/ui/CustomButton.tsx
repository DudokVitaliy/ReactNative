import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleProp, ViewStyle } from 'react-native';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: StyleProp<ViewStyle>;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
                                                              title,
                                                              onPress,
                                                              loading = false,
                                                              disabled = false,
                                                              style,
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
                <Text style={{ color: '#000', fontSize: 16 }}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};