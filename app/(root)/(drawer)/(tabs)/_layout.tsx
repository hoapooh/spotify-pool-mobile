import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { DrawerToggleButton } from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";

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

const DrawerUserToggle = ({ navigation }: { navigation: any }) => (
	<TouchableOpacity onPress={() => navigation.openDrawer()}>
		<Image
			source={{ uri: "https://mighty.tools/mockmind-api/content/human/97.jpg" }}
			resizeMode={"contain"}
			className={"size-11 ml-3 rounded-full"}
		/>
	</TouchableOpacity>
);

const TabsLayout = () => {
	return (
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
					headerLeft: () => <DrawerUserToggle navigation={navigation} />,
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
					headerLeft: () => <DrawerUserToggle navigation={navigation} />,
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
				options={({ navigation }) => ({
					title: "Your Library",
					headerLeft: () => <DrawerUserToggle navigation={navigation} />,
					headerRight: () => (
						<TouchableOpacity onPress={() => {}} className={"mr-3"}>
							<Feather name="plus" size={30} color="white" />
						</TouchableOpacity>
					),
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
	);
};

export default TabsLayout;
