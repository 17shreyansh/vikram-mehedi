import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, InputNumber, Select, Tag, message, Popconfirm, Switch } from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import AdminLayout from '../components/AdminLayout'
import { servicesAPI } from '../../services/api'

const Services = () => {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [editingService, setEditingService] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await servicesAPI.getAll()
      setServices(response || [])
    } catch (error) {
      message.error('Failed to fetch services')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (values) => {
    try {
      const serviceData = {
        ...values,
        features: values.features?.split('\n').filter(f => f.trim()) || []
      }

      if (editingService) {
        await servicesAPI.update(editingService._id, serviceData)
        message.success('Service updated successfully')
      } else {
        await servicesAPI.create(serviceData)
        message.success('Service created successfully')
      }

      setModalVisible(false)
      setEditingService(null)
      form.resetFields()
      fetchServices()
    } catch (error) {
      message.error('Failed to save service')
    }
  }

  const handleEdit = (service) => {
    setEditingService(service)
    form.setFieldsValue({
      ...service,
      features: service.features?.join('\n') || ''
    })
    setModalVisible(true)
  }

  const handleDelete = async (id) => {
    try {
      await servicesAPI.delete(id)
      message.success('Service deleted successfully')
      fetchServices()
    } catch (error) {
      message.error('Failed to delete service')
    }
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (category) => <Tag color="blue">{category}</Tag>,
    },
    {
      title: 'Price Range',
      key: 'price',
      render: (_, record) => (
        <span>₹{record.minPrice?.toLocaleString()} - ₹{record.maxPrice?.toLocaleString()}</span>
      ),
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
    },
    {
      title: 'Popular',
      dataIndex: 'popular',
      key: 'popular',
      render: (popular) => (
        <Tag color={popular ? 'green' : 'default'}>
          {popular ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Popconfirm
            title="Are you sure you want to delete this service?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <AdminLayout>
      <div style={{ padding: '24px' }}>
        <Card
          title="Services Management"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setEditingService(null)
                form.resetFields()
                setModalVisible(true)
              }}
            >
              Add Service
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={services}
            loading={loading}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title={editingService ? 'Edit Service' : 'Add New Service'}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false)
            setEditingService(null)
            form.resetFields()
          }}
          footer={null}
          width={600}
        >
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item
              name="title"
              label="Service Title"
              rules={[{ required: true, message: 'Please enter service title' }]}
            >
              <Input placeholder="Enter service title" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: 'Please enter description' }]}
            >
              <Input.TextArea rows={3} placeholder="Enter service description" />
            </Form.Item>

            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: 'Please select category' }]}
            >
              <Select placeholder="Select category">
                <Select.Option value="Bridal">Bridal</Select.Option>
                <Select.Option value="Arabic">Arabic</Select.Option>
                <Select.Option value="Indo-Western">Indo-Western</Select.Option>
                <Select.Option value="Party">Party</Select.Option>
              </Select>
            </Form.Item>

            <div style={{ display: 'flex', gap: '16px' }}>
              <Form.Item
                name="minPrice"
                label="Min Price (₹)"
                rules={[{ required: true, message: 'Please enter minimum price' }]}
                style={{ flex: 1 }}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Minimum price"
                />
              </Form.Item>

              <Form.Item
                name="maxPrice"
                label="Max Price (₹)"
                rules={[{ required: true, message: 'Please enter maximum price' }]}
                style={{ flex: 1 }}
              >
                <InputNumber
                  min={0}
                  style={{ width: '100%' }}
                  placeholder="Maximum price"
                />
              </Form.Item>
            </div>

            <Form.Item
              name="duration"
              label="Duration"
              rules={[{ required: true, message: 'Please enter duration' }]}
            >
              <Input placeholder="e.g., 2-3 hours" />
            </Form.Item>

            <Form.Item
              name="icon"
              label="Icon"
              rules={[{ required: true, message: 'Please select icon' }]}
            >
              <Select placeholder="Select icon">
                <Select.Option value="FaCrown">Crown (Bridal)</Select.Option>
                <Select.Option value="FaStar">Star (Popular)</Select.Option>
                <Select.Option value="FaHeart">Heart (Love)</Select.Option>
                <Select.Option value="FaGift">Gift (Party)</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="features"
              label="Features (one per line)"
            >
              <Input.TextArea
                rows={4}
                placeholder="Enter features, one per line"
              />
            </Form.Item>

            <Form.Item name="popular" label="Mark as Popular" valuePropName="checked">
              <Switch />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {editingService ? 'Update Service' : 'Create Service'}
                </Button>
                <Button onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </AdminLayout>
  )
}

export default Services