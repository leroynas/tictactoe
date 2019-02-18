/* global API_URL */

async function handleResponse(response) {
  if (response.status >= 400) {
    const { message } = await response.json();

    throw new Error(message);
  }

  return response;
}

export function post(url, data) {
  return fetch(`${API_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .then(response => response.json());
}
