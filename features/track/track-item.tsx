import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ITrack } from "@/types";
import formatTimeMiliseconds from "@/utils/format-time-milliseconds";
import { router } from "expo-router";

interface TrackItemProps {
	track: ITrack;
}

const TrackItem = ({ track }: TrackItemProps) => {
	const handleNavigateToTrackDetail = () => {
		// Then navigate to detail
		router.push(`/(root)/(track)/${track.id}`);
	};

	return (
		<TouchableOpacity
			className="w-full flex-row items-center justify-between mb-4"
			onPress={handleNavigateToTrackDetail}
		>
			<View className="flex-row items-center flex-1 mr-4 gap-x-3">
				<Image
					source={{ uri: track.images[1].url }}
					width={64}
					height={64}
					style={{ borderRadius: 8 }}
				/>

				<View className="flex-1">
					<Text className="text-white font-bold" numberOfLines={1}>
						{track.name}
					</Text>
					<Text className="text-secondary-100">{track.artists[0].name}</Text>
				</View>
			</View>

			<View className="shrink-0">
				<Text className="text-secondary-100 text-sm">{formatTimeMiliseconds(track.duration)}</Text>
			</View>
		</TouchableOpacity>
	);
};

export default TrackItem;
