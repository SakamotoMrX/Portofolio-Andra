// The site assistant: one short, rule-bound answer per question, on the cheapest Gemini model.
import data from "@/json/data.json";
import { tools } from "@/data/site.mjs";
import { CONTACT_REPLY, LIMITS, REFUSAL, blocked, buildSystem, clean, mentionsContact, wantsContact } from "@/lib/assistant.mjs";

export const runtime = "nodejs";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
const SYSTEM = buildSystem(data.Projects.filter((p) => p.show), tools);

// shortcut: counts live in this instance's memory, so they reset on a cold start and are not shared between
// serverless instances; move to Vercel KV or Upstash if abuse shows up in the Gemini usage page.
const hits = new Map();
function limited(ip) {
	const now = Date.now();
	const h = hits.get(ip);
	if (!h || now > h.reset) {
		if (hits.size > 5000) hits.clear();
		hits.set(ip, { n: 1, reset: now + LIMITS.windowMs });
		return false;
	}
	return ++h.n > LIMITS.perWindow;
}

const say = (body, status = 200) => Response.json(body, { status, headers: { "cache-control": "no-store" } });

export async function POST(req) {
	const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
	if (limited(ip)) return say({ error: "slow" }, 429);

	let body;
	try {
		body = await req.json();
	} catch {
		return say({ error: "bad" }, 400);
	}
	const turns = clean(body?.messages);
	if (!turns) return say({ error: "bad" }, 400);

	// asking how to reach him and off-limits questions are both answered here and cost nothing
	const question = turns[turns.length - 1].text;
	if (blocked(question)) return say({ text: REFUSAL });
	if (wantsContact(question)) return say({ text: CONTACT_REPLY, contact: true });

	const key = process.env.GEMINI_API_KEY;
	if (!key) return say({ error: "off" }, 503);

	try {
		const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`, {
			method: "POST",
			headers: { "content-type": "application/json", "x-goog-api-key": key },
			signal: AbortSignal.timeout(15000),
			body: JSON.stringify({
				systemInstruction: { parts: [{ text: SYSTEM }] },
				contents: turns.map((t) => ({ role: t.role, parts: [{ text: t.text }] })),
				generationConfig: { maxOutputTokens: LIMITS.maxOutput, temperature: 0.2 },
			}),
		});
		if (!r.ok) {
			console.error("assistant upstream", r.status);
			return say({ error: "upstream" }, 502);
		}
		const j = await r.json();
		const text = (j.candidates?.[0]?.content?.parts || [])
			.map((p) => p.text || "")
			.join("")
			.trim();
		if (!text || text.includes("OFFTOPIC")) return say({ text: REFUSAL });
		return say({ text: text.slice(0, LIMITS.maxReply), contact: mentionsContact(text) });
	} catch {
		return say({ error: "upstream" }, 502);
	}
}
