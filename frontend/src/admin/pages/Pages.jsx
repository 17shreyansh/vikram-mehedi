import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Space, Tag, message } from 'antd'
import { PlusOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { pagesAPI } from '../../services/api'

const Pages = () => {
  const [pages, setPages] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      setLoading(true)
      const response = await pagesAPI.getAll()
      setPages(response || [])
    } catch (error) {
      message.error('Failed to fetch pages')
    } finally {
      setLoading(false)
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (title, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{title}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>/{record.slug}</div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'status',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (date) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => window.open(`/${record.slug}`, '_blank')}
          />
          <Link to={record.slug === 'home' ? '/admin/pages/home' : record.slug === 'about' ? '/admin/pages/about' : `/admin/pages/${record.slug}`}>
            <Button
              type="link"
              icon={<EditOutlined />}
            />
          </Link>
        </Space>
      ),
    },
  ]

  const defaultPages = [
    { slug: 'home', title: 'Homepage', isActive: true, updatedAt: new Date() },
    { slug: 'about', title: 'About Page', isActive: true, updatedAt: new Date() },
    { slug: 'contact', title: 'Contact Page', isActive: true, updatedAt: new Date() },
  ]

  const allPages = [...defaultPages, ...pages.filter(p => !['home', 'about', 'contact'].includes(p.slug))]

  return (
    <AdminLayout>
      <div style={{ padding: '24px' }}>
        <Card
          title="Pages Management"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              href="/admin/pages/new"
            >
              Create Page
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={allPages}
            loading={loading}
            rowKey="slug"
            pagination={{ pageSize: 10 }}
          />
        </Card>
      </div>
    </AdminLayout>
  )
}

export default Pages