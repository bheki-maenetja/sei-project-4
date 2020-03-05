import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Authorize from '../../lib/authorize'

class Navbar extends React.Component {
  
  state = { navbarOpen: false }

  toggleNavbar = () => {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  logout = () => {
    Authorize.logout()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ navbarOpen: false })
    }
  }

  render() {
    const { navbarOpen } = this.state
    return (
      <>
      <nav className="navbar is-dark">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/home">Home</Link>
            <a className={`navbar-burger ${navbarOpen ? 'is-active' : ''}`} onClick={this.toggleNavbar}>
              <span></span>
              <span></span>
              <span></span>
            </a>
          </div>
          <div className={`navbar-menu ${navbarOpen ? 'is-active' : ''}`}>
            <div className="navbar-end">
              <Link className="navbar-item" to="/heroes">Heroes</Link>
              <Link className="navbar-item" to="/hero-compare">Hero vs Hero</Link>
              <Link className="navbar-item" to="/hero-battle">Superhero Battle</Link>
              <Link className="navbar-item" to="/marketplace">Marketplace</Link>
              <Link className="navbar-item" to="/my-profile">My Profile</Link>
              <Link className="navbar-item" to="/" onClick={this.logout}>Logout</Link>
            </div>
          </div>
        </div>
      </nav>
      </>
    )
  }
}

export default withRouter(Navbar)