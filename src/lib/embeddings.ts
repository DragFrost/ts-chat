import "server-only";

import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbedding(text: string) {
    const response = await openai.embeddings.create({
        model: process.env.EMBEDDING_MODEL ?? "text-embedding-3-small",
        input: text,
    });

    return response.data[0].embedding;
}