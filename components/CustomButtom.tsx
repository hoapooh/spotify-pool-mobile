import { Text, TouchableOpacity, Animated } from "react-native";
import React, { useRef } from "react";
import { ButtonProps } from "@/types/type";

const getBgVariantStyle = (variant: ButtonProps["bgVariant"]) => {
	switch (variant) {
		case "secondary":
			return "bg-gray-500";
		case "danger":
			return "bg-red-500";
		case "success":
			return "bg-green-500";
		case "outline":
			return "bg-transparent border-neutral-300 border-[0.5px]";
		default:
			return "bg-primary-100";
	}
};

const getTextVariantStyle = (variant: ButtonProps["textVariant"]) => {
	switch (variant) {
		case "primary":
			return "text-dark-200";
		case "secondary":
			return "text-gray-100";
		case "danger":
			return "text-red-100";
		case "success":
			return "text-green-100";
		default:
			return "text-white";
	}
};

const CustomButton = ({
	onPress,
	title,
	bgVariant = "primary",
	textVariant = "default",
	IconLeft,
	IconRight,
	className,
	classNameView,
	isLoading,
	...props
}: ButtonProps) => {
	const scaleValue = useRef(new Animated.Value(1)).current;

	const handlePressIn = () => {
		Animated.spring(scaleValue, {
			toValue: 0.95,
			useNativeDriver: true,
		}).start();
	};

	const handlePressOut = () => {
		Animated.spring(scaleValue, {
			toValue: 1,
			useNativeDriver: true,
		}).start();
	};

	return (
		<Animated.View
			style={{ transform: [{ scale: scaleValue }] }}
			className={`flex items-center justify-center ${classNameView}`}
		>
			<TouchableOpacity
				onPress={onPress}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				activeOpacity={0.8}
				className={`w-full rounded-full flex flex-row p-3 justify-center items-center shadow-md shadow-neutral-400/70 ${getBgVariantStyle(
					bgVariant
				)} ${className}`}
				{...props}
			>
				{IconLeft && <IconLeft />}
				<Text className={`text-lg font-bold ${getTextVariantStyle(textVariant)}`}>
					{isLoading ? "Loading..." : title}
				</Text>
				{IconRight && <IconRight />}
			</TouchableOpacity>
		</Animated.View>
	);
};

export default CustomButton;
