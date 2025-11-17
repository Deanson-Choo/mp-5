'use server'

import getCollection, { ALIAS_COLLECTION } from "@/lib/db";

export async function checkDataBase({ url, alias }: { url: string, alias: string }) {
    const collection = await getCollection(ALIAS_COLLECTION);
    const existing = await collection.findOne({ alias });

    if (existing) {
        return { success: false}
    }

    await collection.insertOne({ url, alias });
    return { success: true, alias }
}