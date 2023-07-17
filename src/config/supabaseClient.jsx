

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ruliqphxnomzpmsluchd.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bGlxcGh4bm9tenBtc2x1Y2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk1NjYzNzEsImV4cCI6MjAwNTE0MjM3MX0.-cVm5Yrq-RFdxeTcHBek1JmENf0s0qKC9emBJucWMUg'
//const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
