<script lang="ts">
	import logo from "$lib/images/logo.png";
</script>

<nav class="flex items-center w-full mb-4 justify-between">
    <a href="/" data-sveltekit-reload>
        <img src={logo} alt="logo" width="75" height="75" />
    </a>
    <a href="/">
        <button	class="border border-gray-400 hover:border-gray-700 inline-block text-gray-400 hover:text-gray-700 py-2 px-4 rounded-lg cursor-pointer">
            Home
        </button>
    </a>
    <a href="/another-page">
        <button	class="border border-gray-400 hover:border-gray-700 inline-block text-gray-400 hover:text-gray-700 py-2 px-4 rounded-lg cursor-pointer">
            Another Page
        </button>
    </a>
    <a href="/stats">
        <button	class="bg-emerald-500 hover:bg-gray-700 border border-emerald-500 hover:border-gray-700 inline-block text-white py-2 px-4 rounded-lg cursor-pointer">
            Stats
        </button>
    </a>
</nav>

<h1>Just another page</h1>

<p>You should see your page visit in the stats now.</p>

<img src="/.netlify/functions/counter"
    alt=""
    width="0"
    height="0"
    hidden
    decoding="async"
    loading="eager" />