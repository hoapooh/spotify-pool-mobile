import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { useGetTracks } from "@/hooks/track/useGetTracks";
import TrackItem from "@/features/track/track-item";

const AllTracks = () => {
	const { tracks } = useGetTracks({ limit: 50 });

	return (
		<View className="flex-1 bg-dark-200 relative pt-16">
			<TouchableOpacity className="absolute top-5 left-5" onPress={() => router.back()}>
				<AntDesign name="arrowleft" size={26} color="white" />
			</TouchableOpacity>

			<Text className="text-white text-lg font-bold absolute top-6 left-1/2 -translate-x-1/2">
				All Popular Tracks
			</Text>

			<View className="px-5 w-full">
				<FlatList
					data={tracks}
					showsVerticalScrollIndicator={false}
					renderItem={({ item }) => <TrackItem track={item} />}
					keyExtractor={(item) => item.id.toString()}
				/>
			</View>
		</View>
	);
};

export default AllTracks;
