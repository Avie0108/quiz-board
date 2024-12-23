import { set, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export type ContestantId = number | string;

export const useContestants = defineStore("contestants", () =>
{
	const increase = ref(100);
	const contestants = useLocalStorage<string[]>('contestants', []);
	const contestantsPoints = useLocalStorage<{ [contestant: string]: number; }>("contestantsPoints", {});
	const contestantsBackgrounds = useLocalStorage<{ [contestant: string]: string | null; }>("contestantsBackgrounds", {});

	const getContestantName = (contestant: ContestantId) =>
	{
		if (typeof (contestant) == "string")
			return contestant;
		else
			return contestants.value[contestant];
	};

	function setIncrease(inc: number) { increase.value = inc; }

	function incrementPoints(contestant: string)
	{

		const name = getContestantName(contestant);
		contestantsPoints.value[name] ??= 0;
		contestantsPoints.value[name] += increase.value;
	}

	function decrementPoints(contestant: string)
	{
		const name = getContestantName(contestant);
		contestantsPoints.value[name] ??= 0;
		contestantsPoints.value[name] -= increase.value;
	}

	function addBonusPoints(contestant: string)
	{

		const name = getContestantName(contestant);
		contestantsPoints.value[name] ??= 0;
		contestantsPoints.value[name] += increase.value / 2;
	}

	const setPoints = (points: number, contestant: ContestantId) =>
	{
		const name = getContestantName(contestant);
		contestantsPoints.value[name] ??= 0;
		contestantsPoints.value[name] = points;
	};

	const addContestant = (contestant: string, background?: string | null) =>
	{

		if (!contestants.value.includes(contestant))
		{
			contestants.value.push(contestant);
			contestantsPoints.value[contestant] = 0;
		}
		contestantsBackgrounds.value[contestant] = background ?? null;
	};

	const removeContestant = (contestant: number | string) =>
	{
		const name = getContestantName(contestant);

		contestants.value.splice(contestants.value.indexOf(name), 1);
		delete contestantsPoints.value[name];
		delete contestantsBackgrounds.value[name];
	};

	return {
		increase,
		contestants,
		contestantsPoints,
		contestantsBackgrounds,
		getContestantName,
		setIncrease,
		incrementPoints,
		decrementPoints,
		addBonusPoints,
		setPoints,
		addContestant,
		removeContestant,
	};
});
