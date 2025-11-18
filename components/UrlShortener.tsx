"use client"

import {useState} from 'react'
import {checkDataBase} from "@/lib/checkDataBase";
import Link from "next/link";

export default function UrlShortener() {

    const [url, setUrl] = useState('')
    const [alias, setAlias] = useState('')
    const [message, setMessage] = useState('')
    const [newUrl, setNewUrl] = useState('')

    let pathName;

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
        pathName = window.location.href
        setMessage('')
        if (isValidUrl(url)) {
            const res = await checkDataBase({url, alias})
            if (res.success) {
                /* URL is valid and Alias exist */
                setMessage("Success!")
                setNewUrl(`${pathName}${alias}`)
            }
            else {
                if (res.error) {
                    setMessage(res.error)
                }
            }
        }
        else {
            setMessage("Invalid URL!!")
        }
    }

    return (
        <div className = "w-1/2 text-center">
            <form className="p-6 space-y-6 bg" onSubmit = {handleSubmit}>
                <div>
                    <label htmlFor="url" className="block font-bold">Enter Your URL:</label>
                    <input
                        id="url"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="border border-black-300 w-1/2 bg-white rounded-md"
                    />
                </div>
                <div>
                    <p className = "font-bold">Please Provide Your Alias: </p>
                    <div className="flex flex-row justify-center">
                        <p>{pathName}</p>
                        <label htmlFor="alias"></label>
                        <input
                            id="alias"
                            type="text"
                            value={alias}
                            onChange={(e) => setAlias(e.target.value)}
                            className="ml-1 border border-black-300 bg-white rounded-md"
                        />
                    </div>
                </div>
                <div>
                    <button type = "submit" className="px-6 py-3 bg-blue-500 text-white font-semibold cursor-pointer rounded-md">Shorten</button>
                </div>
            </form>
            <div>
                <p className="text-2xl font-bold mb-2 text-red-600">{message}</p>
            </div>
            {message === "Success!" &&
            <div className = "border border-gray-400 rounded-md p-1">
                <p className = "p-1">Here is your shortened URL: </p>
                <Link href={newUrl} target = "_blank" className = "text-blue-800 font-bold p-1">
                    {newUrl}
                </Link>
            </div>
            }
        </div>
    )
}