import React from "react"
import { router } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"
import CustomButton from "@/components/CustomButtom"
import { View, Text, TouchableOpacity, Platform, TextInput, ScrollView } from "react-native"
import InputField from "@/components/InputField"
import { icons } from "@/constants"

const SignUp = () => {
	return (
		<ScrollView className="bg-dark-100 h-full relative">
			<View
				className={`flex-row items-center justify-between relative z-30 px-5 ${
					Platform.OS === "ios" ? "pt-6" : "pt-2"
				}`}
			>
				<TouchableOpacity
					onPress={() => router.back()}
					className="size-11 flex flex-row items-center justify-center shrink-0 rounded-full"
				>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>
				<Text className="text-xl text-white">Create account</Text>
				<View className="size-11"></View>
			</View>

			<View className="px-5 mt-20">
				<InputField
					label="What's your email?"
					labelStyle="text-4xl font-bold text-white mb-3"
					icon={icons.email}
					inputStyle="text-white placeholder:text-white/60 placeholder:no-underline"
					focusStyle="bg-[#515151]"
					placeholder="Enter your email"
				/>
				<Text className="text-white text-sm mt-1">
					You&apos;ll need to confirm this email in order to login to SpotifyPool.
				</Text>

				<CustomButton title="Next" className="!w-1/3" textVariant="primary" classNameView="mt-3" />
			</View>
		</ScrollView>
	)
}

export default SignUp
