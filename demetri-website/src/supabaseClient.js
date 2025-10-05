import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'YOUR_PROJECT_URL' // Replace with your URL
const supabaseKey = 'YOUR_ANON_KEY' // Replace with your anon key

export const supabase = createClient(supabaseUrl, supabaseKey)