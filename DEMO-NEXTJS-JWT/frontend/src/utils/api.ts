export const api = async (url: string, method = 'GET', body?: any) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];
  const res = await fetch(`http://localhost:8080${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return res.json();
};
