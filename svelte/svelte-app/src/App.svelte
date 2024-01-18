<script>
	//import {onMount} from 'svelte'
	import Fruits from './Fruits.svelte'
	let name = 'Fruits';
	let age = 85;
	let toggle = false;
	let fruits = ['Apple', 'Banana', 'Cherry', 'Orange', 'Mango']
	let isRed = false;
	let text = '';

	//onMount(() => {
	//	const box = document.querySelector('.box');
	//	box.addEventListener('click', () => {isRed = !isRed});
	//});

	function enter() {
		name = 'enter'
	}

	function leave() {
		name = 'leave'
	}

	if (toggle) {

	} else {

	}

	/*setTimeout(() => {
		name = 'Heropy';
		age = 36;
	}, 3000)*/

	function assign() {
		name = 'Heropy';
		age = 36;
	}

	function deleteFruit() {
		fruits = fruits.slice(1);
	}
</script>

<Fruits {fruits} />
<Fruits {fruits} reverse />
<Fruits {fruits} slice="-2" />
<Fruits {fruits} slice="0, 3" />

<button on:click={() => {toggle = !toggle}}>
	Toggle
</button>

{#if toggle}
	<h1>Hello {name}!</h1>
{:else}
	<div>No name!</div>
{/if}

<h1>Hello {name}!</h1>
<ul>
	{#each fruits as fruit}
		<li>{fruit}</li>
	{/each}
</ul>
<button on:click={deleteFruit}>
	Eat it!
</button>

<div class="box"
	style="background-color: {isRed ? 'red' : 'orange'};"
	on:click={() => {isRed = !isRed}}
	on:mouseenter={enter}
	on:mouseleave={leave}>Box!</div>


<h1>
	{text}
</h1>
<input type="text"
	value={text}
	on:input={(e) => {text = e.target.value}} />
<input type="text"
	bind:value={text} />
<button on:click={() => {text = 'Heropy'}}>
	Click
</button>

<h2>
	Fruits
</h2>
<ul>
	{#each fruits as fruit}
		<li>{fruit}</li>
	{/each}
</ul>

<h2>
	Fruits reverse
</h2>
<ul>
	<!-- ...['Apple', 'Banana', 'Cherry', 'Orange', 'Mango']
	'Apple', 'Banana', 'Cherry', 'Orange', 'Mango'
	['Apple', 'Banana', 'Cherry', 'Orange', 'Mango']
 	-->
	{#each [...fruits].reverse() as fruit}
		<li>{fruit}</li>
	{/each}
</ul>

<h2>
	Fruits slice -2
</h2>
<ul>
	{#each fruits.slice(-2) as fruit}
		<li>{fruit}</li>
	{/each}
</ul>

<style>
	.box{
		width: 300px;
		height: 150px;
		background-color: orange;
	}
</style>

<h2 class={age < 85 ? 'active' : ''}>
	{age}
</h2>
<img src="" alt={name} />
<input type="text" bind:value={name} />
<button on:click={assign}>
	Assign
</button>

<!-- <style>
	h1 {
		color: red;
	}
	.active {
		color: blue;
	}
</style> -->