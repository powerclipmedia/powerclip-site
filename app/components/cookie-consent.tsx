'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'powerclip-cookie-consent-v1';

type Choice = 'accepted' | 'rejected';

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [settingsVisible, setSettingsVisible] = useState(false);

  useEffect(() => {
    setVisible(!window.localStorage.getItem(STORAGE_KEY));
  }, []);

  function save(choice: Choice) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ choice, updatedAt: new Date().toISOString() }));
    window.dispatchEvent(new CustomEvent('powerclip:consent', { detail: { optional: choice === 'accepted' } }));
    setVisible(false);
    setSettingsVisible(true);
  }

  return (
    <>
      {visible && (
        <section className="cookie-banner" role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-description">
          <div>
            <h2 id="cookie-title">Your privacy, your call.</h2>
            <p id="cookie-description">
              PowerClip uses necessary cookies to keep the site working. Optional analytics or marketing cookies stay off unless you choose to allow them.{' '}
              <a href="/privacy-policy">Read the privacy and cookie notice</a>.
            </p>
          </div>
          <div className="cookie-actions">
            <button className="cookie-button" onClick={() => save('rejected')}>Reject optional</button>
            <button className="cookie-button cookie-button-primary" onClick={() => save('accepted')}>Accept optional</button>
          </div>
        </section>
      )}
      {settingsVisible && (
        <button className="cookie-settings" onClick={() => { setSettingsVisible(false); setVisible(true); }}>
          Cookie settings
        </button>
      )}
    </>
  );
}
