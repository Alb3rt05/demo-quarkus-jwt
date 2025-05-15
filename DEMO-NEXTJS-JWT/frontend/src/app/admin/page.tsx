'use client';

import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import styles from '../../styles/admin.module.css';
import { api } from '../../utils/api';

export default function AdminPage() {
  const [username, setUsername] = useState('');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'USER' });

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    setUsername(decodedToken.username);

    const fetchUsers = async () => {
      const data = await api('/user');
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleRegister = async () => {
    await api('/user', 'POST', newUser);
    alert('User registered successfully');
    setNewUser({ username: '', password: '', role: 'USER' });
    const data = await api('/user');
    setUsers(data);
  };

  return (
    <div className={styles.adminContainer}>
      <Header username={username} />
      <h1>Admin Dashboard</h1>
      <table className={styles.userTable}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td><button>Edit</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.registerContainer}>
        <h2>Register New User</h2>
        <input type="text" placeholder="Username" value={newUser.username} onChange={e => setNewUser({ ...newUser, username: e.target.value })} />
       password" placeholder="Password" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
        <select value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}
