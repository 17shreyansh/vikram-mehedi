import React, { useState, useEffect } from 'react'
import { Card, Table, Button, Space, Upload, Modal, Form, Input, Select, Tag, message, Popconfirm, Image } from 'antd'
import { PlusOutlined, UploadOutlined, DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons'
import AdminLayout from '../components/AdminLayout'
import { galleryAPI } from '../../services/api'

const Gallery = () => {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [form] = Form.useForm()

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      setLoading(true)
      const response = await galleryAPI.getAll()
      setImages(response.images || [])
    } catch (error) {
      message.error('Failed to fetch images')
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (values) => {
    try {
      const formData = new FormData()
      formData.append('title', values.title)
      formData.append('category', values.category)
      formData.append('description', values.description)
      if (values.image?.file) {
        formData.append('image', values.image.file)
      }

      await galleryAPI.upload(formData)
      message.success('Image uploaded successfully')
      setModalVisible(false)
      form.resetFields()
      fetchImages()
    } catch (error) {
      message.error('Failed to upload image')
    }
  }

  const handleDelete = async (id) => {
    try {
      await galleryAPI.delete(id)
      message.success('Image deleted successfully')
      fetchImages()
    } catch (error) {
      message.error('Failed to delete image')
    }
  }

  const columns = [
    {
      title: 'Image',
      dataIndex: 'url',
      key: 'image',
      render: (url) => (
        <Image
          width={60}
          height={60}
          src={url}
          style={{ objectFit: 'cover', borderRadius: '4px' }}
          preview={{
            mask: <EyeOutlined />,
          }}
        />
      ),
    },
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
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured) => (
        <Tag color={featured ? 'green' : 'default'}>
          {featured ? 'Yes' : 'No'}
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
            icon={<EyeOutlined />}
            onClick={() => {
              setPreviewImage(record.url)
              setPreviewVisible(true)
            }}
          />
          <Button type="link" icon={<EditOutlined />} />
          <Popconfirm
            title="Are you sure you want to delete this image?"
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
          title="Gallery Management"
          extra={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setModalVisible(true)}
            >
              Add Image
            </Button>
          }
        >
          <Table
            columns={columns}
            dataSource={images}
            loading={loading}
            rowKey="_id"
            pagination={{ pageSize: 10 }}
          />
        </Card>

        <Modal
          title="Add New Image"
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false)
            form.resetFields()
          }}
          footer={null}
        >
          <Form form={form} onFinish={handleUpload} layout="vertical">
            <Form.Item
              name="title"
              label="Title"
              rules={[{ required: true, message: 'Please enter title' }]}
            >
              <Input placeholder="Enter image title" />
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

            <Form.Item name="description" label="Description">
              <Input.TextArea rows={3} placeholder="Enter description" />
            </Form.Item>

            <Form.Item
              name="image"
              label="Image"
              rules={[{ required: true, message: 'Please upload an image' }]}
            >
              <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
              >
                <div>
                  <UploadOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  Upload Image
                </Button>
                <Button onClick={() => setModalVisible(false)}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>

        <Modal
          open={previewVisible}
          title="Image Preview"
          footer={null}
          onCancel={() => setPreviewVisible(false)}
        >
          <img alt="preview" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    </AdminLayout>
  )
}

export default Gallery