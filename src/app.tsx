import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import Home from './pages'

const RouteList = [{ path: '/', component: Home, exact: true }]

const App = () => (
  <Switch>
    <Layout>
      {RouteList.map((item) => {
        const { exact = true, path, component } = item
        return (
          <Route key={path} exact={exact} path={path} component={component} />
        )
      })}
    </Layout>

    <Redirect to="/" />
  </Switch>
)

export default App
