<script lang="ts">
import CountdownTimer from "$components/CountdownTimer.svelte";
import MathPrompt from "$components/MathPrompt.svelte";
import ResultBoard from "$components/ResultBoard.svelte";
import type { Answer } from "$typings/Answer";
import { GameMode } from "$typings/GameModes";

let started = false;
let timeUp = false;
let selectedTime = 300;
$: time = selectedTime;

const answers: Answer[] = [];

const handleTimeSelect = (time: number) => {
	selectedTime = time;
	console.log(selectedTime);
};

const handlePromptAnswered = (e: CustomEvent<Answer>) => {
	answers.push(e.detail);
};

const handleTimeUp = () => {
	timeUp = true;
};

// Second parameter here is required for the function to rerun in the html when `selectedTime` changes
const selectButtonClassList = (time: number, ..._dependencies: any) => {
	return `time-select ${selectedTime === time ? "selected" : ""}`;
};
</script>

<main style:margin-top={timeUp ? "5vh" : "20vh"}>
	{#if !timeUp}
		<CountdownTimer fontSize={started ? 2 : 3} {started} on:time-up={handleTimeUp} {time} />
	{/if}
	{#if !started}
		<div class="time-select-container">
			<button class={selectButtonClassList(60, selectedTime)} on:click={() => handleTimeSelect(60)}>1:00</button>
			<button class={selectButtonClassList(180, selectedTime)} on:click={() => handleTimeSelect(180)}>3:00</button>
			<button class={selectButtonClassList(300, selectedTime)} on:click={() => handleTimeSelect(300)}>5:00</button>
		</div>
		<button class="start-button" on:click={() => (started = true)}>Start</button>
	{:else if !timeUp}
		<MathPrompt on:prompt-answered={handlePromptAnswered} />
	{:else if timeUp}
		<ResultBoard {answers} time={selectedTime} gameMode={GameMode.Time} />
	{/if}
</main>

<style>
main {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.time-select-container {
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 1rem;
}
button {
	background-color: transparent;
	border: 3px solid var(--secondary-blue);
	color: white;
	font-size: 2rem;
	border-radius: 10px;
	width: 6.5rem;
	height: 4.5rem;
}

button:hover {
	transform: scale(1.1);
}

.selected {
	background-color: var(--secondary-blue);
}
.start-button {
	font-size: 2.5rem;
	background-color: var(--secondary-green);
	border: none;
	margin-top: 2rem;
	width: 7rem;
	height: 5rem;
}
</style>
