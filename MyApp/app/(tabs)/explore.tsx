import React, { useState } from 'react';
import { ScrollView, View, } from 'react-native';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';
import { CustomInput } from '@/components/ui/CustomInput';
import { CustomButton } from '@/components/ui/CustomButton';
import AvatarPicker from '@/components/ui/AvatarPicker';
import { IImageFile } from '@/types/IImageFile';
import { useAddCategoryMutation } from '@/services/categoryApi';
import { serialize } from 'object-to-formdata';

interface Errors {
    name?: string;
    categoryImage?: string;
    general?: string;
}

export default function ExploreScreen() {
    const [userAvatar, setUserAvatar] = useState<IImageFile | null>(null);
    const [categoryImage, setCategoryImage] = useState<IImageFile | null>(null);
    const [name, setName] = useState('');
    const [errors, setErrors] = useState<Errors>({});

    const [addCategory, { isLoading }] = useAddCategoryMutation();

    const validate = (): Errors => {
        const newErrors: Errors = {};
        if (!name.trim()) newErrors.name = 'Name is required';
        else if (name.trim().length < 3) newErrors.name = 'Minimum 3 characters';
        if (!categoryImage) newErrors.categoryImage = 'Category image is required';
        return newErrors;
    };

    const handleSubmit = async () => {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const data = { name, categoryImage };
            const formData = serialize(data);
            await addCategory(formData as any).unwrap();

            setName('');
            setCategoryImage(null);
            setErrors({ general: 'Category created! ✅' });
        } catch {
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
            }}>
            <ThemedView
                style={{
                    backgroundColor: '#1C1C1E',
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#FFD60A',
                    margin: 10
                }}
            >
            <ThemedText className="text-yellow-400 text-4xl font-bold text-center mb-8">
                Select Avatar
            </ThemedText>
            <View>
                <AvatarPicker image={userAvatar?.uri || null} onChange={setUserAvatar} />
            </View>
            </ThemedView>
            <ThemedView
                style={{
                    backgroundColor: '#1C1C1E',
                    padding: 20,
                    borderRadius: 20,
                    borderWidth: 2,
                    borderColor: '#FFD60A',
                    margin: 10
                }}
            >
            <ThemedText className="text-yellow-400 text-4xl font-bold text-center mb-8">
                Add Category
            </ThemedText>

            <View className="bg-[#1C1C1E] p-6 rounded-2xl border border-[#2C2C2E]">
                {errors.general && errors.general.includes('✅') && (
                    <ThemedText className="text-green-500 mb-4 text-center">{errors.general}</ThemedText>
                )}

                <CustomInput
                    value={name}
                    onChangeText={(text) => {
                        setName(text);
                        setErrors((prev) => ({ ...prev, name: undefined, general: undefined }));
                    }}
                    placeholder="Enter category name"
                    error={errors.name}
                />

                <ThemedText className="text-white font-semibold mb-3 text-center">
                    Select category Image
                </ThemedText>

                <View className="items-center mb-4">
                    <AvatarPicker
                        image={categoryImage?.uri || null}
                        onChange={(file) => {
                            setCategoryImage(file);
                            setErrors((prev) => ({ ...prev, categoryImage: undefined, general: undefined }));
                        }}
                    />
                    {errors.categoryImage && (
                        <ThemedText className="text-red-500 mt-2 text-center">{errors.categoryImage}</ThemedText>
                    )}
                </View>

                {/* Create button */}
                <CustomButton
                    title="Create Category"
                    onPress={handleSubmit}
                    loading={isLoading}
                    style={{ marginTop: 20 }}
                />

                {/* General error */}
                {errors.general && !errors.general.includes('✅') && (
                    <ThemedText className="text-red-500 mt-4 text-center">{errors.general}</ThemedText>
                )}
            </View>
            </ThemedView>
        </ScrollView>
    );
}