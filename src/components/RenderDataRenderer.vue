<script setup lang="ts">
import type { RenderData } from "@/models/Question";

defineProps<{
	data: RenderData;
}>();

</script>

<template>
	<div class="data-holder">
		<div v-if="data.text" style="white-space: pre-line;">
			{{ data.text }}
		</div>
		<div v-if="data.image">
			<img v-bind="(() =>
			{
				if (typeof data.image == 'object')
					return {
						src: data.image.url,
						...data.image,
						url: undefined,
					};
				else
					return {
						src: data.image
					};
			})()" />
		</div>
		<div v-if="data.video">
			<video v-bind="(() =>
			{
				if (typeof data.video == 'object')
					return {
						src: data.video.url,
						...data.video,
						url: undefined,
					};
				else
					return {
						src: data.video
					};
			})()" controls />
		</div>
		<div v-if="data.audio">
			<audio :src="data.audio" controls />
		</div>
	</div>
</template>

<style scoped lang="scss">
.data-holder {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-size: 3em;
	text-align: center;
	color: white;
	background-color: var(--data-bg-color);
	border-radius: 25px;

	img {
		border-radius: 10px;
	}
}
</style>
