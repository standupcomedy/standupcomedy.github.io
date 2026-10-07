Fn.api = async function (url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: 'include'
  })

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`)
  }

  return response.json()
}