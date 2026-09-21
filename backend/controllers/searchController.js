import axios from "axios";

const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";

export async function enhanceSearch(req, res) {
    const query = String(req.query.q || "").trim();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!query) return res.json({ queries: [] });
    if (!apiKey) return res.status(503).json({ error: "GEMINI_API_KEY is not configured" });

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${encodeURIComponent(apiKey)}`,
            {
                contents: [{
                    parts: [{
                        text: `Return JSON only in the form {"queries":["..."]}. Give up to 4 concise alternate movie or TV title searches for: ${query}. Include the original title and do not include commentary.`
                    }]
                }],
                generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
            },
            { timeout: 10000 }
        );

        const text = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
        const parsed = JSON.parse(text.replace(/^```json\s*|\s*```$/g, ""));
        const queries = Array.isArray(parsed.queries)
            ? parsed.queries.filter(item => typeof item === "string").map(item => item.trim()).filter(Boolean).slice(0, 4)
            : [];
        return res.json({ queries: [...new Set([query, ...queries])] });
    } catch (error) {
        console.error("Gemini search enhancement failed:", error.message);
        return res.status(502).json({ error: "Gemini search enhancement failed" });
    }
}