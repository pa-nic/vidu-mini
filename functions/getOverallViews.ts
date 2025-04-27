import { getStore } from "@netlify/blobs";
console.log("Function `getOverallViews` invoked");

export async function handler() {

    // Get overall hits
    try {
        const siteID = process.env.VIDU_MONITORING_SITE_ID;
        const token = process.env.VIDU_MONITORING_AUTH_TOKEN;

        if (!siteID || !token) {
            throw new Error("Missing VIDU_MONITORING_SITE_ID or VIDU_MONITORING_AUTH_TOKEN environment variables");
        }

        const storeViewsOverall = getStore({
            name: 'storeViewsOverall',
            siteID,
            token
        });
        
        let viewsOverall = (await storeViewsOverall.get('views')) ?? 0;
        return {
            statusCode: 200,
            body: JSON.stringify({
                data: {
                    overallViews: parseInt(viewsOverall, 10)
                }
            })
        };
    } catch (error) {
        console.error("Error in `getOverallViews`:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
}