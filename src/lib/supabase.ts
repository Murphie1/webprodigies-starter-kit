import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SECOND_SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.SECOND_SUPABASE_ANON_KEY || "";
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export { supabase };
