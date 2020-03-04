import React from 'react'

const ErrorPage = () => (
  <div className="hero is-fullheight" style={{ 
    backgroundImage: 'url(https://media.giphy.com/media/3xz2BLBOt13X9AgjEA/giphy.gif)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}>
    <div className="hero-body has-text-centered">
      <div className="container">
        <h1 className="title is-1 has-text-centered light-text-title">Error 404 - Heroes Not Found</h1>
      </div>
    </div>
  </div>
)

export default ErrorPage