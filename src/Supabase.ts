import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://gwwdzohqhvbkxdnhmrub.supabase.co";
const supabaseKey = import.meta.env.VITE_APP_SUPABASEKEY;
export const supabase = createClient(supabaseUrl, supabaseKey);
