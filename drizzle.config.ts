import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
  path: ".env",
  });

  export default defineConfig({
 out: "./drizzle",
 schema: "./src/lib/db/schema.ts",
 dialect: "postgresql",
 dbCredentials: {
   url: process.env.NEON_DATABASE_URL!,
  },
  });