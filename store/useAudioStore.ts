import { create } from "zustand";
import { Audio } from "expo-av";
import { ITrack } from "@/types";

interface AudioState {
	currentTrack: ITrack | null;
	sound: Audio.Sound | null;
	isPlaying: boolean;
	playbackPosition: number;
	playbackDuration: number;
	isBuffering: boolean;

	// Actions
	playTrack: (track: ITrack) => Promise<void>;
	pauseTrack: () => Promise<void>;
	resumeTrack: () => Promise<void>;
	stopTrack: () => Promise<void>;
	togglePlayback: () => Promise<void>;
	setSound: (sound: Audio.Sound | null) => void;
	updatePlaybackStatus: (status: any) => void;
}

export const useAudioStore = create<AudioState>((set, get) => ({
	currentTrack: null,
	sound: null,
	isPlaying: false,
	playbackPosition: 0,
	playbackDuration: 0,
	isBuffering: false,

	setSound: (sound) => set({ sound }),

	updatePlaybackStatus: (status) => {
		if (status.isLoaded) {
			set({
				playbackPosition: status.positionMillis,
				playbackDuration: status.durationMillis || get().currentTrack?.duration || 0,
				isPlaying: status.isPlaying,
				isBuffering: status.isBuffering,
			});
		}
	},

	playTrack: async (track) => {
		try {
			// Clean up previous sound if exists
			const currentSound = get().sound;
			if (currentSound) {
				await currentSound.unloadAsync();
			}

			// Set up audio mode
			await Audio.setAudioModeAsync({
				playsInSilentModeIOS: true,
				staysActiveInBackground: true,
				shouldDuckAndroid: true,
			});

			// Create and play the new sound
			const { sound: newSound } = await Audio.Sound.createAsync(
				{ uri: track.previewURL },
				{ shouldPlay: true },
				(status) => get().updatePlaybackStatus(status)
			);

			set({
				sound: newSound,
				currentTrack: track,
				isPlaying: true,
			});
		} catch (error) {
			console.error("Error playing track:", error);
		}
	},

	pauseTrack: async () => {
		const { sound } = get();
		if (sound) {
			await sound.pauseAsync();
			set({ isPlaying: false });
		}
	},

	resumeTrack: async () => {
		const { sound } = get();
		if (sound) {
			await sound.playAsync();
			set({ isPlaying: true });
		}
	},

	stopTrack: async () => {
		const { sound } = get();
		if (sound) {
			await sound.stopAsync();
			await sound.unloadAsync();
			set({
				sound: null,
				currentTrack: null,
				isPlaying: false,
				playbackPosition: 0,
				playbackDuration: 0,
			});
		}
	},

	togglePlayback: async () => {
		const { isPlaying, sound } = get();

		if (!sound) return;

		if (isPlaying) {
			await get().pauseTrack();
		} else {
			await get().resumeTrack();
		}
	},
}));
