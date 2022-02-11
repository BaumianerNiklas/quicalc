<script lang="ts">
import type { Answer } from "$typings/Answer";
/** The answer this result card should display */
export let answer: Answer;
const color = `var(--secondary-${answer.correct ? "green" : "red"})`;
</script>

<div class="card" style:border-color={color}>
	<div class="time-taken-container">
		<div class="clock-icon">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
				<path
					fill-rule="evenodd"
					d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
					clip-rule="evenodd" />
			</svg>
		</div>
		<span>{(answer.timeTaken / 1000).toFixed(2)}s</span>
	</div>
	<h2 style:color>{answer.promptStr}</h2>

	<div class="answer-container">
		<div>
			<span class="answer-heading">GIVEN</span>
			<span class="answer">{answer.givenAnswer}</span>
		</div>
		<div>
			<span class="answer-heading">CORRECT</span>
			<span class="answer">{answer.correctAnswer}</span>
		</div>
	</div>
</div>

<style>
.card {
	padding: 1em;
	border: 2px solid white;
	border-radius: 5px;
}
.answer-container {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	gap: 2em;
}
.answer-container > div {
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	flex-direction: column;
}
.answer {
	font-size: 1.5rem;
}
h2 {
	font-size: 2rem;
	text-align: center;
}
.time-taken-container {
	display: flex;
	align-items: center;
	gap: 0.3rem;
}

div.clock-icon {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 1.5rem;
	height: 1.5rem;
}
svg {
	color: var(--secondary-blue);
}
</style>
