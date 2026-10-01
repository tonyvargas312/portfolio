import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim()

const missingVariables = [
  !supabaseUrl && 'VITE_SUPABASE_URL',
  !supabasePublishableKey && 'VITE_SUPABASE_PUBLISHABLE_KEY',
].filter(Boolean)

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    `Missing Supabase configuration: ${missingVariables.join(', ')}. ` +
    (import.meta.env.DEV
      ? 'Set these variables in .env.local and restart Vite.'
      : 'Set these variables in the deployment environment and rebuild.'),
  )
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey)
