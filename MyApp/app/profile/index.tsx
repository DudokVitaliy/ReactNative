import { View, Text, Button, Image } from "react-native";
import { useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import { jwtDecode } from "jwt-decode";

type User = {
    email: string;
    id: string;
    name: string;
    image?: string;
    roles: string[];
};

export default function ProfileScreen() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            let isMounted = true;

            const loadUser = async () => {
                setLoading(true);

                try {
                    const token = await AsyncStorage.getItem("token");
                    console.log("token:", token);

                    if (!token) {
                        router.replace("/auth/login");
                        return;
                    }

                    const decoded: any = jwtDecode(token);
                    console.log("DECODED:", decoded);

                    if (!isMounted) return;

                    setUser({
                        email: decoded.email ?? "",
                        id: decoded.id ?? "",
                        name: decoded.name ?? "",
                        image: decoded.image ?? undefined,
                        roles: Array.isArray(decoded.role)
                            ? decoded.role
                            : decoded.role
                                ? [decoded.role]
                                : [],
                    });
                } catch (e) {
                    console.log("DECODE ERROR:", e);
                    await AsyncStorage.removeItem("token");
                    router.replace("/auth/login");
                } finally {
                    if (isMounted) setLoading(false);
                }
            };

            loadUser();

            return () => {
                isMounted = false;
            };
        }, [])
    );

    const logout = async () => {
        await AsyncStorage.removeItem("token");
        router.replace("/auth/login");
    };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center">
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#0f172a", // темний фон
            justifyContent: "center",
            alignItems: "center",
            padding: 20
        }}>

            <Text style={{
                fontSize: 26,
                fontWeight: "bold",
                color: "#f1f5f9",
                marginBottom: 20
            }}>
                Profile
            </Text>

            {user && (
                <View style={{
                    width: "100%",
                    maxWidth: 320,
                    backgroundColor: "#1e293b",
                    padding: 20,
                    borderRadius: 16,
                    alignItems: "center",
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowRadius: 10,
                    elevation: 5
                }}>

                    {user.image && (
                        <Image
                            source={{ uri: user.image }}
                            style={{
                                width: 90,
                                height: 90,
                                borderRadius: 45,
                                marginBottom: 15,
                                borderWidth: 2,
                                borderColor: "#38bdf8"
                            }}
                        />
                    )}

                    <Text style={{ color: "#94a3b8", marginBottom: 4 }}>
                        Email
                    </Text>
                    <Text style={{ color: "#f1f5f9", marginBottom: 10 }}>
                        {user.email}
                    </Text>

                    <Text style={{ color: "#94a3b8", marginBottom: 4 }}>
                        Name
                    </Text>
                    <Text style={{ color: "#f1f5f9", marginBottom: 10 }}>
                        {user.name}
                    </Text>

                    <Text style={{ color: "#94a3b8", marginBottom: 4 }}>
                        Roles
                    </Text>
                    <Text style={{ color: "#38bdf8", marginBottom: 10 }}>
                        {user.roles.join(", ")}
                    </Text>

                    <Text style={{ color: "#64748b", fontSize: 12 }}>
                        ID: {user.id}
                    </Text>
                </View>
            )}

            <View style={{ marginTop: 25, width: "100%", maxWidth: 320 }}>
                <Button title="Logout" onPress={logout} color="#ef4444" />
            </View>
        </View>
    );
}