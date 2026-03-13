import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useCart } from '../Cart/CartContext';
import './DishRow.css';

export default function DishRow({ dish, prominent = false }) {
  const { addItem } = useCart();
  const formatPrice = (p) => `₦${p.toLocaleString()}`;

  const handleAdd = (size) => {
    addItem(dish, size);
    message.success({ content: `${dish.name} (${size.label}) added`, duration: 1.5 });
  };

  return (
    <div className={`dish-row${prominent ? ' dish-row--prominent' : ''}`}>
      <div className="dish-row__info">
        <div className="dish-row__header">
          <h4 className="dish-row__name">{dish.name}</h4>
          <span className="dish-row__prices">
            {dish.sizes.map((s, i) => (
              <span key={s.label}>
                {i > 0 && <span className="dish-row__price-sep"> · </span>}
                <span className="dish-row__size-label">{s.label}</span>{' '}
                <span className="dish-row__price">{formatPrice(s.price)}</span>
              </span>
            ))}
          </span>
        </div>
        <p className="dish-row__ingredients">{dish.ingredients}</p>
      </div>
      <div className="dish-row__actions">
        {dish.sizes.map((s) => (
          <Button
            key={s.label}
            type={prominent ? 'primary' : 'default'}
            size={prominent ? 'middle' : 'small'}
            icon={<PlusOutlined />}
            onClick={() => handleAdd(s)}
            className="dish-row__add-btn"
          >
            {dish.sizes.length > 1 ? s.label : 'Add'}
          </Button>
        ))}
      </div>
    </div>
  );
}
