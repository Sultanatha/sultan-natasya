import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

// async function checkConnection(): Promise<void> {
//     const { data, error } = await supabase.from('comments').select('*').limit(1);
    
//     if (error) {
//       console.error('Connection failed:', error.message);
//     } else {
//       console.log('Connection successful:', data);
//     }
// }

// checkConnection();