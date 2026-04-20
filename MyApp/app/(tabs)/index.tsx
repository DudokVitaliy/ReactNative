import {Image} from 'expo-image';
import {
    Alert,
    Button,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from 'expo-router';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import {ThemedView} from '@/components/themed-view';
import {ICategoryResponse} from "@/types/ICategoryResponse";
import {
    useDeleteCategoryMutation,
    useGetCategoriesQuery
} from "@/services/categoryApi";
import {IMAGES_URL} from "@/constants/urls";

export default function HomeScreen() {
    const {data, isLoading} = useGetCategoriesQuery();
    const [deleteCategory] = useDeleteCategoryMutation();

    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await AsyncStorage.getItem("token");
            setIsAuth(!!token);
        };

        checkAuth();
    }, []);

    const deleteHandler = async (id: string) => {
        try {
            //await deleteCategory(id).unwrap();
        } catch (e) {
            console.log("error", e);
        }
    };

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        setIsAuth(false);
    };

    return (
        <ParallaxScrollView
            headerBackgroundColor={{light: '#A1CEDC', dark: '#1D3D47'}}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
        >

            {/* NAVIGATION */}
            <View style={{gap: 10, marginBottom: 10}}>
                <Button
                    onPress={() => router.push("/auth/login")}
                    title="Login"
                />

                <Button
                    onPress={() => router.push("/auth/register")}
                    title="Register"
                />

                {isAuth && (
                    <>
                        <Button
                            onPress={() => router.push("/profile")}
                            title="Profile"
                        />

                        <Button
                            onPress={logout}
                            title="Logout"
                            color="red"
                        />
                    </>
                )}
            </View>

            {/* CATEGORIES */}
            <ThemedView className="px-5 pt-5 flex-row flex-wrap justify-between">
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : (
                    data?.map((category: ICategoryResponse) => (
                        <View
                            key={category.id}
                            className="bg-white dark:bg-neutral-900 rounded-2xl shadow w-[48%] mb-4 overflow-hidden"
                        >
                            <Image
                                source={{ uri: IMAGES_URL + `/${category.image}` }}
                                contentFit="cover"
                                style={{ width: '100%', height: 128 }}
                            />

                            <View className="p-3">
                                <Text className="font-bold text-base dark:text-white">
                                    {category.name}
                                </Text>

                                <Text
                                    className="text-gray-500 text-sm mt-1"
                                    numberOfLines={3}
                                >
                                    {category.description}
                                </Text>

                                <TouchableOpacity
                                    className="py-3 rounded-full bg-red-600 mt-3"
                                    onPress={() => {
                                        Alert.alert(
                                            "Delete Category",
                                            `Delete "${category.name}"?`,
                                            [
                                                {text: "Cancel", style: "cancel"},
                                                {
                                                    text: "Delete",
                                                    style: "destructive",
                                                    onPress: () =>
                                                        deleteHandler(category.id),
                                                },
                                            ]
                                        );
                                    }}
                                >
                                    <Text className="text-white text-center">
                                        Видалити
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                )}
            </ThemedView>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    reactLogo: {
        height: 28,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});