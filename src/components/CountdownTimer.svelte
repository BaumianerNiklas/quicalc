<!--
  @component
  A timer that counts down
-->
<script lang="ts">
import { createEventDispatcher, onDestroy } from "svelte";
import { formatTime } from "$util/functions";

/** Whether or not the clock should be counting down */
export let started = true;
/** The time the timer should run for */
export let time: number = 180;
/** The font size of the timer digits in rem */
export let fontSize = 1;

const dispatch = createEventDispatcher<{ "time-up": void }>();

const clockInterval = setInterval(() => {
	if (!started) return;
	time -= 1;
	if (time === 0) {
		clearInterval(clockInterval);
		dispatch("time-up");
	}
}, 1000);

onDestroy(() => clearInterval(clockInterval));
</script>

<div>
	<p style:font-size="{fontSize}rem">
		{formatTime(time)}
	</p>
</div>
