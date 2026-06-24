import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://uqckayibcmwjednqkznj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxY2theWliY213amVkbnFrem5qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxOTQyNjgsImV4cCI6MjA5Nzc3MDI2OH0.qSuytHw2hnRsyjElHdqDCy-JhG8ZNKSzC29v5grBSHQ";
export const supabase = createClient(supabaseUrl, supabaseKey);
