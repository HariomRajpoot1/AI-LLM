import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <main className="app-shell">
      <div className="app-shell__backdrop" aria-hidden="true" />
      <div className="app-shell__content">
        <header className="app-shell__header">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `app-shell__nav-link${isActive ? ' app-shell__nav-link--active' : ''}`
            }
          >
            Chat
          </NavLink>
        </header>

        <Outlet />
      </div>
    </main>
  )
}

export default App
