import { useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useContestants = defineStore("contestants", () => {
	const increase = ref(100);
	const contestants = useLocalStorage<Set<string>>("contestants", new Set());
	const contestantsPoints = useLocalStorage<Map<string, number>>("contestantsPoints", new Map());
	const contestantsBackgrounds = useLocalStorage<Map<string, string | null>>(
		"contestantsBackgrounds",
		new Map()
	);

	function setIncrease(inc: number) {
		increase.value = inc;
	}

	function incrementPoints(contestant: string) {
		const oldValue = contestantsPoints.value.get(contestant) ?? 0;
		contestantsPoints.value.set(contestant, oldValue + increase.value);
	}

	function decrementPoints(contestant: string) {
		const oldValue = contestantsPoints.value.get(contestant) ?? 0;
		contestantsPoints.value.set(contestant, oldValue - increase.value);
	}

	function addBonusPoints(contestant: string) {
		const oldValue = contestantsPoints.value.get(contestant) ?? 0;
		contestantsPoints.value.set(contestant, oldValue + increase.value / 2);
	}

	const setPoints = (points: number, contestant: string) => {
		contestantsPoints.value.set(contestant, points);
	};

	const addContestant = (contestant: string, background?: string | null) => {
		if (!contestants.value.has(contestant)) {
			contestants.value.add(contestant);
			contestantsPoints.value.set(contestant, 0);
		}
		contestantsBackgrounds.value.set(contestant, background ?? null);
	};

	const removeContestant = (contestant: string) => {
		contestants.value.delete(contestant);
		contestantsPoints.value.delete(contestant);
		contestantsBackgrounds.value.delete(contestant);
	};

	return {
		increase,
		contestants,
		contestantsPoints,
		contestantsBackgrounds,
		setIncrease,
		incrementPoints,
		decrementPoints,
		addBonusPoints,
		setPoints,
		addContestant,
		removeContestant,
	};
});
