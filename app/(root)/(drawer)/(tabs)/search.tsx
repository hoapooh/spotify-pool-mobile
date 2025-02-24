import { ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/search-input";

const Search = () => {
	const [searchText, setSearchText] = useState("");

	const handleSearch = (text: string) => {
		setSearchText(text);
		console.log(text);
	};

	return (
		<SafeAreaView className="bg-dark-200 flex-1">
			<ScrollView className="px-4 h-full relative" keyboardShouldPersistTaps="handled">
				<SearchInput searchText={searchText} handleSearch={handleSearch} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default Search;
