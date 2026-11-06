import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const ratelimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, "1 m"),
    prefix: "chat-rate-limit",
});

export async function checkRateLimit(request: Request) {
    const forwardedFor = request.headers.get("x-forwarded-for");

    const ip =
        forwardedFor?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip") ||
        "unknown";

    const result = await ratelimit.limit(ip);

    return result;
}