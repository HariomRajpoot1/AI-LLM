import { useState } from 'react'
import type { FormEvent, KeyboardEvent } from 'react'
import { sendMessageToAI } from '../services/api'
import './Chat.css'

type ChatRole = 'user' | 'assistant'

type ChatMessage = {
  id: string
  role: ChatRole
  text: string
}

const createMessage = (role: ChatRole, text: string): ChatMessage => ({
  id: `${role}-${Date.now().toString()}`,
  role,
  text,
})

function Chat() {
  const [inputValue, setInputValue] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([
    createMessage(
      'assistant',
      'Hello! Ask me anything and I will help you through this chat.',
    ),
  ])
  const [isSending, setIsSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event?: FormEvent<HTMLFormElement>) => {
    event?.preventDefault()

    const trimmedMessage = inputValue.trim()
    if (!trimmedMessage || isSending) {
      return
    }

    const userMessage = createMessage('user', trimmedMessage)

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setInputValue('')
    setErrorMessage('')
    setIsSending(true)

    try {
      const reply = await sendMessageToAI(trimmedMessage)

      setMessages((currentMessages) => [
        ...currentMessages,
        createMessage('assistant', reply),
      ])
    } catch (error) {
      const fallbackMessage =
        error instanceof Error
          ? error.message
          : 'Something went wrong while contacting the assistant.'

      setErrorMessage(fallbackMessage)
    } finally {
      setIsSending(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      void handleSubmit()
    }
  }

  return (
    <section className="chat" aria-label="AI chat interface">
      <header className="chat__header">
        <div>
          <p className="chat__eyebrow">AI Assistant</p>
          <h1 className="chat__title">Clean frontend chat experience</h1>
        </div>
        <p className="chat__subtitle">
          Built with separated styles, resilient state handling, and accessible
          interaction patterns.
        </p>
      </header>

      <div className="chat__panel">
        <div className="chat__messages" aria-live="polite" aria-atomic="false">
          {messages.map((message) => (
            <article
              key={message.id}
              className={`chat__message chat__message--${message.role}`}
            >
              <span className="chat__message-role">
                {message.role === 'user' ? 'You' : 'Assistant'}
              </span>
              <p>{message.text}</p>
            </article>
          ))}

          {isSending ? (
            <div className="chat__status" role="status">
              Assistant is typing...
            </div>
          ) : null}
        </div>

        <form className="chat__composer" onSubmit={handleSubmit}>
          <label className="chat__label" htmlFor="chat-message">
            Message
          </label>
          <div className="chat__controls">
            <input
              id="chat-message"
              className="chat__input"
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              autoComplete="off"
              disabled={isSending}
            />
            <button
              className="chat__button"
              type="submit"
              disabled={isSending || !inputValue.trim()}
            >
              {isSending ? 'Sending...' : 'Send'}
            </button>
          </div>

          {errorMessage ? (
            <p className="chat__error" role="alert">
              {errorMessage}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  )
}

export default Chat
