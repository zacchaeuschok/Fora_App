import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vnkvmcbpsjpmssatmifz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZua3ZtY2Jwc2pwbXNzYXRtaWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU4NzcwMTYsImV4cCI6MTk3MTQ1MzAxNn0.SNK44agz9wuNh63T8fcz_LJPWHbaEKNBefnkcpeRXWw'


export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});