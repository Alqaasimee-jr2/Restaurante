import { Form, Input, Button, message, Typography, Card } from 'antd';
import {
  EnvironmentOutlined,
  PhoneOutlined,
  ClockCircleOutlined,
  WhatsAppOutlined,
  MailOutlined,
  SendOutlined,
} from '@ant-design/icons';
import restaurant from '../config/restaurant';
import './Contact.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function Contact() {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const msg = [
        `📩 *Contact from ${restaurant.name} Website*`,
        `*Name:* ${values.name}`,
        `*Phone/Email:* ${values.contact}`,
        `*Message:* ${values.message}`,
      ].join('\n');
      const waUrl = `https://wa.me/${restaurant.whatsapp.replace('+', '')}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      message.success('Message sent via WhatsApp!');
      form.resetFields();
    } catch {
      message.error('Please fill in all required fields');
    }
  };

  return (
    <div className="contact">
      <section className="contact__hero">
        <div className="contact__hero-overlay" />
        <div className="contact__hero-content">
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you</p>
        </div>
      </section>

      <section className="contact__section">
        <div className="contact__inner">
          <div className="contact__grid">
            {/* Info Cards */}
            <div className="contact__info">
              <Card className="contact-card">
                <EnvironmentOutlined className="contact-card__icon" />
                <Title level={5}>Address</Title>
                <Text>{restaurant.address}</Text>
              </Card>

              <Card className="contact-card">
                <ClockCircleOutlined className="contact-card__icon" />
                <Title level={5}>Opening Hours</Title>
                {restaurant.hours.map((h) => (
                  <div key={h.day} className="contact-card__hours">
                    <Text strong>{h.day}</Text>
                    <Text>{h.time}</Text>
                  </div>
                ))}
              </Card>

              <Card className="contact-card">
                <PhoneOutlined className="contact-card__icon" />
                <Title level={5}>Contact</Title>
                <Text>
                  <a href={`tel:${restaurant.phone}`}>{restaurant.phone}</a>
                </Text>
                <br />
                <Text>
                  <a href={`mailto:${restaurant.email}`}>{restaurant.email}</a>
                </Text>
                <div style={{ marginTop: 12 }}>
                  <a
                    href={`https://wa.me/${restaurant.whatsapp.replace('+', '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="contact-card__wa"
                  >
                    <WhatsAppOutlined /> Chat on WhatsApp
                  </a>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="contact__form-wrapper">
              <Card className="contact__form-card">
                <Title level={4}>
                  <MailOutlined style={{ marginRight: 8 }} />
                  Send Us a Message
                </Title>
                <Form form={form} layout="vertical" requiredMark={false}>
                  <Form.Item name="name" label="Your Name" rules={[{ required: true }]}>
                    <Input placeholder="John Doe" size="large" />
                  </Form.Item>
                  <Form.Item
                    name="contact"
                    label="Email or Phone"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="you@email.com or +234..." size="large" />
                  </Form.Item>
                  <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                    <TextArea rows={4} placeholder="How can we help?" />
                  </Form.Item>
                  <Button
                    type="primary"
                    size="large"
                    block
                    icon={<SendOutlined />}
                    onClick={handleSubmit}
                  >
                    Send Message
                  </Button>
                </Form>
              </Card>
            </div>
          </div>

          {/* Map */}
          <div className="contact__map">
            <iframe
              title="Restaurant Location"
              src={restaurant.mapEmbedUrl}
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: 16 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
