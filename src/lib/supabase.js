import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bbgvrhaxrgpkbpgppyzt.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJiZ3ZyaGF4cmdwa2JwZ3BweXp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzk0NzcsImV4cCI6MjA5NjkxNTQ3N30.KZCmmCax_1gfckJZvcSs2zZV9g9m-L8Bgg-k4BTMe0Q";

export const supabase = createClient(supabaseUrl, supabaseKey);