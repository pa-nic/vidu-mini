
import { viewsToday, viewsByDate, viewsOverall, viewsByCountry, viewsByPage } from "../../stores/dataStore";
import { getNameOfDay } from "$lib/helper";
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {

	const today = new Date();

	try {
		/**
		* Get overall visits
		**/
		const r_overall = await fetch(`/.netlify/functions/getOverallViews`);
		const overall_json = await r_overall.json();	
		// Save response in store
		viewsOverall.set(overall_json.data.overallViews);

		/**
		* Get visits by day for the last 10 days
		**/ 	
		// Create array with content [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
		const daysToGet = [...Array(10).keys()];
		const namesOfLastXDays: string[] = [];
		// Fetching visits for each day
		const byDateViews = async (days: number) => {
			const date = new Date();
			date.setDate(today.getDate() - days);
			namesOfLastXDays.push(getNameOfDay(date.getDay()));
			// Extract only the date part from the ISO string
			const dateString = date.toISOString().slice(0, 10);
			const response = await fetch(`/.netlify/functions/getByDateViews?date=${dateString}`);
			return await response.json();
		}
	
		// Await promises fetching visits for each day
		const promises = daysToGet.map(byDateViews);
		const r_byDayViews = await Promise.all(promises);
		// Get the hits for today
		viewsToday.set(r_byDayViews[0].data.byDayViews);
		// Create an object and Map the namesOfLastXDays and the hits
		const object = namesOfLastXDays.map((day: string, i: number) => {
			switch (i) {
				case 0:
					day = "Today";
					break;
				case 1:
					day = "Yesterday";
					break
			}
			return {
				day: day,
				views: r_byDayViews[i].data.byDayViews
			}
		});
		// Save visits in store
		viewsByDate.set(object);

		/**
		* Get visits by country
		**/ 
		const r_byCountryViews = await fetch(`/.netlify/functions/getByCountryViews`);
		const byCountryViews_json = await r_byCountryViews.json();	
		viewsByCountry.set(byCountryViews_json);

		/**
		* Get visits by page
		**/ 
		const r_byPageViews = await fetch(`/.netlify/functions/getByPageViews`);
		const byPageViews_json = await r_byPageViews.json();	
		viewsByPage.set(byPageViews_json);

	} catch (err) {
		console.error(err);
	}

};
