<script>
	import Hello from './Hello.svelte'
	let name = 'world';
</script>

<h1>Hello {name}!</h1>
<Hello />

<style>
	h1 {
		color: red;
	}	
</style>

<button on:click={() => {name = 'Heropy'}}>
	Change!
</button>