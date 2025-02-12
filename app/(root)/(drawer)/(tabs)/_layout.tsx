import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs } from "expo-router";
import { icons } from "@/constants";
import { DrawerToggleButton } from "@react-navigation/drawer";

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

const TabsLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				// headerShown: false,
				headerLeft: () => <DrawerToggleButton />,
				headerTitleAlign: "center",
				tabBarStyle: {
					backgroundColor: "#000",
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
				options={{
					title: "Home",
					tabBarIcon: ({ focused, color }) => (
						<TabIcon
							focused={focused}
							color={color}
							icon={icons.home}
							iconfilled={icons.homefilled}
							title="Home"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="search"
				options={{
					title: "Search",
					tabBarIcon: ({ focused, color }) => (
						<TabIcon
							focused={focused}
							color={color}
							icon={icons.search}
							iconfilled={icons.search}
							title="Search"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="your-library"
				options={{
					title: "Your Library",
					tabBarIcon: ({ focused, color }) => (
						<TabIcon
							focused={focused}
							color={color}
							icon={icons.library}
							iconfilled={icons.libraryfilled}
							title="Your Library"
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="add-playlist"
				options={{
					title: "Add",
					tabBarIcon: ({ focused, color }) => (
						<TabIcon
							focused={focused}
							color={color}
							icon={icons.plus}
							iconfilled={icons.plus}
							title="Add"
						/>
					),
				}}
			/>
		</Tabs>
	);
};

export default TabsLayout;
