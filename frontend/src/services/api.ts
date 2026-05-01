const apiBaseUrl = import.meta.env.VITE_API_URL
const API_URL = `${apiBaseUrl}/chat`

type ChatApiResponse = {
  reply?: string
  error?: string
}

export async function sendMessageToAI(message: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  const data = (await response.json()) as ChatApiResponse

  if (!response.ok) {
    throw new Error(
      data.error ??
        'The chat service is unavailable right now. Please try again.',
    )
  }

  if (!data.reply || typeof data.reply !== 'string') {
    throw new Error('The chat service returned an invalid response.')
  }

  return data.reply
}
