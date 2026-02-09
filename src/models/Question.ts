interface ImageData {
	url: string;
	height?: number;
	width?: number;
}

interface VideoData {
	url: string;
	height?: number;
	width?: number;
	loop?: boolean;
	autoplay?: boolean;
}

export interface RenderData {
	image?: ImageData | string;
	video?: VideoData | string;

	audio?: string;
	text?: string;
}

export interface Question {
	question: RenderData;
	answer: RenderData;
	points: number;
}

export type MediaData = ImageData | VideoData;
