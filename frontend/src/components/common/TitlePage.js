import React from 'react'
import { Link } from 'react-router-dom'

import TitlePageImage from '../../assets/title-page-background.gif'

class TitlePage extends React.Component {
  
  state = {}

  render() {
    return (
      <section className="hero is-fullheight is-info" style={{ backgroundImage: `url(${TitlePageImage})`, backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className="hero-body">
          <div className="container">
            <h1 className="title is-1 has-text-centered light-text-title">Welcome to the World of Heroes!</h1>
            <br />
            <div className="container">
              <div className="columns">
                <div className="column is-one-quarter"></div>
                <div className="column is-one-quarter">
                  <Link to="/login">
                    <div className="card">
                      <div className="card-image">
                        <figure className="image is-square">
                          <img src="https://j2-solutions.com/wp-content/uploads/2018/07/FFfT_Hero.jpg" alt="Login" />
                        </figure>
                      </div>
                      <div className="card-content">
                        <h1 className="title is-2 has-text-centered light-text-title">Login</h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="column is-one-quarter">
                  <Link to="/register">
                    <div className="card">
                      <div className="card-image">
                        <figure className="image is-square">
                          <img src="https://d3dwwd0h9gl2qw.cloudfront.net/wp-content/uploads/2018/12/21122121/FNIMN-Superheroes-p06qx572.jpg" alt="Register" />
                        </figure>
                      </div>
                      <div className="card-content">
                        <h1 className="title is-2 has-text-centered light-text-title">Join Us</h1>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className="column is-one-quarter"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default TitlePage