import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";

const Settings = () => {
	return (
		<SafeAreaView className="bg-dark-200 flex-1">
			<TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-4 z-10">
				<Feather name="arrow-left" size={24} color="white" />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default Settings;
