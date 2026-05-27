// api/search.ts
export default async function handler(req: any, res: any) {
    const apiKey = (globalThis as any).process?.env?.SERPAPI_KEY ?? ""
    const query = new URLSearchParams({
        ...req.query,
        api_key: apiKey,
    })
    const response = await fetch(`https://serpapi.com/search?${query}`)
    const data = await response.json()
    res.json(data)
}