import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Layout } from 'antd'
import RouterApp from './routes'
import AdminHeader from './components/Layout/Header'
import Menus from './components/Layout/Menus'

const App = () => {
  const Sider = (
    <Layout.Sider collapsed={false}>
      <Menus></Menus>
    </Layout.Sider>
  )

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {Sider}
      <Layout>
        <AdminHeader></AdminHeader>
        <Layout.Content style={{ margin: '8px 16px 0', display: 'flex', flexDirection: 'column' }}>
          <div style={{ background: '#fff', borderRadius: '2px', padding: '5px', flexGrow: 1 }}>
            <React.Suspense fallback={<div>Loading comp...</div>}>
              <RouterApp></RouterApp>
            </React.Suspense>
          </div>
          <Layout.Footer style={{ textAlign: 'center' }}>react-admin ©2019 Created by H.Z</Layout.Footer>
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
export default hot(App)
