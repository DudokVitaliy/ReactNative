import React from 'react';
import { ScrollView, ImageBackground, ActivityIndicator, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useGetCategoriesQuery } from '@/services/categoryApi';

export default function CategoryScreen() {
    const { data: categories, isLoading, error } = useGetCategoriesQuery();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ThemedText>Error loading categories</ThemedText>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40 }}>
            <ThemedText type="title" style={{ marginBottom: 16 }}>
                Categories
            </ThemedText>

            {categories?.map(category => (
                <ThemedView
                    key={category.id}
                    style={{
                        marginBottom: 24,
                        borderRadius: 16,
                        overflow: 'hidden',
                        elevation: 3,
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.2,
                        shadowRadius: 4,
                    }}
                >
                    {category.imageUrl ? (
                        <ImageBackground
                            source={{ uri: category.imageUrl }}
                            style={{ width: '100%', height: 180, justifyContent: 'flex-end' }}
                        >
                            <LinearGradient
                                colors={['transparent', 'rgba(0,0,0,0.6)']}
                                style={{ padding: 12 }}
                            >
                                <ThemedText
                                    type="subtitle"
                                    style={{ color: '#fff', fontSize: 18 }}
                                >
                                    {category.name}
                                </ThemedText>
                            </LinearGradient>
                        </ImageBackground>
                    ) : (
                        <View style={{ padding: 12, backgroundColor: '#f0f0f0' }}>
                            <ThemedText type="subtitle">{category.name}</ThemedText>
                        </View>
                    )}
                </ThemedView>
            ))}
        </ScrollView>
    );
}