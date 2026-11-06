import "server-only";

import { generateEmbedding } from "./embeddings";
import { supabase } from "./supabase";

type SearchResult = {
    id: string;
    chunk_index: number;
    content: string;
    metadata: Record<string, unknown>;
};

type RankedResult = SearchResult & {
    rrfScore: number;
};

export async function hybridSearch(
    query: string,
    limit: number = 5
): Promise<RankedResult[]> {

    // 1. Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // 2. Execute vector and full-text searches simultaneously
    const [vectorResponse, textResponse] = await Promise.all([

        supabase.rpc("match_document_chunks", {
            query_embedding: queryEmbedding,
            match_count: 10,
        }),

        supabase.rpc("search_document_chunks", {
            search_query: query,
            match_count: 10,
        }),

    ]);

    if (vectorResponse.error) {
        throw vectorResponse.error;
    }

    if (textResponse.error) {
        throw textResponse.error;
    }

    const vectorResults = (vectorResponse.data ?? []) as SearchResult[];
    const textResults = (textResponse.data ?? []) as SearchResult[];

    // 3. Reciprocal Rank Fusion
    const RRF_K = 60;

    const scores = new Map<string, RankedResult>();

    function addResults(results: SearchResult[]) {

        results.forEach((result, index) => {

            const existing = scores.get(result.id);

            const score = 1 / (RRF_K + index + 1);

            if (existing) {
                existing.rrfScore += score;
            } else {
                scores.set(result.id, {
                    ...result,
                    rrfScore: score,
                });
            }

        });

    }

    addResults(vectorResults);
    addResults(textResults);

    // 4. Sort by combined ranking
    return Array.from(scores.values())
        .sort((a, b) => b.rrfScore - a.rrfScore)
        .slice(0, limit);
}