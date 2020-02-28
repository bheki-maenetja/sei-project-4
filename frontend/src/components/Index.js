import React, { createContext } from 'react'
import axios from 'axios'

class Index extends React.Component {

  state = { data: [] }

  async componentDidMount() {
    try {
      const res = await axios.get('/api/cards/')
      console.log(res.data)
    } catch(err) {
      console.log(err)
    }
  }

  render() {
    return (
      <h1>This is the index</h1>
    )
  }
}

export default Index