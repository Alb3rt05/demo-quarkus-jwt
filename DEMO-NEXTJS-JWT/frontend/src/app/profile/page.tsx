'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import styles from '../../styles/profile.module.css';
import { api } from '../../utils/api';

export default function ProfilePage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setEmail(decodedToken.username);
    setUsername(decodedToken.username);
  }, []);

  const handleUpdate = async () => {
    await api('/user/me', 'PUT', { username, password });
    alert('Profile updated successfully');
  };

  return (
    <div className={styles.profileContainer}>
      <Header username={username} />
      <h1>Edit Profile</h1>
      <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="New Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
