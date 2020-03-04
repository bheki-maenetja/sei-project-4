import React from 'react'
import { Link } from 'react-router-dom'

const HeroCard = ({ name, image_url, id }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-full-mobile">
    <Link to={`/heroes/${id}`}>
      <div className="card hero-card">
        <div className="card-image">
          <figure className="image">
            <img src={image_url} alt={name} />
          </figure>
        </div>
        <div className="card-content">
          <h1 className="title is-5 has-text-centered light-text-title">{name}</h1>
        </div>
      </div>
    </Link>
  </div>
)

export default HeroCard