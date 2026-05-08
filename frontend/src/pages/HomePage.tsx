import { Link } from 'react-router-dom'

function HomePage() {
  return (
    <section className="home-page">
      <p className="home-page__eyebrow">AI LLM Frontend</p>
      <h1 className="home-page__title">Start with a simple routed React app</h1>
      <p className="home-page__description">
        You now have multiple pages in this project, with a dedicated chat route
        and a shared application layout.
      </p>
      <div className="home-page__actions">
        <Link className="home-page__link home-page__link--primary" to="/chat">
          Open Chat
        </Link>
      </div>
    </section>
  )
}

export default HomePage
