import getCollection, {ALIAS_COLLECTION} from "@/lib/db";
import {redirect} from "next/navigation";

export default async function Redirect({params}: {params: Promise<{ alias: string}>;}) {
    const { alias } = await params
    const collection = await getCollection(ALIAS_COLLECTION)
    const result = await collection.findOne({alias: alias})
    console.log(result)

    if (!result) {
        redirect("/")
    }
    redirect(result.url)
}