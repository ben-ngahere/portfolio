import React from 'react';
import { getCategoryTabStyle } from './skillsUtils';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => {
        const tabStyle = getCategoryTabStyle(category);
        return (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
              activeCategory === category
                ? `bg-gradient-to-r ${tabStyle.gradient} text-white shadow-lg scale-105`
                : `backdrop-blur-lg bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/10 ${tabStyle.hoverBorder}`
            }`}
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryTabs;