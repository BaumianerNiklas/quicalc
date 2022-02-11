<!--
	@component
	Displays the results of a game.
-->
<script lang="ts">
import { formatTime } from "$util/functions";
import type { Answer } from "$typings/Answer";
import { GameMode } from "$typings/GameModes";
import ResultCard from "./ResultCard.svelte";

/** The answers the user has given */
export let answers: Answer[];
/** The Game Mode that has been played */
export let gameMode: GameMode;
/** The amount of time spent playing */
export let time: number;

// Stats
const heading = gameMode === GameMode.Time ? `Time Mode [${formatTime(time)}]` : "";
const answersLen = answers.length;
const correctAnswers = answers.filter((a) => a.correct).length;
const correctPercent = (correctAnswers / answersLen) * 100;
const avgTimePerAnswer = (answers.reduce((acc, a) => acc + a.timeTaken, 0) / answersLen / 1000).toFixed(2);
</script>

<svelte:head>
	<title>Results - {heading}</title>
</svelte:head>
<section>
	<h1>Results - {heading}</h1>
	<div class="stats">
		<h2 style:color={`var(--secondary-${correctPercent > 50 ? "green" : "red"})`}>
			{correctAnswers}/{answersLen} ({correctPercent.toFixed(2)}%)
		</h2>
		<p>Average time per answer: {avgTimePerAnswer}s</p>
	</div>
	<h2 class="your-answers">Your answers</h2>
	<div class="grid-container">
		{#each answers as answer, _ (answer)}
			<ResultCard {answer} />
		{/each}
	</div>
</section>

<style>
h1,
h2,
p {
	text-align: center;
}
h1 {
	font-size: 3rem;
	color: var(--secondary-blue);
}

h2 {
	font-size: 2.25rem;
}

p {
	font-size: 1.25rem;
	margin-bottom: 2rem;
}
.your-answers {
	margin-bottom: 1rem;
}
.grid-container {
	display: grid;
	width: 75vw;
	grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	gap: 1.5em;
}
</style>
