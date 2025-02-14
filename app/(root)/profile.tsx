import { View, TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
	return (
		<SafeAreaView className="flex-1 bg-white">
			<TouchableOpacity onPress={() => router.back()} className="absolute top-4 left-4 z-10">
				<AntDesign name="arrowleft" size={24} color="white" />
			</TouchableOpacity>

			<View className="h-64 w-full pt-10 bg-slate-400">
				<View className="flex flex-row items-center gap-4 p-4">
					<Image
						source={{ uri: "https://mighty.tools/mockmind-api/content/human/125.jpg" }}
						className="rounded-full w-32 h-32"
					/>
					<View className="flex flex-col">
						<Text>Hoa Dep Trai {`:<`}</Text>
						<Text>
							<Text className="font-bold">0</Text> followers • <Text className="font-bold">0</Text>{" "}
							following
						</Text>
					</View>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Profile;
