export interface RenderData
{
	image?: {
		url: string,
		height?: number,
		width?: number,
	} | string,

	video?: {
		url: string,
		height?: number,
		width?: number,
	} | string,

	audio?: string,
	text?: string,
}

export interface Question
{
	question: RenderData,
	answer: RenderData,
	points: number,
}
