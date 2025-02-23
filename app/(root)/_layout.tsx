import { useAuthStore } from "@/store/useAuthStore";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
	const { isAuthenticated } = useAuthStore();

	useEffect(() => {
		if (!isAuthenticated) {
			router.replace("/welcome");
		}
	}, [isAuthenticated]);

	return <Stack screenOptions={{ headerShown: false }} />;
}
