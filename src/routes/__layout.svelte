<script lang="ts">
import NavBar from "../components/NavBar.svelte";
</script>

<svelte:head>
	<title>Quicalc - train your math skills</title>
</svelte:head>

<body>
	<header>
		<NavBar />
	</header>
	<slot />
</body>

<style global>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&family=Poppins&display=swap");

* {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	font-family: "Poppins", sans-serif;
}

:root {
	--primary: #001220;
	--secondary-red: #e53d00;
	--secondary-blue: #7494ea;
	--secondary-green: #43aa8b;
}

body {
	background-color: var(--primary);
	color: rgb(255, 255, 255);
}
slot {
	height: 92.5vh;
}
</style>
