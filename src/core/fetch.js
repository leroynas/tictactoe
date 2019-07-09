/* global API_URL */

/**
 * handleResponse is used for handing API errors.
 *
 * @param {*} response API response object
 * @returns object
 */
async function handleResponse(response) {
  if (response.status >= 400) {
    const { message } = await response.json();

    throw new Error(message);
  }

  return response;
}

/**
 * post is used for sending data to API and handing response.
 *
 * @export
 * @param {*} url api url
 * @param {*} data post data
 * @returns object
 */
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
