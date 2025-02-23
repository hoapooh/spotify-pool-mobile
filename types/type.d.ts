import { ReactNode } from "react";
import { TextInputProps, TouchableOpacityProps } from "react-native";

declare interface ButtonProps extends TouchableOpacityProps {
	title: string;
	bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
	textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
	IconLeft?: React.ComponentType<any>;
	IconRight?: React.ComponentType<any>;
	className?: string;
	classNameView?: string;
	isLoading?: boolean;
}

declare interface InputFieldProps extends TextInputProps {
	label?: string;
	icon?: any;
	iconColor?: string;
	secureTextEntry?: boolean;
	labelStyle?: string;
	containerStyle?: string;
	inputStyle?: string;
	focusStyle?: string;
	iconStyle?: string;
	className?: string;
}
