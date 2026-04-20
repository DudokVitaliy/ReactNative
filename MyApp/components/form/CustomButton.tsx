import React from 'react';
import {
    TouchableOpacity,
    Text,
    TouchableOpacityProps,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
    title: string;
    variant?: 'primary' | 'secondary';
    loading?: boolean;
}

export default function CustomButton({
                                         title,
                                         variant = 'primary',
                                         loading = false,
                                         disabled,
                                         style,
                                         ...props
                                     }: CustomButtonProps) {
    const isPrimary = variant === 'primary';

    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={disabled || loading}
            style={[
                styles.button,
                { backgroundColor: isPrimary ? '#00D09E' : '#DFF7E2' },
                (disabled || loading) && { opacity: 0.5 },
                style,
            ]}
            {...props}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text style={[styles.text, { color: isPrimary ? '#093030' : '#0E3E3E' }]}>
                    {title}
                </Text>
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 220,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
    },
});