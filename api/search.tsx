declare const process: { env: { [key: string]: string } }
export default async function handler(req: any, res: any) {
    const query = new URLSearchParams({
        ...req.query,
        api_key: process.env.SERPAPI_KEY as string,
    })
    const response = await fetch(`https://serpapi.com/search?${query}`)
    const data = await response.json()
    res.json(data)
}