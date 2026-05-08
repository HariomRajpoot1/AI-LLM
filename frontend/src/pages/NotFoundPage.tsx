import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <main className="app-shell">
      <div className="app-shell__backdrop" aria-hidden="true" />
      <section className="not-found-page">
        <p className="not-found-page__code">404</p>
        <h1 className="not-found-page__title">Page not found</h1>
        <p className="not-found-page__description">
          The page you requested does not exist.
        </p>
        <Link className="not-found-page__link" to="/">
          Return home
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage
