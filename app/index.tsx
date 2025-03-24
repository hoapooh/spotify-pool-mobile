import { Redirect } from "expo-router";
import { useState } from "react";

export default function Index() {
	const [isSignedIn, setIsSignedIn] = useState(false);

	if (isSignedIn) {
		return <Redirect href={"/home"} />;
	}

	return <Redirect href={"/welcome"} />;
}
