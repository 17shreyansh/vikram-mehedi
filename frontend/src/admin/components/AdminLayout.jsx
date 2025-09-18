import React, { useState } from 'react'
import { Layout, Menu, Typography, Button, Avatar, Dropdown, Space } from 'antd'
import { 
  DashboardOutlined, 
  PictureOutlined, 
  CalendarOutlined, 
  CustomerServiceOutlined,
  MailOutlined,
  FileTextOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  HomeOutlined,
  EditOutlined
} from '@ant-design/icons'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

const { Header, Sider, Content } = Layout
const { Title } = Typography

const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { admin, logout } = useAuth()

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/gallery',
      icon: <PictureOutlined />,
      label: <Link to="/admin/gallery">Gallery</Link>,
    },
    {
      key: '/admin/services',
      icon: <CustomerServiceOutlined />,
      label: <Link to="/admin/services">Services</Link>,
    },
    {
      key: '/admin/bookings',
      icon: <CalendarOutlined />,
      label: <Link to="/admin/bookings">Bookings</Link>,
    },
    {
      key: '/admin/pages/home',
      icon: <EditOutlined />,
      label: <Link to="/admin/pages/home">Homepage Editor</Link>,
    },
    {
      key: '/admin/pages/about',
      icon: <FileTextOutlined />,
      label: <Link to="/admin/pages/about">About Page</Link>,
    },
    {
      key: '/admin/blogs',
      icon: <EditOutlined />,
      label: <Link to="/admin/blogs">Blogs</Link>,
    },
  ]

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
    },
  ]

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={250} 
        theme="light" 
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ 
          borderRight: '1px solid #f0f0f0',
          boxShadow: '2px 0 8px rgba(0,0,0,0.1)'
        }}
      >
        <div style={{ 
          padding: collapsed ? '16px 8px' : '16px', 
          borderBottom: '1px solid #f0f0f0',
          textAlign: collapsed ? 'center' : 'left',
          background: 'linear-gradient(135deg, #6B1D1D 0%, #C5A572 100%)'
        }}>
          {!collapsed ? (
            <Title level={4} style={{ margin: 0, color: 'white', fontFamily: 'accent' }}>
              Vikram Mehndi
            </Title>
          ) : (
            <Title level={4} style={{ margin: 0, color: 'white' }}>
              VM
            </Title>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          style={{ border: 'none', paddingTop: '8px' }}
          theme="light"
        />
      </Sider>
      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 24px', 
          borderBottom: '1px solid #f0f0f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <Title level={3} style={{ margin: 0, color: '#6B1D1D' }}>
              Admin Panel
            </Title>
          </Space>
          
          <Space>
            <Button 
              icon={<HomeOutlined />} 
              onClick={() => navigate('/')}
              type="primary"
              style={{ 
                background: '#6B1D1D',
                borderColor: '#6B1D1D'
              }}
            >
              View Website
            </Button>
            <Dropdown 
              menu={{ 
                items: userMenuItems,
                onClick: ({ key }) => {
                  if (key === 'logout') {
                    logout()
                    navigate('/admin/login')
                  }
                }
              }} 
              placement="bottomRight"
            >
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} style={{ backgroundColor: '#6B1D1D' }} />
                <span style={{ color: '#6B1D1D', fontWeight: 500 }}>
                  {admin?.username || 'Admin'}
                </span>
              </Space>
            </Dropdown>
          </Space>
        </Header>
        <Content style={{ 
          padding: '24px', 
          background: '#f5f5f5',
          minHeight: 'calc(100vh - 64px)',
          overflow: 'auto'
        }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout