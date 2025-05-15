'use client';

import { useState } from 'react';
import styles from '../../styles/login.module.css';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      document.cookie = `token=${data.token}; path=/`;
      const role = JSON.parse(atob(data.token.split('.')[1])).role;
      router.push(role === 'ADMIN' ? '/admin' : '/welcome');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className={styles.loginButton} onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}
