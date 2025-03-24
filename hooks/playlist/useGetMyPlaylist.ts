import { getMyPLaylistApi } from "@/services/playlistApi";
import { useQuery } from "@tanstack/react-query";

export const useGetMyPlaylist = () => {
	const { data: myPlaylist, isPending: isLoadingPlaylist } = useQuery({
		queryKey: ["playlist"],
		queryFn: () => getMyPLaylistApi(),
	});

	return { myPlaylist, isLoadingPlaylist };
};
