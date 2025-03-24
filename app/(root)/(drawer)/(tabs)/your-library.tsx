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
import { useCreatePLaylist } from "@/hooks/playlist/useCreatePlaylist";

const YourLibrary = () => {
	// NOTE: snap points is the percentage of the screen height
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	// const snapPoints = useMemo(() => ["15%"], []);
	const [playlistName, setPlaylistName] = React.useState("");
	const [playlistDescription, setPlaylistDescription] = React.useState("");

	const { createPlaylistMutation, isCreatingPlaylist } = useCreatePLaylist();
	const { myPlaylist, isLoadingPlaylist } = useGetMyPlaylist();

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	const handleCreatePlaylist = useCallback(() => {
		if (playlistName.trim()) {
			createPlaylistMutation({
				playlistName: playlistName,
				description: playlistDescription || "",
			});

			setPlaylistName("");
			setPlaylistDescription("");
			bottomSheetModalRef.current?.close();
		}
	}, [playlistName, playlistDescription, createPlaylistMutation]);

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
						ListEmptyComponent={() => (
							<View className="flex-1 items-center justify-center py-16">
								<View className="bg-dark-300 rounded-full p-6 mb-6">
									<Feather name="music" size={48} color="#1DB954" />
								</View>
								<Text className="text-white text-xl font-bold mb-2">No playlists yet</Text>
								<Text className="text-secondary-100 text-center mb-8 px-6">
									Your created and followed playlists will appear here
								</Text>
								<TouchableOpacity
									onPress={handlePresentModalPress}
									className="bg-white rounded-full py-3 px-8 flex-row items-center"
								>
									<Feather name="plus" size={18} color="#000" className="mr-2" />
									<Text className="text-black font-bold">Create playlist</Text>
								</TouchableOpacity>
							</View>
						)}
					/>

					{/* === Bottom Sheet === */}
					<CustomBottomSheet bottomSheetRef={bottomSheetModalRef}>
						<View className="w-full">
							<View className="w-full">
								<Text className="text-white text-lg font-bold mb-4">Name</Text>
								<TextInput
									placeholder="Playlist Name"
									className="bg-dark-400 text-white placeholder:text-gray-400 p-3 rounded-lg"
									placeholderTextColor="#757575"
									value={playlistName}
									onChangeText={setPlaylistName}
								/>
							</View>

							<View className="w-full mt-3">
								<Text className="text-white text-lg font-bold mb-4">Description</Text>
								<TextInput
									placeholder="Describe your playlist"
									className="bg-dark-400 text-white placeholder:text-gray-400 p-3 rounded-lg"
									placeholderTextColor="#757575"
									value={playlistDescription}
									onChangeText={setPlaylistDescription}
									multiline
									numberOfLines={3}
								/>
							</View>

							<TouchableOpacity
								onPress={handleCreatePlaylist}
								disabled={isCreatingPlaylist || !playlistName.trim()}
								className={`w-full mt-5 py-3 rounded-full flex items-center justify-center ${
									!playlistName.trim() ? "bg-gray-600" : "bg-[#1DB954]"
								}`}
							>
								{isCreatingPlaylist ? (
									<ActivityIndicator color="white" size="small" />
								) : (
									<Text className="text-white font-bold text-base">Create Playlist</Text>
								)}
							</TouchableOpacity>
						</View>
					</CustomBottomSheet>
				</View>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
};

export default YourLibrary;
