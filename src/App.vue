<script setup lang="ts">
import Board from "@/components/Board.vue";
import Contestants from "@/components/Contestants.vue";
import QuestionView from "@/components/QuestionView.vue";
import toRender from "@/questions";
import RandomBackground from "@/data/backgrounds";
import { useQuestionStore } from "@/stores/question";
import { ref } from "vue";

const background = ref(RandomBackground());

setInterval(() => background.value = RandomBackground(), /**/ 60 * /**/ 1000);

const question = useQuestionStore();

const players = [
	"Test",
].sort();

</script>

<template>
	<div class="background-holder">
		<div class="holder">
			<div class="board-holder">
				<Board v-if="question.question == null" :categories="toRender" :points-row="true" />
				<QuestionView v-else :question="question.question" />
			</div>
			<Contestants class="score-bar" />
		</div>
	</div>
</template>

<style lang="scss">
:root {
	--data-bg-color: hsla(240, 21%, 25%, 0.878);
}
</style>

<style scoped lang="scss">
.background-holder {
	background-image: v-bind(background);
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100%;
}

.holder {
	background-color: #18181890;
	padding-top: 20px;
	display: flex;
	flex-direction: column;
	align-items: stretch;
	height: 100%;
	row-gap: 10px;
}

.board-holder {
	height: 100%;
}

.score-bar {
	flex: 1;
	min-height: 130px;
}
</style>
