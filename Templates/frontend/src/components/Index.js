import React, { createContext } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import 'bulma'
import '../styles/main.css'

// Component Imports
import UserAuth from './auth/UserAuth'
import MyProfile from './users/MyProfile'
import Home from './common/Home'
import TitlePage from './common/TitlePage'

import HeroIndex from './heroes/HeroIndex'
import HeroShow from './heroes/HeroShow'

import HeroCompare from './heroCompare/HeroCompare'
import HeroBattle from './heroBattleGame/HeroBattle'

import MarketPlace from './marketplace/MarketPlace'

import ErrorPage from './common/ErrorPage'

const Index = () => (
  <BrowserRouter>
    <>
    <Switch>
      <Route exact path="/" component={TitlePage} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={UserAuth} />
      <Route path="/register" component={UserAuth} />
      <Route path="/my-profile" component={MyProfile} />
      <Route path="/heroes/:id" component={HeroShow} />
      <Route path="/heroes" component={HeroIndex} />
      <Route path="/hero-compare" component={HeroCompare} />
      <Route path="/hero-battle" component={HeroBattle} />
      <Route path="/marketplace" component={MarketPlace} />
      <Route path="/*" component={ErrorPage} />
    </Switch>
    </>
  </BrowserRouter>
)

export default Index