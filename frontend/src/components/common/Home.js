import React from 'react'

import Navbar from './Navbar'

class Home extends React.Component {
  
  state = {}

  render() {
    return (
      <>
      <Navbar />
      <h1>The Home Page</h1>
      </>
    )
  }
}

export default Home