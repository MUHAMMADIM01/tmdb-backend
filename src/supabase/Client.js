import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://kmrszvmzubhhhngejfps.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttcnN6dm16dWJoaGhuZ2VqZnBzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2Nzg1OTQsImV4cCI6MjA3MzI1NDU5NH0._hHXWfnAVRRGXj572-qaXJQfo2dASykoiodvOtDLGzc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
