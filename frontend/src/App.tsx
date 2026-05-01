import Chat from './components/Chat'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <div className="app-shell__backdrop" aria-hidden="true" />
      <Chat />
    </main>
  )
}

export default App
