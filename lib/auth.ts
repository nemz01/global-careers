import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Create a Supabase client for server-side auth
export function createServerClient() {
    return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    });
}

// Singleton browser client to prevent multiple GoTrueClient instances
let browserClient: SupabaseClient | null = null;

export function createBrowserClient(): SupabaseClient {
    if (typeof window === 'undefined') {
        return createClient(supabaseUrl, supabaseAnonKey);
    }

    if (!browserClient) {
        browserClient = createClient(supabaseUrl, supabaseAnonKey, {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
            },
        });
    }
    return browserClient;
}

export async function getCurrentUser() {
    const supabase = createBrowserClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) return null;
    return user;
}

export async function signIn(email: string, password: string) {
    const supabase = createBrowserClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        throw new Error(error.message);
    }

    if (data.session) {
        await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
                expires_in: data.session.expires_in,
            }),
        });
    }

    return { success: true, user: data.user };
}

export async function signOut() {
    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
    const supabase = createBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();

    const headers = new Headers(options.headers);
    if (session?.access_token) {
        headers.set('Authorization', `Bearer ${session.access_token}`);
    }

    return fetch(url, { ...options, headers });
}
