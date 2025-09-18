import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Space, message, Tabs, Upload, Select, Switch } from 'antd'
import { PlusOutlined, SaveOutlined, EyeOutlined } from '@ant-design/icons'
import { useParams, useNavigate } from 'react-router-dom'
import AdminLayout from '../components/AdminLayout'
import { pagesAPI } from '../../services/api'

const { TextArea } = Input
const { TabPane } = Tabs

const PageEditor = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (slug !== 'new') {
      fetchPage()
    } else {
      // Set default values for new page
      form.setFieldsValue({
        title: '',
        slug: '',
        isActive: true,
        content: {
          hero: {
            title: '',
            subtitle: '',
            description: '',
            ctaText: 'Get Started',
            ctaLink: '#contact'
          }
        },
        seo: {
          metaTitle: '',
          metaDescription: '',
          keywords: []
        }
      })
    }
  }, [slug])

  const fetchPage = async () => {
    try {
      setLoading(true)
      const page = await pagesAPI.getBySlug(slug)
      form.setFieldsValue(page)
    } catch (error) {
      message.error('Failed to load page')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (values) => {
    try {
      setSaving(true)
      const pageSlug = values.slug || slug
      await pagesAPI.update(pageSlug, values)
      message.success('Page saved successfully')
      if (slug === 'new') {
        navigate(`/admin/pages/${pageSlug}`)
      }
    } catch (error) {
      message.error('Failed to save page')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div style={{ padding: '24px' }}>
        <Card
          title={`${slug === 'new' ? 'Create' : 'Edit'} Page`}
          extra={
            <Space>
              <Button icon={<EyeOutlined />}>Preview</Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                loading={saving}
                onClick={() => form.submit()}
              >
                Save Page
              </Button>
            </Space>
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSave}
            loading={loading}
          >
            <Tabs defaultActiveKey="content">
              <TabPane tab="Content" key="content">
                <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                  <Form.Item name="title" label="Page Title" style={{ flex: 1 }}>
                    <Input placeholder="Enter page title" />
                  </Form.Item>
                  <Form.Item name="slug" label="URL Slug" style={{ flex: 1 }}>
                    <Input placeholder="page-url-slug" />
                  </Form.Item>
                  <Form.Item name="isActive" label="Active" valuePropName="checked">
                    <Switch />
                  </Form.Item>
                </div>

                <Card title="Hero Section" size="small" style={{ marginBottom: '16px' }}>
                  <Form.Item name={['content', 'hero', 'title']} label="Hero Title">
                    <Input placeholder="Main hero title" />
                  </Form.Item>
                  <Form.Item name={['content', 'hero', 'subtitle']} label="Hero Subtitle">
                    <Input placeholder="Hero subtitle" />
                  </Form.Item>
                  <Form.Item name={['content', 'hero', 'description']} label="Hero Description">
                    <TextArea rows={3} placeholder="Hero description text" />
                  </Form.Item>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <Form.Item name={['content', 'hero', 'ctaText']} label="CTA Text" style={{ flex: 1 }}>
                      <Input placeholder="Button text" />
                    </Form.Item>
                    <Form.Item name={['content', 'hero', 'ctaLink']} label="CTA Link" style={{ flex: 1 }}>
                      <Input placeholder="#section or /page" />
                    </Form.Item>
                  </div>
                  <Form.Item name={['content', 'hero', 'backgroundImage']} label="Background Image">
                    <Input placeholder="Image URL" />
                  </Form.Item>
                </Card>
              </TabPane>

              <TabPane tab="SEO" key="seo">
                <Form.Item name={['seo', 'metaTitle']} label="Meta Title">
                  <Input placeholder="SEO title (60 chars max)" maxLength={60} />
                </Form.Item>
                <Form.Item name={['seo', 'metaDescription']} label="Meta Description">
                  <TextArea rows={3} placeholder="SEO description (160 chars max)" maxLength={160} />
                </Form.Item>
                <Form.Item name={['seo', 'keywords']} label="Keywords">
                  <Select
                    mode="tags"
                    placeholder="Add keywords"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </TabPane>
            </Tabs>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default PageEditor