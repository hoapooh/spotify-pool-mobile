import React, { useEffect } from "react";
import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	ScrollView,
	Dimensions,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { useGetTrack } from "@/hooks/track/useGetTrack";
import formatTimeMiliseconds from "@/utils/format-time-milliseconds";
import { useAudioStore } from "@/store/useAudioStore";

const { width } = Dimensions.get("window");

const TrackDetail = () => {
	const { id } = useLocalSearchParams<{ id: string }>();
	const { track, isLoadingTrack } = useGetTrack(id);

	const {
		currentTrack,
		isPlaying,
		playbackPosition,
		playbackDuration,
		isBuffering,
		playTrack,
		togglePlayback,
	} = useAudioStore();

	// Play this track when it loads if it's not already playing
	useEffect(() => {
		if (track && (!currentTrack || currentTrack.id !== track.id)) {
			playTrack(track);
		}
	}, [track]);

	// Format artists names for display
	const artistsNames = track?.artists.map((artist) => artist.name).join(", ");

	// Function to get a dominant color from track image (simplified approach)
	const getDominantColor = () => {
		return "#1DB954"; // Spotify green as fallback
	};

	if (isLoadingTrack) {
		return (
			<View className="flex-1 bg-dark-200 items-center justify-center">
				<ActivityIndicator size="large" color="#1ed760" />
			</View>
		);
	}

	if (!track) {
		return (
			<SafeAreaView className="flex-1 bg-dark-200 items-center justify-center">
				<Text className="text-white text-lg">Track not found</Text>
				<TouchableOpacity
					className="mt-4 bg-primary-100 px-4 py-2 rounded-full"
					onPress={() => router.back()}
				>
					<Text className="text-dark-200 font-semibold">Go Back</Text>
				</TouchableOpacity>
			</SafeAreaView>
		);
	}

	// Check if this is the currently playing track
	const isCurrentTrack = currentTrack?.id === track.id;

	return (
		<SafeAreaView className="flex-1 bg-dark-200">
			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Header with back button */}
				<View className="flex-row items-center justify-between px-4 py-2 absolute top-0 left-0 right-0 z-10">
					<TouchableOpacity
						onPress={() => router.back()}
						className="size-10 bg-dark-400/60 rounded-full flex items-center justify-center"
					>
						<AntDesign name="arrowleft" size={22} color="white" />
					</TouchableOpacity>

					<TouchableOpacity className="size-10 bg-dark-400/60 rounded-full flex items-center justify-center">
						<Feather name="more-vertical" size={22} color="white" />
					</TouchableOpacity>
				</View>

				{/* Album artwork with gradient background */}
				<LinearGradient
					colors={[getDominantColor(), "#121212"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 0.8 }}
					className="w-full pt-24 pb-6 items-center"
				>
					<Image
						source={{ uri: track.images[0].url }}
						style={{ width: width * 0.7, height: width * 0.7 }}
						className="rounded-md shadow-2xl"
					/>

					<View className="w-full px-6 mt-8">
						<Text className="text-white text-2xl font-bold" numberOfLines={2}>
							{track.name}
						</Text>
						<Text className="text-secondary-100 text-base mt-1">{artistsNames}</Text>
					</View>
				</LinearGradient>

				{/* Player controls */}
				<View className="px-6 pt-8 pb-4">
					{/* Progress bar */}
					<View className="mb-4">
						<View className="h-1 bg-secondary-200 rounded-full overflow-hidden">
							<View
								className="h-full bg-white rounded-full"
								style={{
									width: `${(playbackPosition / playbackDuration) * 100}%`,
								}}
							/>
						</View>

						<View className="flex-row justify-between mt-2">
							<Text className="text-secondary-100">{formatTimeMiliseconds(playbackPosition)}</Text>
							<Text className="text-secondary-100">{formatTimeMiliseconds(playbackDuration)}</Text>
						</View>
					</View>

					{/* Playback controls */}
					<View className="flex-row items-center justify-between mt-4">
						<TouchableOpacity>
							<Feather name="shuffle" size={24} color="#b3b3b3" />
						</TouchableOpacity>

						<TouchableOpacity>
							<Ionicons name="play-skip-back" size={28} color="white" />
						</TouchableOpacity>

						<TouchableOpacity onPress={togglePlayback} className="bg-white rounded-full p-4">
							{isBuffering ? (
								<ActivityIndicator size="small" color="#000" />
							) : isPlaying && isCurrentTrack ? (
								<Ionicons name="pause" size={32} color="#000" />
							) : (
								<Ionicons name="play" size={32} color="#000" />
							)}
						</TouchableOpacity>

						<TouchableOpacity>
							<Ionicons name="play-skip-forward" size={28} color="white" />
						</TouchableOpacity>

						<TouchableOpacity>
							<Ionicons name="repeat" size={24} color="#b3b3b3" />
						</TouchableOpacity>
					</View>
				</View>

				{/* Actions */}
				{/* <View className="flex-row justify-around items-center px-6 py-6 mt-2">
					<TouchableOpacity className="items-center">
						<Feather name="heart" size={22} color="#b3b3b3" />
						<Text className="text-secondary-100 mt-1">Like</Text>
					</TouchableOpacity>

					<TouchableOpacity className="items-center">
						<Feather name="download" size={22} color="#b3b3b3" />
						<Text className="text-secondary-100 mt-1">Download</Text>
					</TouchableOpacity>

					<TouchableOpacity className="items-center">
						<Feather name="share-2" size={22} color="#b3b3b3" />
						<Text className="text-secondary-100 mt-1">Share</Text>
					</TouchableOpacity>

					<TouchableOpacity className="items-center">
						<Feather name="plus" size={22} color="#b3b3b3" />
						<Text className="text-secondary-100 mt-1">Add</Text>
					</TouchableOpacity>
				</View> */}

				{/* Track details (if available) */}
				{track.description && (
					<View className="px-6 py-4 mt-2 bg-dark-400 mx-4 rounded-lg">
						<Text className="text-white text-lg font-semibold mb-2">About</Text>
						<Text className="text-secondary-100">{track.description}</Text>
					</View>
				)}

				{/* Artist section */}
				<View className="px-6 py-6">
					<Text className="text-white text-xl font-bold mb-4">Artists</Text>

					{track.artists.map((artist) => (
						<View key={artist.id} className="flex-row items-center bg-dark-400 p-3 rounded-lg mb-3">
							<Image
								source={{ uri: artist.images[0]?.url }}
								className="w-16 h-16 rounded-full mr-4"
							/>
							<View>
								<Text className="text-white font-bold text-lg">{artist.name}</Text>
								<Text className="text-secondary-100">
									{artist.followers.toLocaleString()} followers
								</Text>
							</View>
						</View>
					))}
				</View>

				{/* Lyrics section if available */}
				{track.lyrics && (
					<View className="px-6 py-6">
						<Text className="text-white text-xl font-bold mb-4">Lyrics</Text>
						<View className="bg-dark-400 p-4 rounded-lg">
							<Text className="text-white leading-6">{track.lyrics}</Text>
						</View>
					</View>
				)}

				{/* Spacing at the bottom */}
				<View className="h-20" />
			</ScrollView>
		</SafeAreaView>
	);
};

export default TrackDetail;
