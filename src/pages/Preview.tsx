import { useEffect, useState } from "react";

interface AppResult {
  title: string;
  thumbnail: string;
  rating: number;
  author: string;
  category: string;
  downloads: string;
  link: string;
}
interface SerpApiResponse {
  organic_results: {
    items: AppResult[];
  }[];
}

function Preview() {
    const [data, setData] = useState<SerpApiResponse | null>(null);

    const params = {
        engine: "google_play",
        q: "face",
        hl: "id",
    }

    useEffect(() => {
        const queryString = new URLSearchParams(params).toString()
        fetch(`/api/search?${queryString}`)
            .then((res) => res.json())
            .then((result: SerpApiResponse) => {
                console.log(result)
                setData(result)
            })
            .catch((err) => console.error("Error:", err))
    }, [])

    if (!data) return <h1>Loading...</h1>

    return (
        <div>
            <h2>{data.organic_results[0].items[0].title}</h2>
            <img src={data.organic_results[0].items[0].thumbnail} width="200" />
            <p>Developer: {data.organic_results[0].items[0].author}</p>
            <p>Rating: {data.organic_results[0].items[0].rating}</p>
            <p>Download: {data.organic_results[0].items[0].downloads}</p>
        </div>
    )
}

export default Preview