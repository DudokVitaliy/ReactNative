import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAddCategoryMutation } from '@/services/categoryApi';
import { CustomInput } from '@/components/ui/CustomInput';
import { CustomButton } from '@/components/ui/CustomButton';

interface Errors {
    name?: string;
    imageUrl?: string;
    general?: string;
}

export default function ExploreScreen() {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [errors, setErrors] = useState<Errors>({});

    const [addCategory, { isLoading }] = useAddCategoryMutation();

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        else if (name.length < 3) newErrors.name = 'Minimum 3 characters';

        if (imageUrl && !/^https?:\/\/.+\..+/.test(imageUrl)) newErrors.imageUrl = 'Invalid image URL';

        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await addCategory({ name, imageUrl }).unwrap();

            setName('');
            setImageUrl('');
            setErrors({ general: 'Category created! ✅' });
        } catch (err) {
            setErrors({ general: 'Failed to create category' });
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

                {/* SUCCESS MESSAGE ONLY */}
                {errors.general && errors.general.includes('✅') && (
                    <ThemedText
                        style={{
                            color: '#4CAF50',
                            marginBottom: 12,
                            textAlign: 'center',
                        }}
                    >
                        {errors.general}
                    </ThemedText>
                )}

                {/* NAME */}
                <CustomInput
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        setErrors((prev) => ({ ...prev, name: undefined, general: undefined }));
                    }}
                    placeholder="Enter category name"
                    error={errors.name}
                />

                {/* IMAGE URL */}
                <CustomInput
                    value={imageUrl}
                    onChangeText={(text) => {
                        setImageUrl(text);
                        setErrors((prev) => ({ ...prev, imageUrl: undefined, general: undefined }));
                    }}
                    placeholder="https://example.com/image.jpg"
                    error={errors.imageUrl}
                />

                {/* BUTTON */}
                <CustomButton
                    title="Create Category"
                    onPress={handleSubmit}
                    loading={isLoading}
                />

                {/* GENERAL ERROR */}
                {errors.general && !errors.general.includes('✅') && (
                    <ThemedText
                        style={{
                            color: '#FF3B30',
                            marginTop: 12,
                            textAlign: 'center',
                        }}
                    >
                        {errors.general}
                    </ThemedText>
                )}
            </ThemedView>
        </ScrollView>
    );
}