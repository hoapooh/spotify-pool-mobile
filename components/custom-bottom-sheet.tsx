import { View, Text, TouchableOpacity } from "react-native";
import React, { useCallback } from "react";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";
import { Feather } from "@expo/vector-icons";

interface CustomBottomSheetProps {
	bottomSheetRef: React.RefObject<BottomSheetModal>;
	snapPoints?: string[];
	children: React.ReactNode;
}

const CustomBottomSheet = ({
	bottomSheetRef,
	snapPoints = [],
	children,
}: CustomBottomSheetProps) => {
	// NOTE: this is use to handle the changes of the bottom sheet
	/* const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []); */

	// renders
	const renderBackdrop = useCallback(
		(props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
			<BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
		),
		[]
	);
	return (
		<BottomSheetModal
			name="PlaylistModal"
			ref={bottomSheetRef}
			// onChange={handleSheetChanges}
			snapPoints={snapPoints}
			index={0}
			backdropComponent={renderBackdrop}
			backgroundStyle={{ backgroundColor: "#1f1f1f" }}
			handleIndicatorStyle={{ backgroundColor: "#646464" }}
		>
			<BottomSheetView className="flex-1 p-4">{children}</BottomSheetView>
		</BottomSheetModal>
	);
};

export default CustomBottomSheet;
