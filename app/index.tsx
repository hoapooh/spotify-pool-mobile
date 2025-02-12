import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
	const [isSignedIn, setIsSignedIn] = useState(true);

	if (isSignedIn) {
		return <Redirect href={"/(root)/(drawer)/(tabs)/home"} />;
	}

	return <Redirect href={"/(auth)/welcome"} />;
}
