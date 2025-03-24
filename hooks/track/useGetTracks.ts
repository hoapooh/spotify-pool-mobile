import { getTracksApi } from "@/services/trackApi";
import { useQuery } from "@tanstack/react-query";

export const useGetTracks = ({ limit, searchTerm }: { limit?: number; searchTerm?: string }) => {
	const { data: tracks, isPending: isLoadingTracks } = useQuery({
		queryKey: ["tracks", limit, searchTerm],
		queryFn: async () => getTracksApi(limit, searchTerm),
	});

	return { tracks, isLoadingTracks };
};
