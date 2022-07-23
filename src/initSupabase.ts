import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://vnkvmcbpsjpmssatmifz.supabase.co'
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZua3ZtY2Jwc2pwbXNzYXRtaWZ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU4NzcwMTYsImV4cCI6MTk3MTQ1MzAxNn0.SNK44agz9wuNh63T8fcz_LJPWHbaEKNBefnkcpeRXWw'

//export const supabaseUrl = 'https://nrrgwefiktcodijmgght.supabase.co'
//export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ycmd3ZWZpa3Rjb2Rpam1nZ2h0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTU3ODA3ODYsImV4cCI6MTk3MTM1Njc4Nn0.N9YbRJc3hLEres_7ISIX2qBGlwcPCY3j_sq9oEKouTM'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: AsyncStorage as any,
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: false,
});