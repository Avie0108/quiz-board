import type { Question } from "@/models/Question";

export interface Category
{
	name: string,
	icon?: string,
	multiplier?: number,
	questions: { [title: string]: Question; };
}
