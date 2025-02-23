import { Button, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePushNoti } from "@/store/usePushNoti";
import { sendPushNotification } from "@/utils/sendPushNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/useAuthStore";

const Home = () => {
	const { expoPushToken, notification } = usePushNoti();
	const { setAuthentication } = useAuthStore();

	return (
		<SafeAreaView className="bg-dark-200 flex-1">
			<View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }}>
				<Text className="text-white">Your Expo push token: {expoPushToken}</Text>
				<View style={{ alignItems: "center", justifyContent: "center" }}>
					<Text className="text-white">
						Title: {notification && notification.request.content.title}{" "}
					</Text>
					<Text className="text-white">
						Body: {notification && notification.request.content.body}
					</Text>
					<Text className="text-white">
						Data: {notification && JSON.stringify(notification.request.content.data)}
					</Text>
				</View>
				<Button
					title="Press to Send Notification"
					onPress={async () => {
						await sendPushNotification(expoPushToken);
					}}
				/>

				<Button
					title="Press to clear AsyncStorage"
					onPress={async () => {
						await AsyncStorage.clear();
						setAuthentication(false);
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default Home;
