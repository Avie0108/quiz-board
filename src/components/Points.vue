<script setup lang="ts">
import { useContestants } from "@/stores/contestants";
import { computed } from "vue";

const props = defineProps<{
	name: string;
}>();

const contestants = useContestants();

const background = computed(() => `url(${contestants.contestantsBackgrounds[props.name]})`);
const points = computed(() => contestants.contestantsPoints[props.name]);

const setPoints = (event: Event) =>
{
	contestants.setPoints(parseInt((event.target as HTMLSpanElement).textContent ?? "0"), props.name);
};

const cancelEnter = (e: KeyboardEvent) =>
{
	e.preventDefault();
	(e.target as HTMLSpanElement).blur();
};

</script>

<template>
	<div class="points-holder">
		<span contenteditable @blur="setPoints" @keydown.enter="cancelEnter" @click.stop="() => { }">
			{{ points }}
		</span>
		<div class="points-buttons">
			<button class="points-add-button"
				@click="(e) => { contestants.incrementPoints(name); (e.target as HTMLButtonElement).blur(); }">+</button>
			<button class="points-bonus-button"
				@click="(e) => { contestants.addBonusPoints(name); (e.target as HTMLButtonElement).blur(); }">^</button>
			<button class="points-sub-button"
				@click="(e) => { contestants.decrementPoints(name); (e.target as HTMLButtonElement).blur(); }">-</button>
		</div>
		<h2>{{ name }}</h2>
	</div>
</template>

<style scoped lang="scss">
.points-holder {
	background-color: #71768b;
	color: #cdd6f4;
	display: flex;
	flex-direction: column;
	align-items: center;

	padding: 5px;
	padding-top: 10px;

	min-width: 6rem;

	border-top-left-radius: 10px;
	border-top-right-radius: 10px;

	background-image: v-bind(background);
	background-blend-mode: multiply;
	background-size: contain;
	background-position: center;
	background-repeat: no-repeat;

	height: 100%;

	>h2 {
		text-decoration: underline;

	}

	>span {
		width: 100%;
		border: none;
		font-size: 1.5em;
		color: #cdd6f4;
		text-align: right;
	}

	>.points-buttons {
		>button {
			border: none;
			background-color: inherit;
			font-size: 2em;

			&.points-add-button {
				color: #40a02b;
				text-align: center;
			}

			&.points-bonus-button {
				color: #afbe25;
				text-align: center;
				font-size: 1.8em;
				align-items: center;
			}

			&.points-sub-button {
				color: #d20f39;
				text-align: center;
			}
		}
	}
}
</style>
