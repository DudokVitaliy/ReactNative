import React, { useEffect, useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import type { Category } from '@/types/category';

export default function CategoryScreen() {
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        fetch('http://192.168.0.4:5268/api/category')
            .then(res => res.json())
            .then((data: Category[]) => setCategories(data))
            .catch(err => console.error(err));
    }, []);

    return (
        <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40 }}>
            <ThemedText type="title" style={{ marginBottom: 16 }}>
                Categories
            </ThemedText>

            {categories.length === 0 ? (
                <ThemedText>Loading...</ThemedText>
            ) : (
                categories.map(category => (
                    <ThemedView
                        key={category.id}
                        style={{
                            marginBottom: 24,
                            padding: 12,
                            borderRadius: 12,
                            backgroundColor: '#f0f0f0',
                        }}
                    >
                        <ThemedText type="subtitle" style={{ marginBottom: 8 }}>
                            {category.name}
                        </ThemedText>
                        {category.imageUrl && (
                            <Image
                                source={{ uri: category.imageUrl }}
                                style={{ width: '100%', height: 150, borderRadius: 12 }}
                                resizeMode="cover"
                            />
                        )}
                    </ThemedView>
                ))
            )}
        </ScrollView>
    );
}