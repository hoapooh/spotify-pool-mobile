import { ActivityIndicator, Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { usePushNoti } from "@/store/usePushNoti";
import { sendPushNotification } from "@/utils/sendPushNotification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthStore } from "@/store/useAuthStore";
import { useGetTracks } from "@/hooks/track/useGetTracks";
import TrackBox from "@/features/track/track-box";
import { Link, router } from "expo-router";
import MiniPlayer from "@/features/audio/mini-player";

const Home = () => {
	const { expoPushToken } = usePushNoti();
	const { setAuthentication } = useAuthStore();
	const { tracks, isLoadingTracks } = useGetTracks({ limit: 10 });

	if (isLoadingTracks)
		return <ActivityIndicator size="large" color={"#1ed760"} className="flex-1" />;

	return (
		<SafeAreaView className="bg-dark-200 relative h-full border-b">
			<View className="px-5 h-full">
				<View className="flex-row items-center justify-between mb-5">
					<Text className="text-2xl text-white font-bold ">Popular Tracks</Text>
					<TouchableOpacity onPress={() => router.push("/all-tracks")}>
						<Text className="text-secondary-100 text-base">Show all</Text>
					</TouchableOpacity>
				</View>

				{/* List of Tracks */}
				<FlatList
					data={tracks}
					horizontal
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={{ gap: 15 }}
					renderItem={({ item }) => <TrackBox track={item} />}
				/>
				{/* <View>
						<Button
							title="Press to Send Notification"
							onPress={async () => {
								await sendPushNotification(expoPushToken);
							}}
						/>
					</View> */}
			</View>
		</SafeAreaView>
	);
};

export default Home;
