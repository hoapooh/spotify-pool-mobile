export interface IImages {
	url: string;
	width: number;
	height: number;
}

export interface IArtists {
	id: string;
	name: string;
	followers: number;
	// genreIds: string[];
	images: IImages[];
}

export interface ITrack {
	id: string;
	name: string;
	description: string;
	lyrics: string;
	previewURL: string;
	addedTime: string;
	duration: number;
	durationFormated: string;
	images: IImages[];
	artists: IArtists[];
}

export interface IAvatar {
	url: string;
	height: number;
	width: number;
}

export interface IUser {
	id: string;
	role: string[];
	name: string;
	avatar: IAvatar[];
}

export interface IUserCurrent {
	authenticatedUserInfoResponseModel: {
		accessToken: string;
		id: string;
		role: string[];
		name: string;
		avatar: string[];
	};
}
