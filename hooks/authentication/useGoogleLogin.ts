import { googleLoginApi } from "@/services/authApi";
import { useAuthStore } from "@/store/useAuthStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export const useGoogleLogin = () => {
	const { setAuthentication } = useAuthStore();

	const { mutate: googleLogin, isPending: isLoggingInGoogle } = useMutation({
		mutationFn: (googleToken: string) => googleLoginApi(googleToken),
		onSuccess: (data) => {
			Toast.show({
				type: "success",
				text1: "Login",
				text2: "Login successful 🎉",
				visibilityTime: 2000,
			});

			// console.log(JSON.stringify(data, null, 2));

			AsyncStorage.setItem("access_token", data.token.accessToken);
			setAuthentication(true);

			router.replace("/home");
		},
		onError: (error) => {
			Toast.show({
				type: "error",
				text1: "Login",
				text2: error.message,
			});
		},
	});

	return { googleLogin, isLoggingInGoogle };
};
