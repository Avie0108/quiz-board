<script setup lang="ts">
import type { MediaData, RenderData } from "@/models/Question";

defineProps<{
	data: RenderData;
}>();

type MediaBind = Pick<MediaData, Exclude<keyof MediaData, "url">> & { src: string };

const extractMediaBinds = (data: MediaData | string): MediaBind => {
	if (typeof data == "object") {
		const result: MediaBind = {
			src: data.url,
			...data,
		};
		return result;
	}

	return { src: data };
};
</script>

<template>
	<div class="data-holder">
		<div v-if="data.text" style="white-space: pre-line">
			{{ data.text }}
		</div>
		<div v-if="data.image">
			<img v-bind="extractMediaBinds(data.image)" />
		</div>
		<div v-if="data.video">
			<video v-bind="extractMediaBinds(data.video)" controls />
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
