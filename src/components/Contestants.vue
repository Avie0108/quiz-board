<script setup lang="ts">
import { useContestants } from "@/stores/contestants";
import PointsView from "@/components/Points.vue";

const contestants = useContestants();

const addClicked = () =>
{
	const name = prompt("new contestant name");
	if (name && name.trim() != "")
	{
		const background = prompt("contestant background", contestants.contestantsBackgrounds[name] ?? undefined);
		contestants.addContestant(name, background?.trim());
	}
}

</script>

<template>
	<div class="contestants" @click.right="addClicked" oncontextmenu="return false;">
		<div v-for="(contestant, i) in contestants.contestants" class="contestant"
			@mouseup.middle="contestants.removeContestant(contestant)">
			<PointsView :name="contestant" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use "sass:math";

.contestants {
	display: flex;
	justify-content: center;
	column-gap: 5px;
	padding-top: 5px;

	height: 100%;
}

.contestant-add {
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;

	button {
		font-size: 2.5em;
		background-color: unset;
		border: solid;
		border-radius: 100%;
		height: 3.5rem;
		width: 3.5rem;
	}
}
</style>
