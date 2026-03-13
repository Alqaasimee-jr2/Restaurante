import { Tabs } from 'antd';
import categories from '../../data/categories';
import './CategoryTabs.css';

export default function CategoryTabs({ activeKey, onChange }) {
  return (
    <div className="category-tabs">
      <Tabs
        activeKey={activeKey}
        onChange={onChange}
        type="line"
        size="large"
        tabBarGutter={8}
        items={[
          { key: 'all', label: 'All' },
          ...categories.map((c) => ({ key: c.key, label: c.label })),
        ]}
      />
    </div>
  );
}
