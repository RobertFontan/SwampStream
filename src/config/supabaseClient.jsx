

import { createClient } from '@supabase/supabase-js'
// supabase pw: w9Kxb2FevOtDMDTF
const supabaseUrl = 'https://vcezbknkwuhsoncsfcsu.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjZXpia25rd3Voc29uY3NmY3N1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk2MjczMDQsImV4cCI6MjAwNTIwMzMwNH0.Pmx1etex0gIbM-v0v6Oxtfu0okp0xEF-0homhTaC8w0'
//const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
