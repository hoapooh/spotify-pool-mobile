import { View, TouchableOpacity, Text, Image, ScrollView, Alert } from "react-native";
import React from "react";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGetCurrentUser } from "@/hooks/authentication/useGetCurrentUser";
import { useAuthStore } from "@/store/useAuthStore";
import { LinearGradient } from "expo-linear-gradient";

const Profile = () => {
	const { currentUser } = useGetCurrentUser();
	const { logout } = useAuthStore((state) => state);

	const displayName = currentUser?.authenticatedUserInfoResponseModel.name || "SP User";
	const avatarUrl =
		currentUser?.authenticatedUserInfoResponseModel.avatar[0] ||
		"https://i.scdn.co/image/ab6761610000e5eb601fb0059596c0f89568da7b"; // Fallback image

	const handleLogout = () => {
		Alert.alert("Logout", "Are you sure you want to logout?", [
			{
				text: "Cancel",
				style: "cancel",
			},
			{
				text: "Logout",
				onPress: () => {
					logout();
					router.replace("/welcome");
				},
			},
		]);
	};

	return (
		<SafeAreaView className="flex-1 bg-dark-200">
			{/* Header with back button */}
			<View className="flex-row items-center justify-between px-4 py-2 z-10 absolute top-0 left-0 right-0">
				<TouchableOpacity
					onPress={() => router.back()}
					className="size-10 bg-dark-400/60 rounded-full flex items-center justify-center"
				>
					<AntDesign name="arrowleft" size={22} color="white" />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={handleLogout}
					className="size-10 bg-dark-400/60 rounded-full flex items-center justify-center"
				>
					<Feather name="log-out" size={20} color="#ff5252" />
				</TouchableOpacity>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				{/* Profile header with gradient background */}
				<LinearGradient
					colors={["#1ed760", "#121212"]}
					start={{ x: 0, y: 0 }}
					end={{ x: 0, y: 0.8 }}
					className="w-full pt-16 pb-8"
				>
					<View className="flex items-center px-4">
						<Image
							source={{ uri: avatarUrl }}
							className="rounded-full h-40 w-40 border-4 border-white shadow-lg shadow-black/50"
						/>

						<Text className="text-white text-2xl font-bold mt-4">{displayName}</Text>

						<View className="flex-row items-center mt-2">
							<View className="flex-row items-center">
								<Text className="text-white text-base">
									<Text className="font-bold">0</Text> followers
								</Text>
							</View>
							<View className="h-1 w-1 bg-white rounded-full mx-2" />
							<View className="flex-row items-center">
								<Text className="text-white text-base">
									<Text className="font-bold">0</Text> following
								</Text>
							</View>
						</View>

						<TouchableOpacity
							className="mt-6 bg-transparent border border-white rounded-full px-6 py-2"
							onPress={() => {
								/* Edit profile functionality here */
							}}
						>
							<Text className="text-white font-semibold">Edit profile</Text>
						</TouchableOpacity>
					</View>
				</LinearGradient>

				{/* Activity section */}
				<View className="px-4 py-6">
					<Text className="text-white text-xl font-bold mb-4">Recent Activity</Text>

					{/* Empty state */}
					<View className="bg-dark-400 rounded-lg p-6 items-center justify-center">
						<Feather name="music" size={48} color="#b3b3b3" />
						<Text className="text-white font-semibold text-lg mt-4 text-center">
							No recent activity
						</Text>
						<Text className="text-secondary-100 text-center mt-2">
							Songs you've recently played will appear here
						</Text>
					</View>
				</View>

				{/* Public playlists section (placeholder) */}
				<View className="px-4 pb-8">
					<Text className="text-white text-xl font-bold mb-4">Your Playlists</Text>

					{/* Empty state */}
					<View className="bg-dark-400 rounded-lg p-6 items-center justify-center">
						<Feather name="list" size={48} color="#b3b3b3" />
						<Text className="text-white font-semibold text-lg mt-4 text-center">
							No playlists yet
						</Text>
						<Text className="text-secondary-100 text-center mt-2">
							Create your first playlist to share with friends
						</Text>

						<TouchableOpacity
							className="mt-6 bg-primary-100 rounded-full px-6 py-3"
							onPress={() => {
								/* Create playlist functionality */
							}}
						>
							<Text className="text-dark-200 font-bold">Create Playlist</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;
