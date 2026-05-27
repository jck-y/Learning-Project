import { useEffect, useState } from "react";

interface ImageResult {
  title: string;
  original: string;
  source: string;
}
interface SerpApiResponse {
  images_results: ImageResult[];
}

function Preview() {
    const [data, setData] = useState<SerpApiResponse | null>(null);
    const [error, setError] = useState<string | null>(null) // ✅ 1. tambah error state
    const API_KEY = "7667d67efe0280c481ede11ce66d6fcb3e87f3081e6bd79166be908245621066"
    const ENDPOINT = "https://serpapi.com/search"

    const params = {
        engine: "google_images",
        q: "dog",
        hl: "id",
    }

    useEffect(() => {
        const queryString = new URLSearchParams({ ...params, api_key: API_KEY }).toString()
        const serpUrl = `${ENDPOINT}?${queryString}`
        fetch("https://corsproxy.io/?" + encodeURIComponent(serpUrl))
            .then((res) => res.json())
            .then((result: SerpApiResponse) => {
                console.log(result)
                setData(result)
            })
            .catch((err) => setError(err.message)) // ✅ 2. tangkap error
    }, [])

    if (error) return <h1>Error: {error}</h1>  // ✅ 3. tampilkan error
    if (!data) return <h1>Loading...</h1>

    return (
        <div>
            <h2>{data.images_results[0].title}</h2>    {/* ✅ 4. ganti [1] → [0] */}
            <img src={data.images_results[0].original} width="400" />
            <p>Sumber: {data.images_results[0].source}</p>
        </div>
    )
}

export default Preview