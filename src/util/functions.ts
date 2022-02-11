export function randomItemFromEnum<T>(theEnum: T): T[keyof T] {
	const enumVals = Object.values(theEnum);
	const index = Math.floor(Math.random() * enumVals.length);
	return enumVals[index];
}

/**
 * Formats a time (in seconds) to the form mm:ss
 */
export function formatTime(time: number): string {
	const mins = Math.floor(time / 60)
		.toString()
		.padStart(2, "0");
	const secs = (time % 60).toString().padStart(2, "0");
	return `${mins}:${secs}`;
}
