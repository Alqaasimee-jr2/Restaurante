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
      
      // Format phone number to international format if it starts with '0'
      let formattedPhone = values.phone.trim();
      if (formattedPhone.startsWith('0')) {
        formattedPhone = '+234' + formattedPhone.slice(1);
      }

      const formattedDate = values.date?.format('dddd, MMMM D, YYYY') || '';
      const formattedTime = values.time?.format('h:mm A') || '';

      const payload = {
        fullName: values.name,
        phone: formattedPhone,
        date: formattedDate,
        time: formattedTime,
        partySize: values.partySize,
        specialRequests: values.notes || ''
      };

      const response = await fetch('https://hook.eu1.make.com/s8ct87qdgskn3gqmup2angk5n44aqgq1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        message.success('Success');
        setSubmitted(true);
        form.resetFields();
      } else {
        message.error('Failed to send reservation. Please try again or contact us via WhatsApp.');
      }
    } catch (error) {
      console.error('Submission error:', error);
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
