import { useState, useMemo } from 'react';
import CuisineToggle from '../components/Menu/CuisineToggle';
import CategoryTabs from '../components/Menu/CategoryTabs';
import DishRow from '../components/Dishes/DishRow';
import dishes from '../data/dishes';
import categories from '../data/categories';
import restaurant from '../config/restaurant';
import './Menu.css';

export default function Menu() {
  const [cuisine, setCuisine] = useState('All');
  const [category, setCategory] = useState('all');

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

  return (
    <div className="menu-page">
      <div className="menu-page__header">
        <h1>{restaurant.name}</h1>
        <p>Browse our full menu</p>
      </div>

      <CuisineToggle value={cuisine} onChange={setCuisine} />
      <CategoryTabs activeKey={category} onChange={setCategory} />

      <div className="menu-page__content">
        {Object.keys(grouped).length === 0 ? (
          <p className="menu-page__empty">No dishes match your filters.</p>
        ) : (
          Object.entries(grouped).map(([key, items]) => (
            <div key={key} className="menu-page__category" id={`cat-${key}`}>
              <h3 className="menu-page__cat-title">{catLabel(key)}</h3>
              {items.map((dish) => (
                <DishRow key={dish.id} dish={dish} />
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
