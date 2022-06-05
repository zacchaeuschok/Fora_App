import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'
import { REACT_NATIVE_SUPABASE_URL, REACT_NATIVE_SUPABASE_ANON_KEY} from "@env"


const supabaseUrl = 'https://zckfzigvesrqdzbqgxju.supabase.co' || ''
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpja2Z6aWd2ZXNycWR6YnFneGp1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTI1MDU2MjgsImV4cCI6MTk2ODA4MTYyOH0.fNYJ8N9fhM7AphyrTc4B9pfpAqgmL8pU-G8ml3mXuMY' || ''


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});