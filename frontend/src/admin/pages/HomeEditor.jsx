import React, { useState, useEffect } from 'react'
import { Card, Form, Input, Button, Space, message, Tabs, Switch, InputNumber } from 'antd'
import { SaveOutlined, EyeOutlined } from '@ant-design/icons'
import AdminLayout from '../components/AdminLayout'
import { pagesAPI } from '../../services/api'

const { TextArea } = Input

const HomeEditor = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchHomePage()
  }, [])

  const fetchHomePage = async () => {
    try {
      setLoading(true)
      const page = await pagesAPI.getBySlug('home')
      form.setFieldsValue(page)
    } catch (error) {
      // Set default homepage content
      form.setFieldsValue({
        title: 'Homepage',
        slug: 'home',
        content: {
          hero: {
            title: 'Elegant Mehndi Designs',
            subtitle: 'Artistry in Every Detail',
            description: 'Transform your celebrations with intricate, breathtaking mehndi artistry. Each creation tells your unique story through timeless patterns and contemporary elegance.',
            ctaText: 'Book Your Session',
            ctaLink: '#contact',
            backgroundImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop'
          },
          about: {
            title: 'Vikram Mehndi',
            subtitle: 'The Artist Behind the Art',
            description: 'With over 8 years of experience in the art of mehndi, Vikram has become a trusted name for creating stunning, intricate designs that celebrate life\'s most precious moments.',
            experience: 8,
            clients: 1000,
            designs: 2500,
            rating: 4.9
          },
          gallery: {
            title: 'Gallery',
            subtitle: 'Our Masterpieces',
            description: 'Discover our stunning collection of mehndi artistry, where tradition meets contemporary elegance'
          },
          services: {
            title: 'Services',
            subtitle: 'Our Expertise',
            description: 'Choose from our range of professional mehndi services, each designed to make your occasion truly special'
          },
          testimonials: {
            title: 'Testimonials',
            subtitle: 'Client Stories',
            description: 'Read what our satisfied clients say about their beautiful mehndi experience'
          },
          contact: {
            title: 'Get In Touch',
            subtitle: 'Let\'s Connect',
            description: 'Ready to book your mehndi session? Contact us today and let\'s create beautiful memories together'
          }
        }
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (values) => {
    try {
      setSaving(true)
      await pagesAPI.update('home', values)
      message.success('Homepage updated successfully')
    } catch (error) {
      message.error('Failed to update homepage')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div style={{ padding: '24px' }}>
        <Card
          title="Homepage Editor"
          extra={
            <Space>
              <Button icon={<EyeOutlined />} onClick={() => window.open('/', '_blank')}>
                Preview
              </Button>
              <Button 
                type="primary" 
                icon={<SaveOutlined />}
                loading={saving}
                onClick={() => form.submit()}
              >
                Save Changes
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
            <Tabs defaultActiveKey="hero">
              <Tabs.TabPane tab="Hero Section" key="hero">
                <Form.Item name={['content', 'hero', 'subtitle']} label="Subtitle">
                  <Input placeholder="Artistry in Every Detail" />
                </Form.Item>
                <Form.Item name={['content', 'hero', 'title']} label="Main Title">
                  <Input placeholder="Elegant Mehndi Designs" />
                </Form.Item>
                <Form.Item name={['content', 'hero', 'description']} label="Description">
                  <TextArea rows={4} placeholder="Hero description text" />
                </Form.Item>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <Form.Item name={['content', 'hero', 'ctaText']} label="Button Text" style={{ flex: 1 }}>
                    <Input placeholder="Book Your Session" />
                  </Form.Item>
                  <Form.Item name={['content', 'hero', 'ctaLink']} label="Button Link" style={{ flex: 1 }}>
                    <Input placeholder="#contact" />
                  </Form.Item>
                </div>
                <Form.Item name={['content', 'hero', 'backgroundImage']} label="Background Image URL">
                  <Input placeholder="https://..." />
                </Form.Item>
              </Tabs.TabPane>

              <Tabs.TabPane tab="About Section" key="about">
                <Form.Item name={['content', 'about', 'title']} label="Artist Name">
                  <Input placeholder="Vikram Mehndi" />
                </Form.Item>
                <Form.Item name={['content', 'about', 'subtitle']} label="Section Title">
                  <Input placeholder="The Artist Behind the Art" />
                </Form.Item>
                <Form.Item name={['content', 'about', 'description']} label="Description">
                  <TextArea rows={4} placeholder="About description" />
                </Form.Item>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                  <Form.Item name={['content', 'about', 'experience']} label="Years Experience">
                    <InputNumber min={0} placeholder="8" />
                  </Form.Item>
                  <Form.Item name={['content', 'about', 'clients']} label="Happy Clients">
                    <InputNumber min={0} placeholder="1000" />
                  </Form.Item>
                  <Form.Item name={['content', 'about', 'designs']} label="Designs Created">
                    <InputNumber min={0} placeholder="2500" />
                  </Form.Item>
                  <Form.Item name={['content', 'about', 'rating']} label="Average Rating">
                    <InputNumber min={0} max={5} step={0.1} placeholder="4.9" />
                  </Form.Item>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Gallery Section" key="gallery">
                <Form.Item name={['content', 'gallery', 'subtitle']} label="Subtitle">
                  <Input placeholder="Our Masterpieces" />
                </Form.Item>
                <Form.Item name={['content', 'gallery', 'title']} label="Title">
                  <Input placeholder="Gallery" />
                </Form.Item>
                <Form.Item name={['content', 'gallery', 'description']} label="Description">
                  <TextArea rows={3} placeholder="Gallery description" />
                </Form.Item>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Services Section" key="services">
                <Form.Item name={['content', 'services', 'subtitle']} label="Subtitle">
                  <Input placeholder="Our Expertise" />
                </Form.Item>
                <Form.Item name={['content', 'services', 'title']} label="Title">
                  <Input placeholder="Services" />
                </Form.Item>
                <Form.Item name={['content', 'services', 'description']} label="Description">
                  <TextArea rows={3} placeholder="Services description" />
                </Form.Item>
              </Tabs.TabPane>

              <Tabs.TabPane tab="Contact Section" key="contact">
                <Form.Item name={['content', 'contact', 'subtitle']} label="Subtitle">
                  <Input placeholder="Let's Connect" />
                </Form.Item>
                <Form.Item name={['content', 'contact', 'title']} label="Title">
                  <Input placeholder="Get In Touch" />
                </Form.Item>
                <Form.Item name={['content', 'contact', 'description']} label="Description">
                  <TextArea rows={3} placeholder="Contact description" />
                </Form.Item>
              </Tabs.TabPane>
            </Tabs>
          </Form>
        </Card>
      </div>
    </AdminLayout>
  )
}

export default HomeEditor