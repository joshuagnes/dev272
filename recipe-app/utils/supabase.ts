
import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
    "https://wacpgrwweosevcpplxlw.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndhY3Bncnd3ZW9zZXZjcHBseGx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwMDgwNjksImV4cCI6MjA2MjU4NDA2OX0.CxzjAMDi25o0qUszDsXfBLGNJPzIlQiXyHWRRK0s_hE",

    {
        auth: {
            storage: AsyncStorage,
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: false,
        },
    })
