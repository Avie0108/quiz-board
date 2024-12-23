import type { Question } from "@/models/Question";
import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useQuestionStore = defineStore('question', () =>
{
	const question = ref<Question | null>(null);
	const questionVal = ref<string | null>(null);
	const answered = useLocalStorage<string[]>('questionsAnswered', []);
	const removeQuestion = () => question.value = questionVal.value = null;

	const setQuestion = (quest: Question, category: string, q: string | number) =>
	{
		question.value = quest;
		questionVal.value = `${category}|${q}`;
	};

	const markAnswered = () => questionVal.value ? answered.value.push(questionVal.value) : null;
	const isAnswered = (category: string, question: string | number) => answered.value.includes(`${category}|${question}`);

	return {
		question,
		removeQuestion,
		setQuestion,
		markAnswered,
		isAnswered,
	};
});
