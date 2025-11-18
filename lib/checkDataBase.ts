'use server'

import getCollection, { ALIAS_COLLECTION } from "@/lib/db";

export async function checkDataBase({ url, alias }: { url: string, alias: string }) {
    function isValidUrl(url: string) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }
    if (!isValidUrl(url)) {
        return { success: false, error: "Invalid URL!!" };
    }
    /* Assert that URL is valid */

    if (alias.length === 0) {
        /* User did not key in anything */
        return { success: false, error : "Please Key In An Alias!"}
    }

    const collection = await getCollection(ALIAS_COLLECTION);
    const existing = await collection.findOne({ alias });

    /* Alias exists */
    if (existing) {
        return { success: false, error : "Alias Already Exists!"}
    }

    /* Both URL is valid and Alias is valid */
    await collection.insertOne({ url, alias });
    return { success: true, alias }
}