import React from "react";
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { useAudioStore } from "@/store/useAudioStore";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const MiniPlayer = () => {
	const { currentTrack, isPlaying, togglePlayback, isBuffering } = useAudioStore();

	if (!currentTrack) return null;

	const artistsNames = currentTrack.artists.map((artist) => artist.name).join(", ");

	const handleNavigation = () => {
		router.push(`/(root)/(track)/${currentTrack.id}`);
	};

	console.log(JSON.stringify(currentTrack, null, 2));

	return (
		<BlurView
			intensity={85}
			tint="dark"
			className="border-t border-dark-400 z-50"
			style={{ position: "absolute", bottom: 60, left: 0, right: 0 }}
		>
			<LinearGradient colors={["#1DB954", "#192f5d"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
				<TouchableOpacity
					activeOpacity={0.8}
					onPress={handleNavigation}
					className="flex-row items-center justify-between"
					style={{ padding: 8 }}
				>
					<Image
						source={{ uri: currentTrack.images[2].url }}
						width={48}
						height={48}
						className="rounded-md mr-3"
					/>

					<View className="flex-1">
						<Text className="text-white font-medium" numberOfLines={1}>
							{currentTrack.name}
						</Text>
						<Text className="text-secondary-100 text-sm" numberOfLines={1}>
							{artistsNames}
						</Text>
					</View>

					<TouchableOpacity onPress={togglePlayback} className="ml-3">
						{isBuffering ? (
							<ActivityIndicator size="small" color="white" />
						) : isPlaying ? (
							<Ionicons name="pause" size={28} color="white" />
						) : (
							<Ionicons name="play" size={28} color="white" />
						)}
					</TouchableOpacity>
				</TouchableOpacity>
			</LinearGradient>
		</BlurView>
	);
};

export default MiniPlayer;
