import React from "react"
import {
  BrowserRouter,
  Route,
  Switch,
} from "react-router-dom"

import Home from '../views/Home'
import NotFound from '../views/404'

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*" component={NotFound} />
    </Switch>
  </BrowserRouter>
)
