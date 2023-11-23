
<script>
    import { onMount } from "svelte";
	import projects from '../routes/projects/projects.json';

	// @ts-ignore
	import { fade, blur, fly, slide, scale } from "svelte/transition";

	/**
     * @param {string | any[]} col
     * @param {number} amt
     */
	function LightenDarkenColor(col, amt) {
		var usePound = false;
		if (col[0] == "#") {
			col = col.slice(1);
			usePound = true;
		}
		// @ts-ignore
		var num = parseInt(col,16);
		var r = (num >> 16) + amt;
		if (r > 255) r = 255;
		else if  (r < 0) r = 0;
		var b = ((num >> 8) & 0x00FF) + amt;
		if (b > 255) b = 255;
		else if  (b < 0) b = 0;
		var g = (num & 0x0000FF) + amt;
		if (g > 255) g = 255;
		else if (g < 0) g = 0;
		return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);

	}

	/**
	 * FROM: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
     * @param {string | any[]} array
     */
	function shuffle(array) {
		let currentIndex = array.length,  randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex > 0) {

			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			// @ts-ignore
			[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]];
		}

		return array;
	}

	/**
     * @type {string | any[]}
     */
	let shuffled_projects = [];


	/**
     * @type {any[String]}
     */
	let projects_name = [];

	/**
     * @type {any[]}
     */
	let colors = [];

	onMount(() => {
        show = true;
		shuffled_projects = shuffle(projects.slice(0));
		for (let i = 0; i < 8; i++) {
			projects_name.push(" " + shuffled_projects[i].name + " •");
			colors.push(shuffled_projects[i].color);
		}
    });

    let show = false;


    /**
     * @param {any} base_color
     */
    function generateGradient(base_color) {
		return "fill: #0E4242";
    }

	const paths_d = [
		"M840,360c0,110.46-89.54,200-200,200s-200-89.54-200-200s89.54-200,200-200S840,249.54,840,360z",
		"M920,360c0,154.64-125.36,280-280,280 S360,514.64,360,360S485.36,80,640,80S920,205.36,920,360z",
		"M1000,360c0,198.82-161.18,360-360,360S280,558.82,280,360S441.18,0,640,0S1000,161.18,1000,360z",
		"M1080,360c0,243.01-196.99,440-440,440S200,603.01,200,360S396.99-80,640-80S1080,116.99,1080,360z",
		"M1160,360c0,287.19-232.81,520-520,520S120,647.19,120,360s232.81-520,520-520S1160,72.81,1160,360z",
		"M1240,360c0,331.37-268.63,600-600,600S40,691.37,40,360s268.63-600,600-600S1240,28.63,1240,360z",
		"M1320,360c0,375.55-304.45,680-680,680S-40,735.55-40,360s304.45-680,680-680S1320-15.55,1320,360z"
	];

	export let showProject = (/** @type {number} */ id) => {};

	/**
     * @param {number} [id]
     */
	function textClicked(id) {
		// @ts-ignore
		console.log(projects.indexOf(shuffled_projects[id]))
		// @ts-ignore
		showProject(projects.indexOf(shuffled_projects[id]));
	}

	/**
     * @param {any} textLength
     * @param {number} radius
     */
	function calculateRepeat(textLength, radius) {
		var value = (75 * ((radius * 0.75) + 1)) / (textLength + 5);
		// console.log(value + " (" + textLength + ", " + radius + ")");
		return value;
	}

</script>


{#if show}
<div style="width: 100; height: 100%; overflow-y: hidden;">
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
		 viewBox="0 0 1280 720" enable-background="new 0 0 1280 720" xml:space="preserve">
	<circle cx="640" cy="360" r="160"/>
	<path d="M2442.7,392.43"/>
	<text transform="matrix(1 0 0 1 500.8802 402.1252)" fill="#239DD9" font-family="'Leentank'" font-size="64px">PROJETS</text>
	<text transform="matrix(1 0 0 1 505.6016 397.1537)" fill="#FFFFFF" font-family="'Leentank'" font-size="64px">PROJETS</text>
	<text transform="matrix(1 0 0 1 564.9223 359.9998)" fill="#009FE3" font-family="'Leentank'" font-size="62px">Mes</text>
	<defs>
		<radialGradient id="rainbow" x1="0%" x2="100%" y1="0%" y2="100%" gradientTransform="translate(-320, -180) scale(1.5, 1.5)"  gradientUnits="userSpaceOnUse" >
		  <stop stop-color="{colors[0]}" offset="20%"/>
		  <stop stop-color="{colors[1]}" offset="37%"/>
		  <stop stop-color="{colors[2]}" offset="44%"/>
		  <stop stop-color="{colors[3]}" offset="60%"/>
		  <stop stop-color="{colors[4]}" offset="70%"/>
		  <stop stop-color="{colors[5]}" offset="82%"/> 
		  <stop stop-color="{colors[6]}" offset="96%"/> 
		</radialGradient>
	</defs>
	<!-- <rect style="opacity: 0.75;" fill="url(#rainbow)" width="100%" height="100%"></rect> -->
	{#each shuffled_projects as project}
		<path id={project.name} fill="none" d="{paths_d[shuffled_projects.indexOf(project)]}"/>

		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<text on:click={() => textClicked(shuffled_projects.indexOf(project))} fill="url(#rainbow)" id="spinning_text" class="circle{shuffled_projects.indexOf(project) + 1}">
			<textPath  xlink:href="#{project.name}">
				{(" " + project.name + " •").repeat(calculateRepeat(project.name.length + 3, shuffled_projects.indexOf(project)))}
			</textPath>
		</text>
	{/each}
	</svg>
</div>
{/if}


<style>

	div {
		z-index: -5;
	}

	#spinning_text {
		font-family: 'Leentank';
		transform-origin: 50% 50%;
		font-weight: 700;
		font-size: 54px;
		user-select: none;
	}
	
	#spinning_text:hover {
		cursor: pointer;
		fill: white;
		stroke: black;
	}

	.circle1 {
		animation: rotating 25s linear infinite;
	}
	
	.circle2 {
		animation: rotating 30s linear infinite;
		animation-direction: reverse;
	}
	
	.circle3 {
		animation: rotating 35s linear infinite;
	}
	
	.circle4 {
		animation: rotating 40s linear infinite;
		animation-direction: reverse;
	}
	
	.circle5 {
		animation: rotating 45s linear infinite;
	}
	
	.circle6 {
		animation: rotating 50s linear infinite;
		animation-direction: reverse;
	}
	
	.circle7 {
		animation: rotating 55s linear infinite;
	}
	
	@keyframes rotating {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>