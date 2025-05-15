import '../styles/globals.css';

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header>
          <nav>
            <ul className="menu" style={{ display: 'flex', gap: '1rem' }}>
              <li><a href="/welcome">Welcome</a></li>
              <li><a href="/admin">Admin</a></li>
              <li><a href="/profile">Profile</a></li>
            </ul>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
