import { createClient, type SupabaseClient, type SupabaseClientOptions } from '@supabase/supabase-js';

import type { Database } from './types';

type ClientOptions = SupabaseClientOptions<'public'>;

const browserEnv = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL,
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

const serverEnv = {
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

let browserClient: SupabaseClient<Database> | null = null;

const assertEnv = (value: string | undefined, label: string) => {
  if (!value) {
    throw new Error(`Missing Supabase environment variable: ${label}`);
  }
  return value;
};

export type SupabaseBrowserClient = SupabaseClient<Database>;

export const getSupabaseBrowserClient = (options?: ClientOptions): SupabaseBrowserClient => {
  if (browserClient) {
    return browserClient;
  }

  const supabaseUrl = assertEnv(browserEnv.url, 'NEXT_PUBLIC_SUPABASE_URL');
  const supabaseAnonKey = assertEnv(browserEnv.anonKey, 'NEXT_PUBLIC_SUPABASE_ANON_KEY');

  browserClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      detectSessionInUrl: true,
      persistSession: true,
    },
    ...options,
  });

  return browserClient;
};

export const createSupabaseServiceRoleClient = (options?: ClientOptions) => {
  const supabaseUrl = assertEnv(browserEnv.url, 'NEXT_PUBLIC_SUPABASE_URL');
  const serviceRoleKey = assertEnv(serverEnv.serviceRoleKey, 'SUPABASE_SERVICE_ROLE_KEY');

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    ...options,
  });
};
