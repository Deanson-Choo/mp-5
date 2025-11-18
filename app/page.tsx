import UrlShortener from "@/components/UrlShortener";

export default function Home() {
    return (
        <div>
            <main className = "flex flex-col items-center justify-center">
                <div className = "bg-emerald-300 p-2 w-screen">
                    <h1 className="text-4xl font-bold">URL Shortener</h1>
                    <p>Enter your Long URL to be shorten</p>
                </div>
                <UrlShortener/>
            </main>
        </div>
    );
}
