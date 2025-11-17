import UrlShortener from "@/components/UrlShortener";

export default function Home() {
    return (
        <div>
            <main className="text-center">
                <h1 className="text-4xl font-bold">URL Shortener</h1>
                <p>Enter your Long URL to be shorten</p>
                <UrlShortener/>
            </main>
        </div>
    );
}
