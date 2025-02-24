import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Feather from "@expo/vector-icons/Feather";
import { router, usePathname } from "expo-router";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";

interface CustomDrawerContentProps extends DrawerContentComponentProps {}

const CustomDrawerContent: React.FC<CustomDrawerContentProps> = (props) => {
	const pathname = usePathname();

	const handleProfilePageChange = () => {
		props.navigation.closeDrawer();
		router.push("/profile");
	};

	return (
		<DrawerContentScrollView {...props}>
			<View className="flex flex-row w-full">
				<TouchableWithoutFeedback className="w-full" onPress={handleProfilePageChange}>
					<View className="flex flex-row items-center mb-4 gap-4">
						<Image
							source={{ uri: "https://mighty.tools/mockmind-api/content/human/125.jpg" }}
							className="rounded-full size-20"
							resizeMode="contain"
						/>
						<View>
							<Text className="text-2xl text-white font-bold">hehe</Text>
							<Text className="text-lg text-white">View Profile</Text>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</View>

			<DrawerItem
				icon={({ color, size }) => (
					<Feather name="home" size={size} color={pathname === "/home" ? "#000" : "#fff"} />
				)}
				label={"Home"}
				labelStyle={{
					fontSize: 18,
					color: pathname === "/home" ? "#000" : "#fff",
				}}
				style={{ backgroundColor: pathname === "/home" ? "#fff" : "transparent", borderRadius: 5 }}
				onPress={() => {
					router.push("/home");
				}}
			/>

			<DrawerItem
				icon={({ color, size }) => (
					<Feather name="search" size={size} color={pathname === "/search" ? "#000" : "#fff"} />
				)}
				label={"Search"}
				labelStyle={{ fontSize: 18, color: pathname === "/search" ? "#000" : "#fff" }}
				style={{
					backgroundColor: pathname === "/search" ? "#fff" : "transparent",
					borderRadius: 5,
				}}
				onPress={() => {
					router.push("/search");
				}}
			/>

			<DrawerItem
				icon={({ color, size }) => (
					<Feather name="settings" size={size} color={pathname === "/settings" ? "#000" : "#fff"} />
				)}
				label={"Settings"}
				labelStyle={{ fontSize: 18, color: pathname === "/settings" ? "#000" : "#fff" }}
				style={{
					backgroundColor: pathname === "/settings" ? "#fff" : "transparent",
					borderRadius: 5,
				}}
				onPress={() => {
					router.push("/settings");
				}}
			/>
		</DrawerContentScrollView>
	);
};

const DrawerLayout = () => {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Drawer
				drawerContent={(props) => <CustomDrawerContent {...props} />}
				screenOptions={{
					headerShown: false,
					drawerStyle: {
						backgroundColor: "#282828",
						borderTopRightRadius: 0,
						borderBottomRightRadius: 0,
						width: "80%",
					},
				}}
			/>
		</GestureHandlerRootView>
	);
};

export default DrawerLayout;
