export interface RenderData
{
	image?: {
		url: string,
		height: number,
	},
	audio?: string,
	text?: string,
}

export interface Question
{
	question: RenderData,
	answer: RenderData,
	points: number,
}
