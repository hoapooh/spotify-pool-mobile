import { View, Text, Image } from "react-native"
import React from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { icons } from "@/constants"
import { LinearGradient } from "expo-linear-gradient"
import CustomButton from "@/components/CustomButtom"
import OAuth from "@/components/OAuth"
import { Link, router } from "expo-router"

const welcome = () => {
	return (
		<SafeAreaView className="h-full flex items-center justify-center bg-dark-100 relative">
			{/* ==== Background Effect ==== */}
			<LinearGradient
				// Background Linear Gradient
				colors={["#515151", "transparent"]}
				className="absolute top-0 left-0 right-0 h-[250px]"
			/>

			{/* ==== Logo ==== */}
			<Image source={icons.spotifyWhite} className="size-20" resizeMode="contain" />

			{/* ==== Slogan ==== */}
			<View className="mt-6">
				<Text className="text-center text-4xl text-white font-semibold">Millions of songs.</Text>
				<Text className="text-center text-4xl text-white font-semibold">Free on SpotifyPool.</Text>
			</View>

			{/* ==== Signup Button ==== */}
			<CustomButton
				title="Sign up free"
				textVariant="primary"
				classNameView="w-5/6 mt-20"
				onPress={() => router.push("/(auth)/sign-up")}
			/>

			<CustomButton
				title="Straight to Homepage"
				textVariant="primary"
				classNameView="w-5/6 mt-2"
				onPress={() => router.push("/(root)/(tabs)/home")}
			/>

			{/* ==== OAuth Google Login ==== */}
			<OAuth />

			{/* ==== Login Link ==== */}
			<Link href={"/sign-in"} className="text-lg text-center text-general-200 mt-10">
				<Text className="text-white">Already have an account?</Text>{" "}
				<Text className="text-primary-200">Log In</Text>
			</Link>
		</SafeAreaView>
	)
}

export default welcome
