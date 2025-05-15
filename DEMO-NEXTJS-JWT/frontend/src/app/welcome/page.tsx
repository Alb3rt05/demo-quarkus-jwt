'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import styles from '../../styles/welcome.module.css';

export default function WelcomePage() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setUsername(decodedToken.username);
  }, []);

  return (
    <div className={styles.welcomeContainer}>
      <Header username={username} />
      <h1>Welcome to your dashboard!</h1>
    </div>
  );
}
