import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { ITrack } from "@/types";
import { router } from "expo-router";

interface TrackBoxProps {
	track: ITrack;
}

const TrackBox: React.FC<TrackBoxProps> = ({ track }) => {
	const handleNavigateToTrackDetail = () => {
		// Then navigate to detail
		router.push(`/(root)/(track)/${track.id}`);
	};

	return (
		<TouchableOpacity
			className="flex-col relative"
			style={{ width: 150 }}
			onPress={handleNavigateToTrackDetail}
		>
			<Image
				source={{ uri: track.images[1].url }}
				width={150}
				height={150}
				style={{ borderRadius: 8 }}
			/>
			<View className="p-2 mt-3 flex flex-col">
				<Text className="text-white font-bold" numberOfLines={1}>
					{track.name}
				</Text>
				<Text className="text-secondary-100 mt-1" numberOfLines={1}>
					{track.artists[0].name}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default TrackBox;
