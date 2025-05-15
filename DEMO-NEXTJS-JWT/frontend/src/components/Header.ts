'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../styles/header.module.css';
import { FaUser, FaSignOutAlt, FaUsers } from 'react-icons/fa';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      const decoded = JSON.parse(atob(token.split('=')[1].split('.')[1]));
      setUsername(decoded.username);
      setRole(decoded.role);
    }
  }, []);

  const handleLogout = () => {
    document.cookie = 'token=; Max-Age=0; path=/';
    router.push('/login');
  };

  if (pathname === '/login') return null;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>MyApp</div>
      <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
        <ul>
          {role === 'ADMIN' && (
            <li><a href="/admin"><FaUsers /> Admin</a></li>
          )}
          <li><a href="/profile"><FaUser /> Profile</a></li>
          <li><button onClick={handleLogout}><FaSignOutAlt /> Logout</button></li>
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
