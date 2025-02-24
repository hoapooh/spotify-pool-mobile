import { View, Text, FlatList, TouchableOpacity, Button } from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Filters from "@/components/Filters";
import { Feather } from "@expo/vector-icons";
import CustomPlaylistCard from "@/components/custom-playlist-card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/custom-bottom-sheet";

const dumpData = [
	{
		playlistName: "Liked Songs",
		playlistCategory: "Playlist",
		displayname: "Playlist",
	},
];

const YourLibrary = () => {
	// ref
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// NOTE: snap points is the percentage of the screen height
	const snapPoints = useMemo(() => ["15%"], []);

	// callbacks
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return (
		<GestureHandlerRootView>
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

					{/* === Bottom Sheet === */}
					<TouchableOpacity
						activeOpacity={0.8}
						onPress={handlePresentModalPress}
						className="mt-4 rounded-md bg-primary-100 py-3 px-4"
					>
						<Text className="text-lg font-bold">Present Modal</Text>
					</TouchableOpacity>

					<CustomBottomSheet bottomSheetRef={bottomSheetModalRef} snapPoints={snapPoints}>
						<TouchableOpacity
							activeOpacity={0.8}
							className="w-full flex flex-row items-center gap-3"
						>
							<Feather name="music" size={28} color={"#b2b2b2"} />
							<View>
								<Text className="text-white text-xl font-semibold">Playlist</Text>
								<Text className="text-base text-secondary-100">Build a playlist with songs</Text>
							</View>
						</TouchableOpacity>
					</CustomBottomSheet>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default YourLibrary;
