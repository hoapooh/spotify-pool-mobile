import "./global.css";
import { useEffect } from "react";
import { Stack } from "expo-router";
import Toast from "react-native-toast-message";
import * as SplashScreen from "expo-splash-screen";
// import { usePushNotiSetup } from "@/store/usePushNoti";
import * as Notifications from "expo-notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: true,
	}),
});

const queryClient = new QueryClient();

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
	const { checkAuthentication } = useAuthStore();
	// TODO: uncomment this later
	// usePushNotiSetup(); // ✅ Initialize push notifications globally

	useEffect(() => {
		checkAuthentication();
		SplashScreen.hideAsync();
	}, []);

	return (
		<QueryClientProvider client={queryClient}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="index" />
				<Stack.Screen name="(root)" />
				<Stack.Screen name="(auth)" />
			</Stack>
			<Toast />
		</QueryClientProvider>
	);
}
