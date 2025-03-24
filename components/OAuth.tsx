import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./custom-button";
import { icons } from "@/constants";

// import statusCodes along with GoogleSignin
import {
	GoogleSignin,
	isErrorWithCode,
	isSuccessResponse,
	statusCodes,
} from "@react-native-google-signin/google-signin";
import { useGoogleLogin } from "@/hooks/authentication/useGoogleLogin";

GoogleSignin.configure({
	webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID_WEB,
	scopes: ["https://www.googleapis.com/auth/drive.readonly"],
	offlineAccess: true,
	forceCodeForRefreshToken: true,
});

const OAuth = () => {
	const { googleLogin } = useGoogleLogin();

	const handleGoogleSignIn = async () => {
		try {
			await GoogleSignin.hasPlayServices();
			const response = await GoogleSignin.signIn();

			if (isSuccessResponse(response)) {
				const { idToken } = response.data;
				googleLogin(idToken!);
			} else {
				// sign in was cancelled by user
			}
		} catch (error) {
			if (isErrorWithCode(error)) {
				switch (error.code) {
					case statusCodes.IN_PROGRESS:
						console.log(error);

						// operation (eg. sign in) already in progress
						break;
					case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
						console.log(error);

						// Android only, play services not available or outdated
						break;
					case statusCodes.SIGN_IN_CANCELLED:
						console.log(error);

					default:
						console.log(error);

					// some other error happened
				}
			} else {
				// an error that's not related to google sign in occurred
			}
		}
	};

	return (
		<View className="w-5/6">
			<View className="flex-row justify-center items-center mt-4 gap-x-3">
				<View className="flex-1 h-[1px] bg-secondary-200" />
				<Text className="text-lg text-white">Or</Text>
				<View className="flex-1 h-[1px] bg-secondary-200" />
			</View>

			<CustomButton
				bgVariant="outline"
				onPress={handleGoogleSignIn}
				title="Continue with Google"
				className="mt-5 w-full shadow-none"
				IconLeft={() => (
					<Image source={icons.google} resizeMode="contain" className="w-5 h-5 mx-2" />
				)}
			/>
		</View>
	);
};

export default OAuth;
