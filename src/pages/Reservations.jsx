import { Form, Input, Button, DatePicker, TimePicker, InputNumber, message, Typography, Card } from 'antd';
import { CalendarOutlined, CheckCircleOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useState } from 'react';
import restaurant from '../config/restaurant';
import './Reservations.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

export default function Reservations() {
  const [submitted, setSubmitted] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const date = values.date?.format('dddd, MMMM D, YYYY') || '';
      const time = values.time?.format('h:mm A') || '';
      const msg = [
        `📅 *Reservation Request — ${restaurant.name}*`,
        `*Name:* ${values.name}`,
        `*Phone:* ${values.phone}`,
        `*Date:* ${date}`,
        `*Time:* ${time}`,
        `*Party Size:* ${values.partySize}`,
        values.notes ? `*Notes:* ${values.notes}` : '',
      ]
        .filter(Boolean)
        .join('\n');
      const waUrl = `https://wa.me/${restaurant.whatsapp.replace('+', '')}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');
      setSubmitted(true);
      form.resetFields();
    } catch {
      message.error('Please fill in all required fields');
    }
  };

  return (
    <div className="reservations">
      <section className="reservations__hero">
        <div className="reservations__hero-overlay" />
        <div className="reservations__hero-content">
          <h1>Make a Reservation</h1>
          <p>Secure your table at {restaurant.name}</p>
        </div>
      </section>

      <section className="reservations__section">
        <div className="reservations__inner">
          {submitted ? (
            <Card className="reservations__success">
              <CheckCircleOutlined style={{ fontSize: 64, color: '#52c41a' }} />
              <Title level={3} style={{ marginTop: 16 }}>Reservation Sent!</Title>
              <Text type="secondary">
                Your reservation request has been sent via WhatsApp.
                We'll confirm your booking shortly.
              </Text>
              <Button
                type="primary"
                size="large"
                style={{ marginTop: 24 }}
                onClick={() => setSubmitted(false)}
              >
                Make Another Reservation
              </Button>
            </Card>
          ) : (
            <Card className="reservations__form-card">
              <Title level={3}>
                <CalendarOutlined style={{ marginRight: 8 }} />
                Reserve Your Table
              </Title>
              <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
                Fill in the details below and we'll confirm your reservation via WhatsApp.
              </Text>

              <Form form={form} layout="vertical" requiredMark={false}>
                <div className="reservations__form-row">
                  <Form.Item name="name" label="Full Name" rules={[{ required: true }]} className="reservations__form-half">
                    <Input placeholder="John Doe" size="large" />
                  </Form.Item>
                  <Form.Item name="phone" label="Phone Number" rules={[{ required: true }]} className="reservations__form-half">
                    <Input placeholder="+234 800 000 0000" size="large" />
                  </Form.Item>
                </div>
                <div className="reservations__form-row">
                  <Form.Item name="date" label="Date" rules={[{ required: true }]} className="reservations__form-half">
                    <DatePicker size="large" style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item name="time" label="Time" rules={[{ required: true }]} className="reservations__form-half">
                    <TimePicker
                      size="large"
                      format="h:mm A"
                      use12Hours
                      minuteStep={15}
                      style={{ width: '100%' }}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  name="partySize"
                  label="Party Size"
                  rules={[{ required: true }]}
                  initialValue={2}
                >
                  <InputNumber min={1} max={20} size="large" style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="notes" label="Special Requests (optional)">
                  <TextArea rows={3} placeholder="Any dietary requirements, celebrations..." />
                </Form.Item>
                <Button
                  type="primary"
                  size="large"
                  block
                  icon={<WhatsAppOutlined />}
                  onClick={handleSubmit}
                  className="reservations__submit"
                >
                  Send Reservation via WhatsApp
                </Button>
              </Form>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
