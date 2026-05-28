const API_URL = 'http://localhost:3333';

export async function apiFetch(
  path: string,
  options: RequestInit = {},
) {
  const token = localStorage.getItem('@pomodoro:token');

  const headers = new Headers(options.headers);

  headers.set('Content-Type', 'application/json');

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = response.headers.get('content-type');

  const data = contentType?.includes('application/json')
    ? await response.json()
    : null;

  if (!response.ok) {
    throw new Error(data?.error || 'Erro na requisição');
  }

  return data;
}