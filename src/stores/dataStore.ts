import type { tViewsByDate, tViewsByCountry, tViewsByPage } from "$lib/types";
import { writable } from 'svelte/store';

export const viewsOverall = writable<number>(0);
export const viewsToday = writable<number>(0);
export const viewsByDate = writable<Array<tViewsByDate>>();
export const viewsByCountry = writable<Array<tViewsByCountry>>();
export const viewsByPage = writable<Array<tViewsByPage>>();