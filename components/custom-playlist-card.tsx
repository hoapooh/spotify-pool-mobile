import { View, Text, Image, TouchableWithoutFeedback } from "react-native";
import React from "react";
import Animated, {
	Easing,
	Extrapolation,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";

interface PlaylistCardProps {
	playlistName: string;
	images: string;
	displayname: string;
}

const TimingConfig = { duration: 100, easing: Easing.linear };

const CustomPlaylistCard = ({ playlistName, images, displayname }: PlaylistCardProps) => {
	const pressed = useSharedValue(false);
	const progress = useDerivedValue(() =>
		pressed.value ? withTiming(1, TimingConfig) : withTiming(0, TimingConfig)
	);

	const animatedStyle = useAnimatedStyle(() => {
		const scale = interpolate(progress.value, [0, 1], [1, 0.97], Extrapolation.CLAMP);

		return {
			transform: [{ scale }],
		};
	});

	return (
		<TouchableWithoutFeedback
			onPressIn={() => {
				pressed.value = true;
			}}
			onPressOut={() => {
				pressed.value = false;
			}}
		>
			<Animated.View style={animatedStyle} className="w-full flex-row items-center gap-3">
				<Image source={{ uri: images }} className="w-20 h-20 rounded-lg" />
				<View>
					<Text numberOfLines={1} className="text-white text-xl font-semibold">
						{playlistName}
					</Text>
					<Text className="text-secondary-100 font-normal">Playlist•{displayname}</Text>
				</View>
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

export default CustomPlaylistCard;
