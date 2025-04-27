<script lang="ts">
    import { formatNumber } from "$lib/helper"
    import ListItemBarChart from "$lib/components/ListItemBarChart.svelte";
    import ListItemLink from "$lib/components/ListItemLink.svelte";
	import logo from "$lib/images/logo.png";
    import { viewsToday, viewsByDate, viewsOverall, viewsByCountry, viewsByPage } from "../../stores/dataStore";
</script>

<nav class="flex items-center w-full mb-4 justify-between">
    <a href="/stats" data-sveltekit-reload>
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

<div class="w-full grid grid-cols-2 sm:grid-cols-4 gap-2">

    <div class="p-4 rounded-lg bg-emerald-500 text-white">
        <h2 class="text-sm mb-1">Today</h2>
        <p>
            <span class="text-2xl">{formatNumber($viewsToday)}</span>
            <span class="text-xs"> views</span>
        </p>
    </div>

    <div class="p-4 rounded-lg bg-gray-700 text-white">
        <h2 class="text-sm mb-1">Last 10 days</h2>
        <p>
            <span class="text-2xl">{formatNumber($viewsByDate.map(o => o.views).reduce((sum, n) => sum + n, 0))}</span>
            <span class="text-xs"> views</span>
        </p>
    </div>

    <div class="p-4 rounded-lg bg-gray-700 text-white col-span-2">
        <h2 class="text-sm mb-1">Overall</h2>
        <p>
            <span class="text-2xl">{formatNumber($viewsOverall)}</span>
            <span class="text-xs"> views</span>
        </p>
    </div>

</div>

<div class="w-full grid gap-2 grid-cols-1 sm:grid-cols-2">
    <div>
        <div class="mt-4 text-white">
            <div class="w-full flex justify-between">
                <h2 class="p-2 text-gray-700">Last 10 days</h2>
                <div class="flex flex-wrap">
                    <div class="px-4 py-2 rounded-t-lg bg-gray-700">Views</div>
                </div>
            </div>
            <div class="flex flex-col px-4 pt-4 pb-2 rounded-l-lg rounded-b-lg bg-gray-700">
                {#each $viewsByDate as {day, views}}
                <ListItemBarChart
                    description = {day}
                    values = {$viewsByDate}
                    value = {views}
                />
                {/each}
            </div>       
        </div>
    </div>
    <div>
        <div class="mt-4 text-white">
            <div class="w-full flex justify-between">
                <h2 class="p-2 text-gray-700">Top 10 countries</h2>
                <div class="flex flex-wrap">
                    <div class="px-4 py-2 rounded-t-lg bg-gray-700">Views</div>
                </div>
            </div>
        
            <div class="flex flex-col px-4 pt-4 pb-2 rounded-l-lg rounded-b-lg bg-gray-700">
                {#each $viewsByCountry as {country, views}}
                <ListItemBarChart
                    description = {country}
                    values = {$viewsByCountry}
                    value = {views}
                />
                {/each}
            </div>       
        </div>
    </div>
    <div class="col-span-1 sm:col-span-2">
        <div class="mt-4 text-white">
            <div class="w-full flex justify-between">
                <h2 class="p-2 text-gray-700">Top 10 pages</h2>
                <div class="flex flex-wrap">
                    <div class="px-4 py-2 rounded-t-lg bg-gray-700">Views</div>
                </div>
            </div>
        
            <div class="flex flex-col px-4 pt-4 pb-2 rounded-l-lg rounded-b-lg bg-gray-700">
                {#each $viewsByPage as {page, views}}
                <ListItemLink
                    url = {page}
                    value = {views}
                />
                {/each}
            </div>       
        </div>
    </div>
</div>