import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ynlxpgkntxuahxmyjljy.supabase.co' // Replace with your URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlubHhwZ2tudHh1YWh4bXlqbGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk2MTU3MDUsImV4cCI6MjA3NTE5MTcwNX0.Y2jD1cMhB7RlwqtDf7i6IGXfvRUARY4VCt_bUmCO2UU' // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey)