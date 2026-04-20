import {View} from "react-native";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserLoginFormData, userLoginSchema} from "@/schemas/userLoginSchema";
import {Controller, useForm} from "react-hook-form";
import FormLayout from "@/components/layouts/FormLayout";
import CustomInput from "@/components/form/CustomInput";
import CustomButton from "@/components/form/CustomButton";
import {useRouter} from "expo-router";
import {useLoginMutation} from "@/services/authApi";
import AsyncStorage from '@react-native-async-storage/async-storage';

type AuthResponse = {
    accessToken: string;
};

const LoginScreen = () => {
    const router = useRouter();

    const [login, { isLoading }] = useLoginMutation();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm<UserLoginFormData>({
        resolver: zodResolver(userLoginSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const handleLogin = async (values: UserLoginFormData) => {
        try {
            const response = await login(values).unwrap()

            await AsyncStorage.setItem("token", response.accessToken);

            console.log("TOKEN:", response.accessToken);

            router.push("/");
        } catch (error: any) {
            console.log("Error login", error?.data || error);
        }
    };

    return (
        <FormLayout title="Login">
            <View className="items-center w-full">

                <View className="w-full max-w-[320px] gap-3">

                    <Controller
                        control={control}
                        name="email"
                        render={({field: {onChange, onBlur, value}}) => (
                            <CustomInput
                                label="Пошта"
                                placeholder="Введіть пошту"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.email?.message}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({field: {onChange, onBlur, value}}) => (
                            <CustomInput
                                label="Пароль"
                                placeholder="Введіть пароль"
                                onBlur={onBlur}
                                onChangeText={onChange}
                                value={value}
                                error={errors.password?.message}
                                autoCapitalize="none"
                                secureTextEntry
                            />
                        )}
                    />

                    <View className="items-center w-full mt-4 gap-3">
                        <CustomButton
                            onPress={handleSubmit(handleLogin)}
                            title={isLoading ? "Завантаження..." : "Увійти"}
                            disabled={isLoading}
                        />

                        <CustomButton
                            title="Скасувати"
                            variant="secondary"
                            onPress={() => router.push('/')}
                        />
                    </View>

                </View>
            </View>
        </FormLayout>
    );
};

export default LoginScreen;