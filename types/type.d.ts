import { TextInputProps, TouchableOpacityProps } from "react-native"

declare interface ButtonProps extends TouchableOpacityProps {
	title: string
	bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success"
	textVariant?: "primary" | "default" | "secondary" | "danger" | "success"
	IconLeft?: React.ComponentType<any>
	IconRight?: React.ComponentType<any>
	className?: string
	classNameView?: string
}

declare interface InputFieldProps extends TextInputProps {
	label?: string
	icon?: any
	secureTextEntry?: boolean
	labelStyle?: string
	containerStyle?: string
	inputStyle?: string
	focusStyle?: string
	iconStyle?: string
	className?: string
}
