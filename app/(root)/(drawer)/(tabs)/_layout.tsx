import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { useGetCurrentUser } from "@/hooks/authentication/useGetCurrentUser";
import { IUserCurrent } from "@/types";
import MiniPlayer from "@/features/audio/mini-player";

const TabIcon = ({
	focused,
	color,
	icon,
	iconfilled,
	title,
}: {
	focused: boolean;
	color: string;
	icon: any;
	iconfilled?: any;
	title: string;
}) => (
	<View className={"flex-1 mt-2 flex-col items-center"}>
		{focused ? (
			<Image source={iconfilled} tintColor={color} resizeMode={"contain"} className={"size-7"} />
		) : (
			<Image source={icon} tintColor={color} resizeMode={"contain"} className={"size-7"} />
		)}

		<Text
			style={{ color }}
			className={`${focused ? "font-medium" : "font-medium"} text-xs w-full text-center mt-1`}
		>
			{title}
		</Text>
	</View>
);

const DrawerUserToggle = ({ navigation, user }: { navigation: any; user: IUserCurrent }) => (
	<TouchableOpacity onPress={() => navigation.openDrawer()}>
		<Image
			source={{ uri: user?.authenticatedUserInfoResponseModel.avatar[0] }}
			resizeMode={"contain"}
			className={"size-11 ml-3 rounded-full"}
		/>
	</TouchableOpacity>
);

const TabsLayout = () => {
	const { currentUser } = useGetCurrentUser();

	return (
		<BottomSheetModalProvider>
			<Tabs
				screenOptions={{
					tabBarShowLabel: false,
					// headerShown: false, // NOTE: Uncomment this line to hide the header
					headerTitleStyle: {
						fontWeight: "bold",
						fontSize: 24,
						color: "#fff",
						marginLeft: 10,
					},
					headerStyle: {
						elevation: 0,
						shadowOpacity: 0,
						backgroundColor: "#121212",
					},
					tabBarStyle: {
						backgroundColor: "#090909",
						borderTopColor: "#0000004A",
						borderTopWidth: 1,
						elevation: 0,
						minHeight: 60,
					},
					tabBarActiveTintColor: "#fff",
					tabBarInactiveTintColor: "#b3b3b3",
				}}
			>
				<Tabs.Screen
					name="home"
					options={({ navigation }) => ({
						title: "Home",
						headerLeft: () => <DrawerUserToggle navigation={navigation} user={currentUser!} />,
						tabBarIcon: ({ focused, color }) => (
							<TabIcon
								focused={focused}
								color={color}
								icon={icons.home}
								iconfilled={icons.homefilled}
								title="Home"
							/>
						),
					})}
				/>

				<Tabs.Screen
					name="search"
					options={({ navigation }) => ({
						title: "Search",
						headerLeft: () => <DrawerUserToggle navigation={navigation} user={currentUser!} />,
						tabBarIcon: ({ focused, color }) => (
							<TabIcon
								focused={focused}
								color={color}
								icon={icons.search}
								iconfilled={icons.search}
								title="Search"
							/>
						),
					})}
				/>

				<Tabs.Screen
					name="your-library"
					options={({ navigation, route }) => ({
						title: "Your Library",
						headerLeft: () => <DrawerUserToggle navigation={navigation} user={currentUser!} />,
						tabBarIcon: ({ focused, color }) => (
							<TabIcon
								focused={focused}
								color={color}
								icon={icons.library}
								iconfilled={icons.libraryfilled}
								title="Your Library"
							/>
						),
					})}
				/>
			</Tabs>

			{/* Mini Player */}
			<MiniPlayer />
		</BottomSheetModalProvider>
	);
};

export default TabsLayout;
