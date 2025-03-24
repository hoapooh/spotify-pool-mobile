import { FlatList, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/search-input";
import TrackItem from "@/features/track/track-item";
import { useGetTracks } from "@/hooks/track/useGetTracks";
import { Feather } from "@expo/vector-icons";

const Search = () => {
	const [searchText, setSearchText] = useState("");

	const { tracks } = useGetTracks({ searchTerm: searchText });

	const handleSearch = (text: string) => {
		setSearchText(text);
	};

	return (
		<SafeAreaView className="bg-dark-200 flex-1">
			<View className="px-5 h-full relative">
				<SearchInput searchText={searchText} handleSearch={handleSearch} />

				{searchText.trim() === "" ? (
					<View className="flex-1 items-center justify-center">
						<Feather name="music" size={64} color="#1DB954" />
						<Text className="text-white text-lg font-medium mt-4 text-center">
							Enter a search query to find your favorite music
						</Text>
					</View>
				) : tracks && tracks.length > 0 ? (
					<FlatList
						data={tracks}
						contentContainerStyle={{ paddingVertical: 20 }}
						showsVerticalScrollIndicator={false}
						renderItem={({ item }) => <TrackItem track={item} />}
						keyExtractor={(item) => item.id.toString()}
						ListEmptyComponent={
							<View className="flex-1 items-center justify-center">
								<Text className="text-white text-lg font-medium">No results found</Text>
							</View>
						}
					/>
				) : (
					<View className="flex-1 items-center justify-center">
						<Text className="text-white text-lg font-medium">No results found</Text>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Search;
