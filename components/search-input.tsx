import {
	View,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
	TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";

interface SearchInputProps {
	searchText: string;
	handleSearch: (text: string) => void;
}

const SearchInput = ({ searchText, handleSearch }: SearchInputProps) => {
	const [localSearchText, setLocalSearchText] = useState(searchText);

	// Initialize searchText if passed from parent
	useEffect(() => {
		setLocalSearchText(searchText);
	}, [searchText]);

	// Debounce implementation
	useEffect(() => {
		const debounceTimeout = setTimeout(() => {
			// Only call handleSearch if the text has actually changed
			if (localSearchText !== searchText) {
				handleSearch(localSearchText);
			}
		}, 500); // 500ms debounce delay

		// Clear timeout on cleanup
		return () => clearTimeout(debounceTimeout);
	}, [localSearchText, handleSearch]);

	// Handle text change locally first
	const onChangeText = (text: string) => {
		setLocalSearchText(text);
	};

	// Clear text function
	const clearSearch = () => {
		setLocalSearchText("");
		handleSearch(""); // Immediately clear search results
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View className="flex flex-row items-center gap-2 w-full rounded-md bg-white py-3 px-4">
					<Feather name="search" size={28} color="#1c1c1c" />
					<TextInput
						value={localSearchText}
						onChangeText={onChangeText}
						placeholder="What do you want to listen to?"
						placeholderTextColor={"#525252"}
						className="text-lg font-bold flex-1"
						autoCorrect={false}
						returnKeyType="search"
						onSubmitEditing={() => handleSearch(localSearchText)}
					/>
					{localSearchText.length > 0 && (
						<TouchableOpacity onPress={clearSearch}>
							<Feather name="x-circle" size={24} color="#525252" />
						</TouchableOpacity>
					)}
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SearchInput;
