import { supabase } from '@/lib/client';

export const isAuthenticated = !!supabase.auth.getUser();
