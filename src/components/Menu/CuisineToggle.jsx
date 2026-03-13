import { Segmented } from 'antd';
import './CuisineToggle.css';

const options = ['All', 'Nigerian', 'Continental'];

export default function CuisineToggle({ value, onChange }) {
  return (
    <div className="cuisine-toggle">
      <Segmented
        options={options}
        value={value}
        onChange={onChange}
        size="large"
        className="cuisine-toggle__control"
      />
    </div>
  );
}
