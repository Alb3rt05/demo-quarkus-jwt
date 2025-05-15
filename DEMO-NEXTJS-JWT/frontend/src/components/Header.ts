'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/header.module.css';

export default function Header({ username }: { username: string }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    router.push('/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyApp</div>
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <ul>
          <li><a href="/welcome">Welcome</a></li>
          <li><a href="/admin">Admin</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><button onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>
      <div className={styles.menuToggle} onClick={() => setMenuOpen(!menuOpen)}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
    </header>
  );
}
