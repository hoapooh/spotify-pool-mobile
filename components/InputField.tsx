import {
	View,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Image,
	TextInput,
	Platform,
	Keyboard,
	Text,
} from "react-native"
import React, { useState } from "react"
import { InputFieldProps } from "@/types/type"

const InputField = ({
	labelStyle,
	label,
	icon,
	secureTextEntry = false,
	containerStyle,
	focusStyle,
	inputStyle,
	iconStyle,
	className,
	...props
}: InputFieldProps) => {
	const [isFocused, setIsFocused] = useState(false)

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View className="my-2 w-full">
					<Text className={`${labelStyle}`}>{label}</Text>
					<View
						className={`flex-row justify-start items-center relative bg-secondary-200/60 rounded-md focus:border-secondary-200/60 ${containerStyle} ${
							isFocused ? focusStyle : ""
						}`}
					>
						{icon && <Image source={icon} className={`size-6 ml-4 ${iconStyle}`} />}
						<TextInput
							className={`p-4 font-semibold text-lg underline flex-1 ${inputStyle} text-left`}
							secureTextEntry={secureTextEntry}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							{...props}
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

export default InputField
