import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import Home from './pages'

const RouteList = [{ path: '/admin', component: Home, exact: true }]

const App = () => (
  <Layout>
    <Switch>
      {RouteList.map((item) => {
        const { exact = true, path, component } = item
        return <Route key={path} exact={exact} path={path} component={component} />
      })}
      <Redirect to="/admin" />
    </Switch>
  </Layout>
)

export default App
