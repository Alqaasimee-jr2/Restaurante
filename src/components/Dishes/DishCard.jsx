import { useState } from 'react';
import { Button, Radio, Tag, message } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../Cart/CartContext';
import './DishCard.css';

export default function DishCard({ dish }) {
  const [selectedSize, setSelectedSize] = useState(0);
  const { addItem } = useCart();
  const size = dish.sizes[selectedSize];

  const handleAdd = () => {
    addItem(dish, size);
    message.success({ content: `${dish.name} added to cart`, duration: 1.5 });
  };

  const formatPrice = (p) => `₦${p.toLocaleString()}`;

  return (
    <div className="dish-card">
      <div className="dish-card__img">
        <img src={dish.image} alt={dish.name} loading="lazy" />
        <Tag className="dish-card__cuisine-tag" color={dish.cuisineType === 'Nigerian' ? '#2db7f5' : '#87d068'}>
          {dish.cuisineType}
        </Tag>
      </div>
      <div className="dish-card__body">
        <h3 className="dish-card__name">{dish.name}</h3>
        <p className="dish-card__desc">{dish.shortDescription}</p>
        <p className="dish-card__ingredients">{dish.ingredients}</p>

        {dish.sizes.length > 1 && (
          <Radio.Group
            value={selectedSize}
            onChange={(e) => setSelectedSize(e.target.value)}
            size="small"
            className="dish-card__sizes"
            optionType="button"
            buttonStyle="solid"
          >
            {dish.sizes.map((s, i) => (
              <Radio.Button key={s.label} value={i}>
                {s.label}
              </Radio.Button>
            ))}
          </Radio.Group>
        )}

        <div className="dish-card__footer">
          <span className="dish-card__price">{formatPrice(size.price)}</span>
          <Button
            type="primary"
            icon={<ShoppingCartOutlined />}
            onClick={handleAdd}
            className="dish-card__add-btn"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
