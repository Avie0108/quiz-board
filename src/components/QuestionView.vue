<script setup lang="ts">
import type { Question } from "@/models/Question";
import { useQuestionStore } from "@/stores/question";
import { onMounted, onUnmounted, ref } from "vue";
import RenderDataRenderer from "./RenderDataRenderer.vue";

defineProps<{
	question: Question;
}>();

const questionStore = useQuestionStore();
const showAnswer = ref(false);

const keyup = (event: KeyboardEvent) =>
{
	switch (event.key)
	{
		case "Escape":
			questionStore.removeQuestion();
			return;
		case " ":
			if (!showAnswer.value)
			{
				showAnswer.value = true;
				questionStore.markAnswered();
			}
			else
				questionStore.removeQuestion();
	}

};


onMounted(() => document.addEventListener('keyup', keyup));
onUnmounted(() => document.removeEventListener('keyup', keyup));

</script>

<template>
	<div class="question-holder">
		<RenderDataRenderer class="question-data-renderer" :data="question.question" />
		<div class="line" v-if="showAnswer" />
		<RenderDataRenderer class="question-data-renderer" v-if="showAnswer" :data="question.answer" />
	</div>
</template>

<style scoped lang="scss">
.question-holder {
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	padding: 5px;

	row-gap: 5px;

	justify-content: center;

	>.line {
		width: 100%;
		border-top: 5px dotted white;
	}

	>.question-data-renderer {
		flex: 1
	}
}
</style>
