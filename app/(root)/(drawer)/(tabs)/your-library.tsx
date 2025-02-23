import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Filters from "@/components/Filters";
import { Feather } from "@expo/vector-icons";
import CustomPlaylistCard from "@/components/CustomPlaylistCard";

const dumpData = [
	{
		playlistName: "Liked Songs",
		playlistCategory: "Playlist",
		displayname: "Playlist",
	},
];

const YourLibrary = () => {
	return (
		<SafeAreaView className="bg-dark-200 flex-1">
			<View className="mx-4">
				{/* === Filter === */}
				<Filters />

				{/* === Recents filter === */}
				<View className="flex-row items-center justify-between mt-4">
					<View>
						<TouchableOpacity onPress={() => {}} className="flex flex-row gap-2 items-center">
							<Feather name="sliders" size={16} color="white" />
							<Text className="font-bold text-white text-base">Recents</Text>
						</TouchableOpacity>
					</View>
					<TouchableOpacity onPress={() => {}}>
						<Feather name="layout" size={16} color="white" />
					</TouchableOpacity>
				</View>

				{/* === Playlist cards === */}
				<FlatList
					data={dumpData}
					className="mt-5"
					renderItem={() => (
						<CustomPlaylistCard
							playlistName="Liked Songs"
							playlistCategory="Playlist"
							displayname="Playlist"
						/>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default YourLibrary;
