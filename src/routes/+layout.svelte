<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<div>
	<div class="container flex flex-col items-center min-h-screen max-w-screen-sm mx-auto px-4">
        {@render children()}
	</div>
</div>
