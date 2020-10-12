import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd'

import Home from './pages'
import Login from './pages/login'
import { getRoutePath } from './utils/utils'

const RouteList = [
  { path: getRoutePath('/home'), component: Home, exact: true },
  { path: getRoutePath('/login'), component: Login, exact: true },
  { path: getRoutePath('/'), component: () => <h2>404 Not Found</h2>, exact: false },
]

const App = () => (
  <Layout>
    <Switch>
      {RouteList.map((item) => {
        const { exact = true, path, component } = item
        return <Route key={path} exact={exact} path={path} component={component} />
      })}
      <Redirect to="/admin/login" />
    </Switch>
  </Layout>
)

export default App
