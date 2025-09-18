import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Space, Modal, Form, Input, Select, Tag, message, DatePicker, Badge } from 'antd'
import { EyeOutlined, EditOutlined, CalendarOutlined } from '@ant-design/icons'
import AdminLayout from '../components/AdminLayout'
import { bookingsAPI } from '../../services/api'
import dayjs from 'dayjs'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [form] = Form.useForm()

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      // Mock data since API might not be ready
      setBookings([
        {
          _id: '1',
          name: 'Priya Sharma',
          phone: '+91 98765 43210',
          email: 'priya@example.com',
          service: 'Bridal Mehndi',
          date: '2024-01-15',
          time: '10:00 AM',
          status: 'confirmed',
          amount: 8000,
          address: 'Mumbai, Maharashtra',
          notes: 'Wedding ceremony mehndi'
        },
        {
          _id: '2',
          name: 'Anita Patel',
          phone: '+91 87654 32109',
          email: 'anita@example.com',
          service: 'Arabic Mehndi',
          date: '2024-01-16',
          time: '2:00 PM',
          status: 'pending',
          amount: 3500,
          address: 'Delhi, India',
          notes: 'Party function'
        },
        {
          _id: '3',
          name: 'Riya Singh',
          phone: '+91 76543 21098',
          email: 'riya@example.com',
          service: 'Party Mehndi',
          date: '2024-01-17',
          time: '4:00 PM',
          status: 'completed',
          amount: 2500,
          address: 'Bangalore, Karnataka',
          notes: 'Festival celebration'
        }
      ])
    } catch (error) {
      message.error('Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      // await bookingsAPI.update(bookingId, { status: newStatus })
      setBookings(prev => 
        prev.map(booking => 
          booking._id === bookingId 
            ? { ...booking, status: newStatus }
            : booking
        )
      )
      message.success('Booking status updated successfully')
    } catch (error) {
      message.error('Failed to update booking status')
    }
  }

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking)
    form.setFieldsValue({
      ...booking,
      date: dayjs(booking.date)
    })
    setModalVisible(true)
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'orange',
      confirmed: 'blue',
      completed: 'green',
      cancelled: 'red'
    }
    return colors[status] || 'default'
  }

  const columns = [
    {
      title: 'Booking ID',
      dataIndex: '_id',
      key: 'id',
      render: (id) => `#${id.slice(-6).toUpperCase()}`,
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.name}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.phone}</div>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: 'service',
      key: 'service',
      render: (service) => <Tag color="blue">{service}</Tag>,
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_, record) => (
        <div>
          <div>{dayjs(record.date).format('DD MMM YYYY')}</div>
          <div style={{ fontSize: '12px', color: '#666' }}>{record.time}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `₹${amount?.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge
          status={status === 'completed' ? 'success' : status === 'confirmed' ? 'processing' : 'warning'}
          text={status.toUpperCase()}
        />
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetails(record)}
          />
          <Select
            size="small"
            value={record.status}
            onChange={(value) => handleStatusUpdate(record._id, value)}
            style={{ width: 100 }}
          >
            <Select.Option value="pending">Pending</Select.Option>
            <Select.Option value="confirmed">Confirmed</Select.Option>
            <Select.Option value="completed">Completed</Select.Option>
            <Select.Option value="cancelled">Cancelled</Select.Option>
          </Select>
        </Space>
      ),
    },
  ]

  return (
    <AdminLayout>
      <div style={{ padding: '24px' }}>
        <Card
          title="Bookings Management"
          extra={
            <Space>
              <Button icon={<CalendarOutlined />}>
                Calendar View
              </Button>
            </Space>
          }
        >
          <Table
            columns={columns}
            dataSource={bookings}
            loading={loading}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title="Booking Details"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              Close
            </Button>,
            <Button key="edit" type="primary" icon={<EditOutlined />}>
              Edit Booking
            </Button>
          ]}
          width={600}
        >
          {selectedBooking && (
            <Form form={form} layout="vertical" disabled>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Form.Item name="name" label="Customer Name" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item name="phone" label="Phone" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
              </div>

              <Form.Item name="email" label="Email">
                <Input />
              </Form.Item>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Form.Item name="service" label="Service" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
                <Form.Item name="amount" label="Amount (₹)" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <Form.Item name="date" label="Date" style={{ flex: 1 }}>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="time" label="Time" style={{ flex: 1 }}>
                  <Input />
                </Form.Item>
              </div>

              <Form.Item name="address" label="Address">
                <Input.TextArea rows={2} />
              </Form.Item>

              <Form.Item name="notes" label="Notes">
                <Input.TextArea rows={3} />
              </Form.Item>

              <Form.Item name="status" label="Status">
                <Select>
                  <Select.Option value="pending">Pending</Select.Option>
                  <Select.Option value="confirmed">Confirmed</Select.Option>
                  <Select.Option value="completed">Completed</Select.Option>
                  <Select.Option value="cancelled">Cancelled</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          )}
        </Modal>
      </div>
    </AdminLayout>
  )
}

export default Bookings