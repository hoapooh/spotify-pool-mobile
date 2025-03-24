import { Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { categories } from "@/constants";

const Filters = () => {
	const params = useLocalSearchParams<{ filter?: string }>();
	const [selectedCategory, setSelectedCategory] = useState(params.filter || "All");

	// Set filter params for filtering in index.tsx
	const handleCategoryPress = (category: string) => {
		if (selectedCategory === category) {
			setSelectedCategory("All");
			router.setParams({ filter: "All" });
			return;
		}

		setSelectedCategory(category);
		router.setParams({ filter: category });
	};

	return (
		<ScrollView horizontal showsHorizontalScrollIndicator={false} className={"mt-3 mb-2"}>
			{categories.map((category, index) => (
				<TouchableOpacity
					key={index}
					onPress={() => handleCategoryPress(category.category)}
					className={`flex-col items-center justify-center mr-4 px-3 py-1 rounded-full 
          ${
						selectedCategory === category.category
							? "bg-primary-100 border border-primary-200"
							: "bg-secondary-300"
					} `}
				>
					<Text
						className={`text-sm ${
							selectedCategory === category.category
								? "text-dark-300" + " font-medium mt-0.5"
								: "text-white font-medium"
						}`}
					>
						{category.title}
					</Text>
				</TouchableOpacity>
			))}
		</ScrollView>
	);
};
export default Filters;
