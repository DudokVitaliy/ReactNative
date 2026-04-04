import React from 'react';
import {
    ScrollView,
    ImageBackground,
    ActivityIndicator,
    View,
    Text,
    Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import {
    useGetCategoriesQuery,
    useDeleteCategoryMutation,
} from '@/services/categoryApi';
import { CustomButton } from '@/components/ui/CustomButton';
import { router } from 'expo-router';

export default function CategoryScreen() {

    const { data: categories, isLoading, error } = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [modalVisible, setModalVisible] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState<number | null>(null);
    const [localLoading, setLocalLoading] = React.useState(false);

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
        <>
            <ScrollView contentContainerStyle={{ padding: 16, paddingTop: 40 }}>
                <ThemedText type="title" style={{ marginBottom: 16 }}>
                    Categories
                </ThemedText>

                {categories?.map((category) => (
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
                            position: 'relative',
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
                                <ThemedText type="subtitle">
                                    {category.name}
                                </ThemedText>
                            </View>
                        )}

                        <CustomButton
                            title="Edit"
                            onPress={() => router.push(`/edit-category/${category.id}`)}
                            style={{
                                position: 'absolute',
                                top: 10,
                                left: 10,
                                backgroundColor: '#007bff',
                            }}
                            textStyle={{ color: '#fff' }}
                        />

                        <CustomButton
                            title="Delete"
                            onPress={() => {
                                setSelectedId(category.id);
                                setModalVisible(true);
                            }}
                            style={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                paddingVertical: 6,
                                paddingHorizontal: 12,
                                borderRadius: 8,
                                backgroundColor: 'red',
                            }}
                            textStyle={{ color: '#fff', fontWeight: 'bold' }}
                        />
                    </ThemedView>
                ))}
            </ScrollView>

            <Modal transparent={true} visible={modalVisible} animationType="fade">
                <View
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}
                >
                    <View
                        style={{
                            width: 300,
                            backgroundColor: '#fff',
                            borderRadius: 12,
                            padding: 20,
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 18, marginBottom: 16 }}>
                            Ви впевнені?
                        </Text>

                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                width: '100%',
                            }}
                        >
                            <CustomButton
                                title="Ні"
                                onPress={() => setModalVisible(false)}
                                style={{
                                    flex: 1,
                                    marginRight: 8,
                                    backgroundColor: '#ccc',
                                }}
                                textStyle={{ color: '#000' }}
                            />

                            <CustomButton
                                title="Так"
                                onPress={async () => {
                                    if (selectedId === null) return;

                                    try {
                                        setLocalLoading(true);

                                        await deleteCategory(selectedId).unwrap();

                                        setModalVisible(false);
                                        setLocalLoading(false);
                                    } catch (err) {
                                        console.log(err);
                                        setLocalLoading(false);
                                    }
                                }}
                                loading={localLoading}
                                style={{
                                    flex: 1,
                                    marginLeft: 8,
                                    backgroundColor: 'red',
                                }}
                                textStyle={{ color: '#fff' }}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}