import type { ReactNode } from 'react';

export type PowerClipIconName =
  | 'overview'
  | 'growth'
  | 'distribution'
  | 'operations'
  | 'projects'
  | 'approvals'
  | 'files'
  | 'user'
  | 'chat'
  | 'plus'
  | 'arrow'
  | 'check'
  | 'search'
  | 'target'
  | 'workflow';

const paths: Record<PowerClipIconName, ReactNode> = {
  overview: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  growth: <><path d="m13.11 7.664 1.78 2.672" /><path d="m14.162 12.788-3.324 1.424" /><path d="M20 4 13.94 5.515" /><path d="M3 3v16a2 2 0 0 0 2 2h16" /><circle cx="12" cy="6" r="2" /><circle cx="16" cy="12" r="2" /><circle cx="9" cy="15" r="2" /></>,
  distribution: <><path d="M16 12v2a2 2 0 0 1-2 2H9a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2" /><path d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 1-1 1h-5a2 2 0 0 0-2 2v2" /></>,
  operations: <><path d="M16 12v4" /><path d="M16 6V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /><path d="M17 6a2 2 0 0 1 1.414.586l3 3A2 2 0 0 1 22 11v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 .586-1.414l3-3A2 2 0 0 1 7 6Z" /><path d="M2 14h20" /><path d="M8 12v4" /></>,
  projects: <path d="M4 5h16M4 12h16M4 19h11" />,
  approvals: <path d="m4 12 5 5L20 6" />,
  files: <><path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" /><path d="M14 2v5h5" /></>,
  user: <><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></>,
  chat: <path d="M21 12c0 4.42-4.03 8-9 8-1.06 0-2.07-.16-3-.46L3 21l1.46-4.39C3.53 15.07 3 13.6 3 12c0-4.42 4.03-8 9-8s9 3.58 9 8Z" />,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <><path d="M5 19 19 5" /><path d="M7 5h12v12" /></>,
  check: <path d="m5 13 4 4L19 7" />,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" /></>,
  workflow: <><circle cx="6" cy="6" r="2" /><circle cx="18" cy="12" r="2" /><circle cx="6" cy="18" r="2" /><path d="m8 7 8 4M8 17l8-4" /></>,
};

export function PowerClipIcon({ name, size = 20, className }: { name: PowerClipIconName; size?: number; className?: string }) {
  return <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function PowerClipMark({ className, alt = '' }: { className?: string; alt?: string }) {
  return <img className={className} src="/powerclip-mark-white.png" alt={alt} />;
}
