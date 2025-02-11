import React from "react"
import { router } from "expo-router"
import AntDesign from "@expo/vector-icons/AntDesign"
import CustomButton from "@/components/CustomButtom"
import { View, Text, TouchableOpacity, Platform, TextInput, ScrollView } from "react-native"
import InputField from "@/components/InputField"
import { icons } from "@/constants"

const SignIn = () => {
	return (
		<ScrollView className="bg-dark-100 h-full relative">
			<View
				className={`flex-row items-center justify-start relative z-30 px-5 ${
					Platform.OS === "ios" ? "pt-6" : "pt-2"
				}`}
			>
				<TouchableOpacity
					onPress={() => router.back()}
					className="size-11 flex flex-row items-center justify-center shrink-0 rounded-full"
				>
					<AntDesign name="arrowleft" size={24} color="white" />
				</TouchableOpacity>
			</View>

			<View className="px-5 mt-3">
				<InputField
					label="Email or username"
					labelStyle="text-4xl font-bold text-white mb-3"
					icon={icons.email}
					inputStyle="text-white placeholder:text-white/60 placeholder:no-underline"
					focusStyle="bg-[#515151]"
					placeholder="Enter your email"
				/>
				<View className="mt-6" />
				<InputField
					label="Password"
					labelStyle="text-4xl font-bold text-white mb-3"
					secureTextEntry={true}
					icon={icons.email}
					inputStyle="text-white placeholder:text-white/60 placeholder:no-underline"
					focusStyle="bg-[#515151]"
					placeholder="Enter your password"
				/>

				<CustomButton title="Login" className="!w-1/3" textVariant="primary" classNameView="mt-3" />
			</View>
		</ScrollView>
	)
}

export default SignIn
