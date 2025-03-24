import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	Button,
	ActivityIndicator,
	TextInput,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Filters from "@/components/Filters";
import { Feather } from "@expo/vector-icons";
import CustomPlaylistCard from "@/components/custom-playlist-card";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import CustomBottomSheet from "@/components/custom-bottom-sheet";
import { useGetMyPlaylist } from "@/hooks/playlist/useGetMyPlaylist";

const dumpData = [
	{
		playlistName: "Liked Songs",
		playlistCategory: "Playlist",
		displayname: "Playlist",
	},
];

const YourLibrary = () => {
	// NOTE: snap points is the percentage of the screen height
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const snapPoints = useMemo(() => ["15%"], []);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const { myPlaylist, isLoadingPlaylist } = useGetMyPlaylist();

	if (isLoadingPlaylist)
		return (
			<View className="flex-1 items-center justify-center">
				<ActivityIndicator size="large" color="#1ed760" />
			</View>
		);

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

						<View className="flex-row items-center gap-3">
							<TouchableOpacity onPress={handlePresentModalPress} className={"mr-3"}>
								<Feather name="plus" size={20} color="white" />
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {}}>
								<Feather name="layout" size={20} color="white" />
							</TouchableOpacity>
						</View>
					</View>

					{/* === Playlist cards === */}
					<FlatList
						data={myPlaylist}
						className="mt-5 gap-2"
						contentContainerStyle={{ gap: 16 }}
						renderItem={({ item }) => (
							<CustomPlaylistCard
								playlistName={item.name}
								images={item.images[1].url}
								displayname="Playlist"
							/>
						)}
					/>

					{/* === Bottom Sheet === */}
					<CustomBottomSheet bottomSheetRef={bottomSheetModalRef} snapPoints={snapPoints}>
						<View className="w-full">
							<View className="w-full">
								<Text className="text-white text-lg font-bold mb-4">Name</Text>
								<TextInput
									placeholder="Playlist Name"
									className="bg-dark-400 text-white placeholder:text-white p-3 rounded-lg"
								/>
							</View>

							<View className="w-full">
								<Text className="text-white text-lg font-bold mb-4">Description</Text>
								<TextInput
									placeholder="Playlist Name"
									className="bg-dark-400 text-white placeholder:text-white p-3 rounded-lg"
								/>
							</View>
						</View>
					</CustomBottomSheet>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default YourLibrary;
