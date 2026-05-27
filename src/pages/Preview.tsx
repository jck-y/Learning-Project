
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
    // const [data, setData] = useState(null)
    const [data, setData] = useState<SerpApiResponse | null>(null);
    // const API_KEY = "7667d67efe0280c481ede11ce66d6fcb3e87f3081e6bd79166be908245621066"
    // const ENDPOINT = "https://serpapi.com/search"

    const params = {
        engine: "google_images",
        q: "dog",
        hl: "id",
    }
    useEffect(() => {
        // const queryString = new URLSearchParams({ ...params, api_key: API_KEY }).toString()
        // const serpUrl = `${ENDPOINT}?${queryString}`
        // fetch("https://corsproxy.io/?" + encodeURIComponent(serpUrl))
        const queryString = new URLSearchParams(params).toString()
        fetch(`/api/search?${queryString}`)
            .then((res) => res.json())
            .then((result: SerpApiResponse) => {
                console.log(result)
                setData(result)
            })
            .catch((err) => console.error("Error:", err))
    }, [])

    if (!data) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            <h2>{data.images_results[1].title}</h2>
            <img src={data.images_results[1].original} width="400" />
            <p>Sumber: {data.images_results[1].source}</p>
        </div>
    )
}

export default Preview