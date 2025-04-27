import { getStore } from "@netlify/blobs";
console.log("Function `getByDateViews` invoked");

export async function handler(event) {

    // Get hits by date
    try {
        const siteID = process.env.VIDU_MONITORING_SITE_ID;
        const token = process.env.VIDU_MONITORING_AUTH_TOKEN;

        if (!siteID || !token) {
            throw new Error("Missing VIDU_MONITORING_SITE_ID or VIDU_MONITORING_AUTH_TOKEN environment variables");
        }

        const storeViewsByDate = getStore({
            name: 'storeViewsByDate',
            siteID,
            token
        });

        let byDateViews = (await storeViewsByDate.get(event.queryStringParameters.date)) ?? 0;
        return {
            statusCode: 200,
            body: JSON.stringify({
                data: {
                    byDayViews: parseInt(byDateViews, 10)
                }
            })
        };
    } catch (error) {
        console.error("Error in `getByDateViews`:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error" })
        };
    }
}