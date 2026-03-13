import { Drawer, List, Button, InputNumber, Typography, Empty, Divider } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useCart } from './CartContext';
import { useNavigate } from 'react-router-dom';
import './CartDrawer.css';

const { Text, Title } = Typography;

export default function CartDrawer({ open, onClose }) {
  const { items, updateQuantity, removeItem, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const formatPrice = (p) => `₦${p.toLocaleString()}`;

  return (
    <Drawer
      title={
        <span style={{ fontWeight: 700, fontSize: 18 }}>
          <ShoppingOutlined style={{ marginRight: 8 }} /> Your Cart
        </span>
      }
      placement="right"
      onClose={onClose}
      open={open}
      width={380}
      className="cart-drawer"
      footer={
        items.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-subtotal">
              <Text>Subtotal</Text>
              <Title level={4} style={{ margin: 0 }}>{formatPrice(subtotal)}</Title>
            </div>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => {
                onClose();
                navigate('/order');
              }}
            >
              Proceed to Checkout
            </Button>
            <Button size="small" type="link" danger onClick={clearCart} style={{ marginTop: 8 }}>
              Clear Cart
            </Button>
          </div>
        )
      }
    >
      {items.length === 0 ? (
        <Empty description="Your cart is empty" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <List
          dataSource={items}
          renderItem={(item) => (
            <List.Item className="cart-item" key={item.key}>
              <div className="cart-item-img">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="cart-item-info">
                <Text strong className="cart-item-name">{item.name}</Text>
                <Text type="secondary" style={{ fontSize: 12 }}>{item.size}</Text>
                <Text className="cart-item-price">{formatPrice(item.price)}</Text>
              </div>
              <div className="cart-item-actions">
                <InputNumber
                  min={1}
                  max={20}
                  value={item.quantity}
                  size="small"
                  onChange={(val) => updateQuantity(item.key, val)}
                  style={{ width: 56 }}
                />
                <Button
                  type="text"
                  danger
                  icon={<DeleteOutlined />}
                  size="small"
                  onClick={() => removeItem(item.key)}
                />
              </div>
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
}
