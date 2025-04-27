import { getStore } from "@netlify/blobs";
console.log("Function `getOverallViews` invoked");

export async function handler() {

    // Get hits by country
    try {
        const siteID = process.env.VIDU_MONITORING_SITE_ID;
        const token = process.env.VIDU_MONITORING_AUTH_TOKEN;

        if (!siteID || !token) {
            throw new Error("Missing VIDU_MONITORING_SITE_ID or VIDU_MONITORING_AUTH_TOKEN environment variables");
        }

        const storeViewsByCountry = getStore({
            name: 'storeViewsByCountry',
            siteID,
            token
        });
        
        // Retrieve the list of keys from the blob store
        const byCountryList = (await storeViewsByCountry.list()) ?? [];

        // Fetch all values for the keys
        const keys = byCountryList.blobs.map(blob => blob.key);
        const byCountryViews = await Promise.all(
            keys.map(async (key) => {
                const value = await storeViewsByCountry.get(key);
                console.log("key", key, "value", value);
                return { 
                    country: key, 
                    views: parseInt(value, 10)};
            })
        );
        
        // Sort the array by views in decreasing order and limit to 10 entries
        const sortedAndLimited = byCountryViews
            .sort((a, b) => b.views - a.views)
            .slice(0, 10);

        return {
            statusCode: 200,
            body: JSON.stringify(sortedAndLimited)
        };
    } catch (error) {
        console.error("Error in `getOverallViews`:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
}