import { useEffect, useState } from "react";

// ✏️ STEP 1: Ganti nama interface & field sesuai hasil console.log
// Sebelum  → interface ImageResult { title, original, source }
// Sesudah  ↓
interface GameResult {
  title: string;
  thumbnail: string;
  rating: number;
  link: string;
}

// ✏️ STEP 2: Ganti nama array sesuai hasil console.log
// Sebelum  → images_results: ImageResult[]
// Sesudah  ↓
interface SerpApiResponse {
  organic_results: GameResult[];
}

function Preview() {
    const [data, setData] = useState<SerpApiResponse | null>(null);

    const params = {
        engine: "google_play_games", // ✏️ STEP 3: Ganti engine
        q: "minecraft",              // ✏️ STEP 4: Ganti keyword
        hl: "id",
    }

    useEffect(() => {
        const queryString = new URLSearchParams(params).toString()
        fetch(`/api/search?${queryString}`)
            .then((res) => res.json())
            .then((result: SerpApiResponse) => {
                console.log(result) // lihat struktur data disini dulu
                setData(result)
            })
            .catch((err) => console.error("Error:", err))
    }, [])

    if (!data) return <h1>Loading...</h1>

    return (
        // ✏️ STEP 5: Ganti tampilan sesuai field yang tersedia
        // Sebelum  → data.images_results[0].original, .title, .source
        // Sesudah  ↓
        <div>
            <h2>{data.organic_results[0].title}</h2>
            <img src={data.organic_results[0].thumbnail} width="200" />
            <p>Rating: {data.organic_results[0].rating}</p>
            <a href={data.organic_results[0].link}>Buka di Play Store</a>
        </div>
    )
}

export default Preview