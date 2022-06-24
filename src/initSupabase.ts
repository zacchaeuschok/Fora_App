import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hjbfnttwglicjlcdxbbz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhqYmZudHR3Z2xpY2psY2R4YmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU5NTU4NzIsImV4cCI6MTk3MTUzMTg3Mn0.VQSPZ7U2FH1zIj49MFEFyMCUU6z0-qyqeLS9ZRpx4uI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});