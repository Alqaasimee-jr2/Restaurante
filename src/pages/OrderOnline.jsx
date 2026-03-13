import { useState, useMemo } from 'react';
import { Form, Input, Radio, Button, message, Modal, Divider, Typography, Drawer } from 'antd';
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  PlusOutlined,
  MinusOutlined,
  CheckCircleOutlined,
  WhatsAppOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import CuisineToggle from '../components/Menu/CuisineToggle';
import CategoryTabs from '../components/Menu/CategoryTabs';
import DishRow from '../components/Dishes/DishRow';
import { useCart } from '../components/Cart/CartContext';
import dishes from '../data/dishes';
import categories from '../data/categories';
import restaurant from '../config/restaurant';
import './OrderOnline.css';

const { Title, Text } = Typography;
const { TextArea } = Input;

const CartPanelContent = ({
  items,
  updateQuantity,
  removeItem,
  formatPrice,
  subtotal,
  orderType,
  deliveryFee,
  total,
  form,
  setOrderType,
  handlePlaceOrder,
}) => (
  <div className="cart-panel">
    <Title level={4}>
      <ShoppingCartOutlined /> Your Order ({items.length})
    </Title>

    {items.length === 0 ? (
      <div className="cart-panel__empty">
        <ShoppingCartOutlined style={{ fontSize: 48, opacity: 0.2, marginBottom: 16 }} />
        <p>Your cart is empty. Add some delicious food to get started!</p>
      </div>
    ) : (
      <>
        <div className="cart-panel__items">
          {items.map((item) => (
            <div key={item.key} className="cart-panel__item">
              <div className="cart-panel__item-info">
                <Text strong>{item.name}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  {item.size}
                </Text>
              </div>
              <div className="cart-panel__item-controls">
                <Button
                  size="small"
                  icon={<MinusOutlined />}
                  onClick={() => updateQuantity(item.key, item.quantity - 1)}
                />
                <span className="cart-panel__qty">{item.quantity}</span>
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={() => updateQuantity(item.key, item.quantity + 1)}
                />
              </div>
              <Text strong style={{ minWidth: 80, textAlign: 'right' }}>
                {formatPrice(item.price * item.quantity)}
              </Text>
              <Button
                type="text"
                danger
                size="small"
                icon={<DeleteOutlined />}
                onClick={() => removeItem(item.key)}
              />
            </div>
          ))}
        </div>

        <Divider />

        <div className="cart-panel__totals">
          <div className="cart-panel__row">
            <Text>Subtotal</Text>
            <Text strong>{formatPrice(subtotal)}</Text>
          </div>
          {orderType === 'delivery' && (
            <div className="cart-panel__row">
              <Text>Delivery Fee</Text>
              <Text strong>{formatPrice(deliveryFee)}</Text>
            </div>
          )}
          <div className="cart-panel__row cart-panel__total">
            <Text strong style={{ fontSize: 16 }}>
              Total
            </Text>
            <Title level={4} style={{ margin: 0, color: '#D4A017' }}>
              {formatPrice(total)}
            </Title>
          </div>
        </div>

        <Divider />

        <Form form={form} layout="vertical" className="checkout-form" requiredMark={false}>
          <Form.Item label="Order Type">
            <Radio.Group
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              optionType="button"
              buttonStyle="solid"
              block
            >
              <Radio.Button value="pickup">🏃 Pickup</Radio.Button>
              <Radio.Button value="delivery">🚗 Delivery</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Name is required' }]}
          >
            <Input placeholder="John Doe" size="large" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Phone is required' }]}
          >
            <Input placeholder="+234 800 000 0000" size="large" />
          </Form.Item>

          {orderType === 'delivery' && (
            <Form.Item
              name="address"
              label="Delivery Address"
              rules={[{ required: true, message: 'Address is required for delivery' }]}
            >
              <TextArea rows={2} placeholder="Street address, landmark..." />
            </Form.Item>
          )}

          <Form.Item name="notes" label="Special Notes (optional)">
            <TextArea rows={2} placeholder="Allergies, preferences..." />
          </Form.Item>

          <Form.Item
            name="payment"
            label="Payment Method"
            rules={[{ required: true, message: 'Select payment' }]}
            initialValue="delivery"
          >
            <Radio.Group>
              <Radio value="delivery">Pay on Delivery / Pickup</Radio>
              <Radio value="now">Pay Now (Bank Transfer)</Radio>
            </Radio.Group>
          </Form.Item>

          <Button
            type="primary"
            size="large"
            block
            onClick={handlePlaceOrder}
            className="checkout-form__submit"
            icon={<WhatsAppOutlined />}
          >
            Order via WhatsApp
          </Button>
        </Form>
      </>
    )}
  </div>
);

