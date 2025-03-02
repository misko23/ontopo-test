export async function fetchWrapper<T>(
  url: string,
  method: 'GET' | 'POST' = 'GET',
  body: unknown = null,
  token: string | null = null,
): Promise<T> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { token } : {}),
    },
    body: body ? JSON.stringify(body) : null,
  }
  try {
    const response = await fetch(url, options)
    if (!response.ok) {
      throw new Error('HTTP error! Status: ${response.status')
    }
    return response.json()
  } catch (error) {
    console.error('Fetch error:', error)
    throw new Error('Failed to fetch data')
  }
}
