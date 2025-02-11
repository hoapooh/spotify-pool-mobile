import { Stack } from "expo-router"
import "./global.css"
import * as SplashScreen from "expo-splash-screen"
import { useEffect } from "react"

SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
	useEffect(() => {
		SplashScreen.hideAsync()
	}, [])

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="(root)" />
			<Stack.Screen name="(auth)" />
		</Stack>
	)
}
