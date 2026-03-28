import React, { useState } from 'react';
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    View,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAddCategoryMutation } from '@/services/categoryApi';

export default function TabTwoScreen() {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState('');

    const [addCategory, { isLoading }] = useAddCategoryMutation();

    const validate = () => {
        if (!name.trim()) return 'Name is required';
        if (name.length < 3) return 'Minimum 3 characters';

        if (imageUrl && !/^https?:\/\/.+\..+/.test(imageUrl)) {
            return 'Invalid image URL';
        }

        return null;
    };

    const handleSubmit = async () => {
        const errorMessage = validate();

        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        try {
            await addCategory({ name, imageUrl }).unwrap();

            setName('');
            setImageUrl('');
            setError('Category created!');
        } catch (err) {
            setError('Failed to create category');
        }
    };

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'center',
                padding: 20,
                backgroundColor: '#0F0F0F',
            }}
        >
            <ThemedView
                style={{
                    backgroundColor: '#1C1C1E',
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: '#2C2C2E',
                }}
            >
                {/* TITLE */}
                <ThemedText
                    type="title"
                    style={{
                        marginBottom: 20,
                        textAlign: 'center',
                        color: '#FFD60A',
                    }}
                >
                    Add Category
                </ThemedText>

                {/* ERROR / SUCCESS */}
                {error ? (
                    <ThemedText
                        style={{
                            color: error.includes('✅') ? '#4CAF50' : '#FF3B30',
                            marginBottom: 12,
                            textAlign: 'center',
                        }}
                    >
                        {error}
                    </ThemedText>
                ) : null}

                {/* NAME */}
                <View style={{ marginBottom: 16 }}>
                    <ThemedText style={{ marginBottom: 6, color: '#aaa' }}>
                        Name
                    </ThemedText>
                    <TextInput
                        placeholder="Enter category name"
                        placeholderTextColor="#666"
                        value={name}
                        onChangeText={(text) => {
                            setName(text);
                            setError('');
                        }}
                        style={{
                            backgroundColor: '#2C2C2E',
                            padding: 14,
                            borderRadius: 12,
                            fontSize: 16,
                            color: '#fff',
                            borderWidth: 1,
                            borderColor: '#3A3A3C',
                        }}
                    />
                </View>

                {/* IMAGE URL */}
                <View style={{ marginBottom: 20 }}>
                    <ThemedText style={{ marginBottom: 6, color: '#aaa' }}>
                        Image URL
                    </ThemedText>
                    <TextInput
                        placeholder="https://example.com/image.jpg"
                        placeholderTextColor="#666"
                        value={imageUrl}
                        onChangeText={(text) => {
                            setImageUrl(text);
                            setError('');
                        }}
                        style={{
                            backgroundColor: '#2C2C2E',
                            padding: 14,
                            borderRadius: 12,
                            fontSize: 16,
                            color: '#fff',
                            borderWidth: 1,
                            borderColor: '#3A3A3C',
                        }}
                    />
                </View>

                {/* BUTTON */}
                <TouchableOpacity
                    onPress={handleSubmit}
                    activeOpacity={0.8}
                    style={{
                        backgroundColor: '#FFD60A',
                        padding: 16,
                        borderRadius: 14,
                        alignItems: 'center',
                    }}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#000" />
                    ) : (
                        <ThemedText style={{ color: '#000', fontSize: 16 }}>
                            Create Category
                        </ThemedText>
                    )}
                </TouchableOpacity>
            </ThemedView>
        </ScrollView>
    );
}