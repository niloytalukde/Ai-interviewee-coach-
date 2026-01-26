import Perplexity from "@perplexity-ai/perplexity_ai";

const client = new Perplexity({
  apiKey: process.env.PERPLEXITY_API_KEY!,
});

const cleanJson = (text: string): string => {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
};

export const aiAnalyzer = async (prompt: string) => {
  try {
    const completion = await client.chat.completions.create({
      model: "sonar",
      messages: [
        {
          role: "system",
          content:
            "You are an ATS system. Respond with ONLY valid JSON. Do not use markdown.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
    });

    const message = completion.choices[0].message.content;

    // 🧠 Normalize content to string
    let raw = "";

    if (typeof message === "string") {
      raw = message;
    } else if (Array.isArray(message)) {
      raw = message.map((m: any) => m.text || "").join("");
    } else {
      throw new Error("Empty AI response");
    }

    const cleaned = cleanJson(raw);

    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Perplexity AI Analyzer Error:", error);
    throw new Error("AI returned invalid JSON");
  }
};
