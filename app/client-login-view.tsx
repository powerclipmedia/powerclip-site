'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { signIn } from './auth-client';
import { PowerClipMark } from './powerclip-icons';

export function ClientLoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setLoading(true);
    try { await signIn(email, password); window.location.href = '/client-dashboard'; }
    catch (err) { setError(err instanceof Error ? err.message : 'Unable to sign in.'); setLoading(false); }
  }
  return <main className="login-page login-shell"><div className="login-beams" aria-hidden="true" /><header className="login-header"><Link href="/" className="login-brand"><PowerClipMark /><b>PowerClip</b></Link><Link href="/">← Back to site</Link></header><section className="login-card login-card-reference"><div className="login-card-brand"><PowerClipMark /><b>PowerClip</b></div><h1>Client Login</h1><p>Sign in to your workspace to track performance, files, and approvals.</p><form onSubmit={submit}><label>Email<input type="email" placeholder="you@company.com" value={email} onChange={event => setEmail(event.target.value)} required /></label><label><span>Password <a href="#forgot">Forgot password?</a></span><input type="password" placeholder="••••••••" value={password} onChange={event => setPassword(event.target.value)} required /></label><label className="remember-row"><input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} /> Remember me</label><button className="new-button new-button-primary" disabled={loading}>{loading ? 'Signing in…' : 'Log In'}</button>{error && <small className="login-error" role="alert">{error}</small>}</form><div className="login-help">No account yet? <a href="mailto:hello@powerclip.app">Contact your PowerClip team</a></div></section><div className="login-footnote">Interactive workspace · Example data</div></main>;
}
