import React, { useState, useEffect } from 'react'
import { Card, Row, Col, Statistic, Table, Tag, Button, Space, Spin, Alert } from 'antd'
import { PictureOutlined, CalendarOutlined, CustomerServiceOutlined, MailOutlined, EditOutlined, HomeOutlined, FileTextOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { galleryAPI, servicesAPI } from '../../services/api'

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    bookings: 0,
    gallery: 0,
    services: 0,
    messages: 0
  })
  const [recentBookings, setRecentBookings] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const [servicesRes, galleryRes] = await Promise.all([
        servicesAPI.getAll(),
        galleryAPI.getAll({ limit: 1 })
      ])

      setStats({
        bookings: 25,
        gallery: galleryRes.images?.length || 8,
        services: servicesRes.length || 4,
        messages: 12
      })

      setRecentBookings([
        { key: 1, name: 'Priya Sharma', service: 'Bridal Mehndi', date: '2024-01-15', status: 'confirmed' },
        { key: 2, name: 'Anita Patel', service: 'Arabic Mehndi', date: '2024-01-16', status: 'pending' },
        { key: 3, name: 'Riya Singh', service: 'Party Mehndi', date: '2024-01-17', status: 'completed' }
      ])
    } catch (err) {
      setError('Failed to load dashboard data')
      console.error('Dashboard error:', err)
    } finally {
      setLoading(false)
    }
  }

  const statsData = [
    { title: 'Total Bookings', value: stats.bookings, color: '#1890ff', icon: CalendarOutlined },
    { title: 'Gallery Images', value: stats.gallery, color: '#52c41a', icon: PictureOutlined },
    { title: 'Services', value: stats.services, color: '#722ed1', icon: CustomerServiceOutlined },
    { title: 'Messages', value: stats.messages, color: '#fa8c16', icon: MailOutlined },
  ]

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Service', dataIndex: 'service', key: 'service' },
    { title: 'Date', dataIndex: 'date', key: 'date' },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const colors = { confirmed: 'green', pending: 'orange', completed: 'blue', cancelled: 'red' }
        return <Tag color={colors[status] || 'default'}>{status?.toUpperCase()}</Tag>
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space>
          <Button size="small" type="link">View</Button>
          <Button size="small" type="primary">Edit</Button>
        </Space>
      ),
    },
  ]

  if (loading) {
    return (
      <AdminLayout>
        <div style={{ padding: '24px', textAlign: 'center' }}>
          <Spin size="large" />
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div style={{ padding: '24px' }}>
        <h1 style={{ marginBottom: '24px', color: '#6B1D1D' }}>Dashboard Overview</h1>
        
        {error && (
          <Alert message={error} type="error" style={{ marginBottom: '24px' }} />
        )}
        
        <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
          {statsData.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card hoverable>
                  <Statistic
                    title={stat.title}
                    value={stat.value}
                    valueStyle={{ color: stat.color }}
                    prefix={<IconComponent style={{ color: stat.color }} />}
                  />
                </Card>
              </Col>
            )
          })}
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} lg={16}>
            <Card title="Recent Bookings" extra={<Link to="/admin/bookings">View All</Link>}>
              <Table
                columns={columns}
                dataSource={recentBookings}
                pagination={false}
                size="small"
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card title="Quick Actions">
              <Space direction="vertical" style={{ width: '100%' }}>
                <Button type="primary" block icon={<PictureOutlined />}>
                  <Link to="/admin/gallery">Manage Gallery</Link>
                </Button>
                <Button block icon={<CustomerServiceOutlined />}>
                  <Link to="/admin/services">Manage Services</Link>
                </Button>
                <Button block icon={<CalendarOutlined />}>
                  <Link to="/admin/bookings">View Bookings</Link>
                </Button>
                <Button block icon={<HomeOutlined />}>
                  <Link to="/admin/pages/home">Edit Homepage</Link>
                </Button>
                <Button block icon={<EditOutlined />}>
                  <Link to="/admin/pages/about">Edit About Page</Link>
                </Button>
                <Button block icon={<FileTextOutlined />}>
                  <Link to="/admin/blogs">Manage Blogs</Link>
                </Button>
                <Button block icon={<MailOutlined />}>
                  <Link to="/admin/contacts">View Messages</Link>
                </Button>
              </Space>
            </Card>
          </Col>
        </Row>
      </div>
    </AdminLayout>
  )
}

export default Dashboard