"use client"

import {useState} from 'react'
import {checkDataBase} from "@/lib/checkDataBase";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function UrlShortener() {

    const [url, setUrl] = useState('')
    const [alias, setAlias] = useState('')
    const [message, setMessage] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const pathName = usePathname()

    function isValidUrl(url: string) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        /* Check the URL */
        e.preventDefault()
        setMessage('')
        if (isValidUrl(url)) {
            const res = await checkDataBase({url, alias})
            if (res.success) {
                /* URL is valid and Alias exist */
                setMessage("Success!")
                setNewUrl(`${pathName}/${alias}`)
            }
            else {
                setMessage("Alias already exist!")
            }
        }
        else {
            setMessage("Invalid URL!")
        }
    }

    return (
        <div>
            <form className="p-6 space-y-6" onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor="url" className="block">Enter your url:</label>
                    <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border border-black-300"
                    />
                </div>
                <div>
                    <label htmlFor="alias" className="block">Enter your alias:</label>
                    <input
                        id="alias"
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        className="border border-black-300"
                    />
                </div>
                <div>
                    <button type = "submit" className="px-6 py-3 bg-blue-500 text-white font-semibold cursor-pointer">Shorten</button>
                </div>
            </form>
            <div>
                <p className="font-bold text-red-600">{message}</p>
            </div>
            <div>
                <p className = "font-bold">Here is your shortened URL: </p>
                <Link href={newUrl}  className = "text-blue-400">
                    {newUrl}
                </Link>
            </div>
        </div>
    )
}