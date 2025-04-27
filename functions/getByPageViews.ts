import { getStore } from "@netlify/blobs";
console.log("Function `getByPageViews` invoked");

export async function handler(event) {

    // Get hits by page
    try {
        const siteID = process.env.VIDU_MONITORING_SITE_ID;
        const token = process.env.VIDU_MONITORING_AUTH_TOKEN;

        if (!siteID || !token) {
            throw new Error("Missing VIDU_MONITORING_SITE_ID or VIDU_MONITORING_AUTH_TOKEN environment variables");
        }

        const storeViewsByPage = getStore({
            name: 'storeViewsByPage',
            siteID,
            token
        });

        let pageList = (await storeViewsByPage.list()) ?? [];

        // Fetch all values for the keys
        const keys = pageList.blobs.map(blob => blob.key);
        const pageViews = await Promise.all(
            keys.map(async (key) => {
                const value = await storeViewsByPage.get(key);
                return { 
                    page: key, 
                    views: parseInt(value, 10)};
            })
        );
        
        // Sort the array by views in decreasing order and limit to 10 entries
        const sortedAndLimited = pageViews
            .sort((a, b) => b.views - a.views)
            .slice(0, 10);
        return {
            statusCode: 200,
            body: JSON.stringify(sortedAndLimited)
        };
    } catch (error) {
        console.error("Error in `getByPageViews`:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
}