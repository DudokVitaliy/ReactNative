import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ActivityIndicator,
    Alert,
    ScrollView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

import AvatarPicker from '@/components/ui/AvatarPicker';
import { CustomButton } from '@/components/ui/CustomButton';

import {
    useGetCategoryByIdQuery,
    useUpdateCategoryMutation,
} from '@/services/categoryApi';

import { IImageFile } from '@/types/IImageFile';

export default function EditCategoryScreen() {
    const { id } = useLocalSearchParams();

    const rawId = Array.isArray(id) ? id[0] : id;
    const categoryId = rawId ? Number(rawId) : undefined;

    const { data: category, isLoading } = useGetCategoryByIdQuery(categoryId!, {
        skip: categoryId === undefined,
    });

    const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

    const [name, setName] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [file, setFile] = useState<IImageFile | null>(null);

    useEffect(() => {
        if (category) {
            setName(category.name);
            setImage(category.imageUrl || null);
        }
    }, [category]);

    const validate = () => {
        if (!name.trim()) {
            Alert.alert('Помилка', 'Назва обовʼязкова');
            return false;
        }

        if (name.trim().length < 2) {
            Alert.alert('Помилка', 'Мінімум 2 символи');
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        if (!validate() || !categoryId) return;

        try {
            const formData = new FormData();

            formData.append('id', String(categoryId));
            formData.append('name', name.trim());

            if (file) {
                formData.append('CategoryImage', {
                    uri: file.uri,
                    name: file.name,
                    type: file.type,
                } as any);
            }
            const updated = await updateCategory(formData).unwrap();

            setName(updated.name);
            setImage(updated.imageUrl || null);

            Alert.alert('Успішно', 'Категорію оновлено');
            router.back();
        } catch (err) {
            console.log(err);
            Alert.alert('Помилка', 'Не вдалося оновити категорію');
        }
    };

    if (isLoading || !category) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 p-6 bg-black dark:bg-black">
            <View className="mb-6 justify-center items-center">
                <Text className="text-xl font-semibold mb-5 text-gray-900 dark:text-white">
                    Змінити назву категорії
                </Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Введіть назву"
                    placeholderTextColor="#888"
                    className="mb-4 border border-gray-300 dark:border-gray-600 rounded-xl p-4 text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-800"
                />
            </View>

            <View className="mb-6 justify-center items-center border border-gray-300 dark:border-yellow-500 rounded-xl">
                <Text className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    Змінити фото категорії
                </Text>
                <AvatarPicker
                    image={file ? file.uri : image} // превʼю: нове фото або старе
                    onChange={(selectedFile: IImageFile) => {
                        setFile(selectedFile);
                        setImage(selectedFile.uri); // превʼю одразу
                    }}
                />
            </View>

            <CustomButton
                title="Зберегти"
                onPress={handleSave}
                loading={isUpdating}
                disabled={!name.trim()}
            />
        </ScrollView>
    );
}