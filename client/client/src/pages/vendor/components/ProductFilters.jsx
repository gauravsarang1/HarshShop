import React from 'react';
import { Button } from '@/components/ui/button';

const ProductFilters = ({ categories, selectedCategory, onCategoryChange, searchQuery, onSearchChange, onAddProduct }) => (
  <div className="mb-6 space-y-4">
    <div className="flex flex-col sm:flex-row gap-4">
      {/* Search Input */}
      <div className="flex-1">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">
            🔍
          </span>
        </div>
      </div>

      {/* Category Filter */}
      <div className="w-full sm:w-48">
        <select
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end items-center mb-4">
          <Button size={'lg'} onClick={onAddProduct}>Add New Product</Button>
      </div>
    </div>
  </div>
);

export default ProductFilters; 