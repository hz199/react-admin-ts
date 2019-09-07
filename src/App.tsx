import * as React from 'react'
import { hot } from 'react-hot-loader/root'
import { Layout } from 'antd'
import RouterApp from './routes'
import AdminHeader from './components/Layout/Header'

const Sider = <Layout.Sider collapsed={false}>55</Layout.Sider>

const App = () => (
  <Layout style={{ minHeight: '100vh' }}>
    {Sider}
    <Layout>
      <AdminHeader></AdminHeader>
      <Layout.Content style={{ margin: '8px 16px 0' }}>
        <div style={{ background: '#fff', borderRadius: '5px', padding: '5px' }}>
          <RouterApp></RouterApp>
        </div>
        <Layout.Footer style={{ textAlign: 'center' }}>react-admin ©2019 Created by H.Z</Layout.Footer>
      </Layout.Content>
    </Layout>
  </Layout>
)
export default hot(App)
