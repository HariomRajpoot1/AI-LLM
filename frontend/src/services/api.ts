const API_URL = 'http://localhost:3000/chat'

type ChatApiResponse = {
  reply?: string
}

export async function sendMessageToAI(message: string): Promise<string> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error('The chat service is unavailable right now. Please try again.')
  }

  const data = (await response.json()) as ChatApiResponse

  if (!data.reply || typeof data.reply !== 'string') {
    throw new Error('The chat service returned an invalid response.')
  }

  return data.reply
}
