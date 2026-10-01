export type PowerClipSession = {
  access_token: string;
  refresh_token: string;
  user: { email?: string };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
const sessionKey = 'powerclip.auth.session';

export async function signIn(email: string, password: string) {
  if (!supabaseUrl || !supabaseKey) throw new Error('Authentication is not configured.');
  const response = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: { apikey: supabaseKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error_description || result.msg || 'Unable to sign in.');
  window.localStorage.setItem(sessionKey, JSON.stringify(result));
  return result as PowerClipSession;
}

export function getSession(): PowerClipSession | null {
  try {
    const stored = window.localStorage.getItem(sessionKey);
    return stored ? JSON.parse(stored) as PowerClipSession : null;
  } catch {
    return null;
  }
}

export function signOut() {
  window.localStorage.removeItem(sessionKey);
}
