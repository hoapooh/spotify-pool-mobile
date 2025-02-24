import {
	View,
	Text,
	TextInput,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";

interface SearchInputProps {
	searchText: string;
	handleSearch: (text: string) => void;
}

const SearchInput = ({ searchText, handleSearch }: SearchInputProps) => {
	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View className="flex flex-row items-center gap-2 mt-4 w-full rounded-md bg-white py-3 px-4">
					<Feather name="search" size={28} color="#1c1c1c" />
					<TextInput
						value={searchText}
						onChangeText={(text) => handleSearch(text)}
						placeholder="What do you want to listen to?"
						placeholderTextColor={"#525252"}
						className="text-xl font-bold"
					/>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default SearchInput;
