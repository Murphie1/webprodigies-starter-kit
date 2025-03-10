import { Ratelimit } from "@upstash/ratelimit";
import { redis } from "./config";

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
});