export default function OrderOnline() {
  const [cuisine, setCuisine] = useState('All');
  const [category, setCategory] = useState('all');
  const [orderType, setOrderType] = useState('pickup');
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [mobileCartVisible, setMobileCartVisible] = useState(false);
  const [form] = Form.useForm();
  const { items, updateQuantity, removeItem, subtotal, clearCart, totalItems } = useCart();

  const formatPrice = (p) => `₦${p.toLocaleString()}`;
  const deliveryFee = orderType === 'delivery' ? 1500 : 0;
  const total = subtotal + deliveryFee;

  const filtered = useMemo(() => {
    let result = dishes;
    if (cuisine !== 'All') result = result.filter((d) => d.cuisineType === cuisine);
    if (category !== 'all') result = result.filter((d) => d.category === category);
    return result;
  }, [cuisine, category]);

  const grouped = useMemo(() => {
    if (category !== 'all') return { [category]: filtered };
    const g = {};
    categories.forEach((c) => {
      const items = filtered.filter((d) => d.category === c.key);
      if (items.length) g[c.key] = items;
    });
    return g;
  }, [filtered, category]);

  const catLabel = (key) => categories.find((c) => c.key === key)?.label || key;

  const handlePlaceOrder = async () => {
    try {
      await form.validateFields();
      const values = form.getFieldsValue();
      const orderLines = items.map(
        (i) => `• ${i.name} (${i.size}) x${i.quantity} — ${formatPrice(i.price * i.quantity)}`
      );
      const msg = [
        `🍽 *New Order from ${restaurant.name}*`,
        ``,
        `*Customer:* ${values.name}`,
        `*Phone:* ${values.phone}`,
        `*Type:* ${orderType === 'delivery' ? 'Delivery' : 'Pickup'}`,
        values.address ? `*Address:* ${values.address}` : '',
        values.notes ? `*Notes:* ${values.notes}` : '',
        ``,
        `*Order:*`,
        ...orderLines,
        ``,
        deliveryFee ? `*Delivery Fee:* ${formatPrice(deliveryFee)}` : '',
        `*Total:* ${formatPrice(total)}`,
        `*Payment:* ${values.payment === 'now' ? 'Pay Now' : 'Pay on Delivery/Pickup'}`,
      ]
        .filter(Boolean)
        .join('\n');

      const waUrl = `https://wa.me/${restaurant.whatsapp.replace('+', '')}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank');

      setConfirmVisible(true);
      setMobileCartVisible(false);
      clearCart();
      form.resetFields();
    } catch {
      message.error('Please fill in all required fields');
    }
  };
  return (
    <div className="order-page">
      <div className="order-page__inner">
        {/* ── Menu Side ── */}
        <div className="order-page__menu">
          <div className="order-page__header">
            <h1 className="order-page__title">Order Online</h1>
            <Text type="secondary" className="order-page__subtitle">
              Savor the flavors of Saveur from the comfort of your home.
            </Text>
          </div>
          
          <div className="order-page__filters">
            <CuisineToggle value={cuisine} onChange={setCuisine} />
            <CategoryTabs activeKey={category} onChange={setCategory} />
          </div>

          <div className="order-page__dishes">
            {Object.entries(grouped).map(([key, items]) => (
              <div key={key} className="order-page__cat-section">
                <h3 className="order-page__cat-title">{catLabel(key)}</h3>
                {items.map((dish) => (
                  <DishRow key={dish.id} dish={dish} prominent />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Desktop Cart Panel ── */}
        <aside className="order-page__cart-desktop">
          <CartPanelContent
            items={items}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            formatPrice={formatPrice}
            subtotal={subtotal}
            orderType={orderType}
            deliveryFee={deliveryFee}
            total={total}
            form={form}
            setOrderType={setOrderType}
            handlePlaceOrder={handlePlaceOrder}
          />
        </aside>
      </div>

      {/* ── Mobile Floating Checkout Button ── */}
      {items.length > 0 && (
        <div className="mobile-checkout-bar">
          <Button 
            type="primary" 
            size="large" 
            className="mobile-checkout-btn"
            onClick={() => setMobileCartVisible(true)}
          >
            <div className="mobile-checkout-btn__content">
              <span className="mobile-checkout-btn__count">{totalItems}</span>
              <span className="mobile-checkout-btn__label">View Your Order</span>
              <span className="mobile-checkout-btn__total">{formatPrice(total)}</span>
              <ArrowRightOutlined />
            </div>
          </Button>
        </div>
      )}

      {/* ── Mobile Cart/Checkout Drawer ── */}
      <Drawer
        title="Checkout"
        placement="right"
        onClose={() => setMobileCartVisible(false)}
        open={mobileCartVisible}
        width="100%"
        className="mobile-checkout-drawer"
        style={{ background: 'var(--bg-color)' }}
      >
        <CartPanelContent
          items={items}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
          formatPrice={formatPrice}
          subtotal={subtotal}
          orderType={orderType}
          deliveryFee={deliveryFee}
          total={total}
          form={form}
          setOrderType={setOrderType}
          handlePlaceOrder={handlePlaceOrder}
        />
      </Drawer>

      {/* ── Confirmation Modal ── */}
      <Modal
        open={confirmVisible}
        onCancel={() => setConfirmVisible(false)}
        footer={null}
        centered
        className="order-confirm-modal"
      >
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <CheckCircleOutlined style={{ fontSize: 64, color: '#10b981' }} />
          <Title level={3} style={{ marginTop: 16 }}>Order Sent!</Title>
          <Text type="secondary">
            Your order has been sent to {restaurant.name} via WhatsApp.
            We'll confirm and prepare it shortly!
          </Text>
          <Button 
            type="primary" 
            block 
            style={{ marginTop: 24 }} 
            onClick={() => setConfirmVisible(false)}
          >
            Great, Thanks!
          </Button>
        </div>
      </Modal>
    </div>
  );
}
