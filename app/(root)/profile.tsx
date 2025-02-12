import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";

const Profile = () => {
	return (
		<View className="flex-1">
			<TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-4 z-10">
				<AntDesign name="arrowleft" size={24} color="black" />
			</TouchableOpacity>
		</View>
	);
};

export default Profile;
