import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from './CartContext';
import './CartIcon.css';

export default function CartIcon({ onClick }) {
  const { totalItems } = useCart();

  return (
    <div className="cart-icon-wrapper" onClick={onClick} role="button" tabIndex={0}>
      <Badge count={totalItems} size="small" offset={[-2, 2]} color="#D4A017">
        <ShoppingCartOutlined className="cart-icon" />
      </Badge>
    </div>
  );
}
