<script setup lang="ts">
import { type Category } from "@/models/Category";
import { useQuestionStore } from "@/stores/question";
import { useContestants } from "@/stores/contestants";
defineProps<{
	categories: Category[];
	pointsRow: boolean;
}>();

const scores = useContestants();
const questionStore = useQuestionStore();

</script>

<template>
	<div class="board-base">
		<div class="board-holder">
			<div class="point-holder" v-if="pointsRow">
				<div>
					<div class="point-title-holder">
						<h4>Points</h4>
					</div>
				</div>
				<div>100</div>
				<div>200</div>
				<div>300</div>
				<div>400</div>
				<div>500</div>
			</div>
			<div class="category" v-for="category in categories">
				<div class="board-title-holder">
					<img v-if="category.icon" :src="`Icons/${category.icon}`" :height="50">
					<h1>{{ category.name }}</h1>
					<h3 v-if="category.multiplier">{{ category.multiplier }}x</h3>
				</div>
				<button v-for="(question, name) in category.questions" @click="() =>
				{
					scores.setIncrease(question.points * (category.multiplier ?? 1));
					questionStore.setQuestion(question, category.name, name);
				}" :class="{ answered: questionStore.isAnswered(category.name, name) }">
					{{ name }}
				</button>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.board-base {
	display: flex;
	height: 100%;
	width: 100%;
	flex-direction: column;

	>.board-titles {
		display: flex;
		flex-direction: row;
		align-items: stretch;
		row-gap: 10px;


		>.point-title-holder {
			flex: .5;
			text-align: center;
			color: #cdd6f4;
			height: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
		}

		>.board-title-holder {
			flex: 1;
			text-align: center;
			color: #cdd6f4;
			height: 100%;
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;
		}
	}
}

.board-holder {
	display: flex;
	flex-direction: row;
	flex: 1;
	align-items: stretch;
	justify-content: center;
	column-gap: 10px;
	padding-left: 5px;
	padding-right: 5px;
	padding-bottom: 5px;

	>.point-holder {
		.point-title-holder {
			flex: .5;
			text-align: center;
			justify-content: center;
			align-items: center;
			display: flex;
		}


		height: 100%;
		display: flex;
		flex: .5;
		flex-direction: column;
		align-items: stretch;
		row-gap: 10px;
		color: #cdd6f4;

		>* {
			flex: 1;
			font-size: 3em;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}

	>.category {
		height: 100%;
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: stretch;
		row-gap: 10px;

		>button {
			flex: 1;
			font-size: 2.5em;
			background-color: var(--data-bg-color);
			color: #bac2de;
			border: none;
			border-radius: 10px;

			&:active,
			&.answered {
				background-color: #181825a0;
				color: #7f849c;
			}
		}

		>.board-title-holder {
			flex: 1;
			text-align: center;
			color: #cdd6f4;
			height: 185px;
			justify-content: center;
			align-items: center;
			display: flex;
			flex-direction: column;
		}
	}
}
</style>
