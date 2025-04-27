import { getStore } from "@netlify/blobs";

export default async function handler(req, context) {
    try {
        // We will use the referer to know which page we want to track.
        const referer = req.headers.get('referer');
        const url = new URL(referer);
        const { href } = url;

        // User agent header parsing
        const useragent = req.headers.get('user-agent') || '';
        // Client IP
        let clientIP = context.ip || 'unknown';

        /* BEGIN # Track only if NOT bot/crawler, localhost and Netlify deploy server */

        if (!(/bot|crawler|HeadlessChrome|spider|crawling/i).test(useragent) && clientIP !== '127.0.0.1' && clientIP !== '::1') {

            // Connect to our stores.
            const storeViewsOverall = getStore({ name: 'storeViewsOverall' });
            const storeViewsByDate = getStore({ name: 'storeViewsByDate' });
            const storeViewsByPage = getStore({ name: 'storeViewsByPage' });
            const storeViewsByCountry = getStore({ name: 'storeViewsByCountry' });

            const currentDate = new Date();
            // Get the ISO string and extract just the date part (YYYY-MM-DD)
            const formattedDate = currentDate.toISOString().split('T')[0];

            // Increase overall views counter
            let viewsOverall = (await storeViewsOverall.get('views')) ?? 0;
            const previousViewsOverall = parseInt(viewsOverall);
            await storeViewsOverall.set('views', (previousViewsOverall + 1).toString(), {
                metadata: { last_modified: currentDate, previous_count: previousViewsOverall },
            });

            // Increase daily views counter and limit entries to 10 days
            let viewsByDate = (await storeViewsByDate.list()) || {};
            const viewsByDayKeys = Object.keys(viewsByDate);
            // Limit the array to 10 entries
            if (viewsByDayKeys.length >= 10) {
                // Find the oldest entry by sorting keys (assuming keys are dates in YYYY-MM-DD format)
                const oldestKey = viewsByDayKeys.sort()[0];
                // Remove the oldest entry
                await storeViewsByDate.delete(oldestKey);
            }

            // Add a new daily views entry with the key formattedDate
            let viewsByDateEntry = (await storeViewsByDate.get(formattedDate)) ?? 0;
            const previousViewsByDateEntryCount = parseInt(viewsByDateEntry);
            await storeViewsByDate.set(formattedDate, (previousViewsByDateEntryCount + 1).toString(), {
                metadata: { last_modified: currentDate, previous_count: previousViewsByDateEntryCount },
            });

            // Increase path views counter
            let viewsByPageEntry = (await storeViewsByPage.get(href)) ?? 0;
            const previousViewsByPageEntryCount = parseInt(viewsByPageEntry);
            await storeViewsByPage.set(href, (previousViewsByPageEntryCount + 1).toString(), {
                metadata: { last_modified: currentDate, previous_count: previousViewsByPageEntryCount },
            });

            // Increase country views counter
            let viewsByCountryEntry = (await storeViewsByCountry.get(context.geo?.country?.name || 'unknown')) ?? 0;
            const previousViewsByCountryCount = parseInt(viewsByCountryEntry);
            await storeViewsByCountry.set(context.geo?.country?.name || 'unknown', (previousViewsByCountryCount + 1).toString(), {
                metadata: { last_modified: currentDate, previous_count: previousViewsByCountryCount },
            });
        }

        /* END */

        // Respond with a transparent image
        return new Response('R0lGODlhAQABAJAAAP8AAAAAACH5BAUQAAAALAAAAAABAAEAAAICBAEAOw==', {
            status: 200,
            headers: { 'content-type': 'image/gif' },
        });
    } catch (error) {
        console.error("Error occurred in handler:", { error, headers: req.headers });
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { 'content-type': 'application/json' },
        });
    }
};