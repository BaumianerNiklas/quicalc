<!--
@component
Displays and stores a math prompt with its corresponding answer	
-->
<script lang="ts">
import { randomItemFromEnum } from "$util/functions";
import type { Answer } from "$typings/Answer";
import { createEventDispatcher, onMount } from "svelte";

/** Wether or not to automatically generate a new prompt when an answer to the current one is submitted */
export const autoContinue = true;
/** The highest possible number which should appear in a prompt */
export const maxNum = 30;

const dispatch = createEventDispatcher<{ "prompt-answered": Answer }>();

enum OpSymbol {
	Add = "+",
	Subtract = "-",
	Multiply = "×",
}

onMount(() => {
	newPrompt();
});

let promptStr = "";
let answer: number;
let correctAnswer = NaN;
let start = Date.now();

const newPrompt = () => {
	const op = randomItemFromEnum(OpSymbol);
	const num1 = Math.floor(Math.random() * maxNum);
	const num2 = Math.floor(Math.random() * maxNum);

	switch (op) {
		case OpSymbol.Add:
			correctAnswer = num1 + num2;
			break;
		case OpSymbol.Subtract:
			correctAnswer = num1 - num2;
			break;
		case OpSymbol.Multiply:
			correctAnswer = num1 * num2;
			break;
		default:
			correctAnswer = NaN;
	}

	promptStr = `${num1} ${op} ${num2}`;
};

const handleAnswer = () => {
	if (answer === undefined) return;
	dispatch("prompt-answered", {
		promptStr,
		givenAnswer: answer,
		correctAnswer,
		correct: answer === correctAnswer,
		timeTaken: Date.now() - start,
	});
	answer = undefined;
	start = Date.now();

	if (autoContinue) newPrompt();
};
</script>

<div class="prompt-container">
	<h1>{promptStr}</h1>
	<form on:submit|preventDefault={handleAnswer}>
		<input bind:value={answer} placeholder="42" type="number" />
	</form>
</div>

<style>
h1 {
	font-size: 4rem;
	color: var(--secondary-blue);
}
input {
	height: 2em;
	width: 5em;
	border: none;
	background-color: var(--primary);
	border-bottom: 2px solid white;
	color: white;
	font-size: 2.5rem;
	text-align: center;
	padding: 0;
}
input:focus {
	outline: none;
}
.prompt-container {
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	flex-direction: column;
}

/* Hide number arrows */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

input[type="number"] {
	-moz-appearance: textfield;
}
</style>
