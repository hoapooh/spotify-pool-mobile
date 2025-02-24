import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./custom-button";
import { icons } from "@/constants";

const OAuth = () => {
	const handleGoogleSignIn = async () => {};

	return (
		<View className="w-5/6">
			<View className="flex-row justify-center items-center mt-4 gap-x-3">
				<View className="flex-1 h-[1px] bg-secondary-200" />
				<Text className="text-lg text-white">Or</Text>
				<View className="flex-1 h-[1px] bg-secondary-200" />
			</View>

			<CustomButton
				bgVariant="outline"
				onPress={handleGoogleSignIn}
				title="Continue with Google"
				className="mt-5 w-full shadow-none"
				IconLeft={() => (
					<Image source={icons.google} resizeMode="contain" className="w-5 h-5 mx-2" />
				)}
			/>
		</View>
	);
};

export default OAuth;
