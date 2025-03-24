import { createPLaylistApi } from "@/services/playlistApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Toast from "react-native-toast-message";

export const useCreatePLaylist = () => {
	const queryClient = useQueryClient();

	const { mutate: createPlaylistMutation, isPending: isCreatingPlaylist } = useMutation({
		mutationFn: ({ playlistName, description }: { playlistName: string; description: string }) =>
			createPLaylistApi(playlistName, description),
		onSuccess: (data) => {
			Toast.show({
				type: "success",
				text1: "Playlist",
				text2: `${data.message} 🎉`,
				visibilityTime: 2000,
			});

			queryClient.invalidateQueries({ queryKey: ["playlist"] });
		},
		onError: (error) => {
			console.log(error);
		},
	});

	return { createPlaylistMutation, isCreatingPlaylist };
};
