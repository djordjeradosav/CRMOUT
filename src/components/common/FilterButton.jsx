import React, { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Menu } from '@headlessui/react';

const FilterButton = ({ filters, onFilterChange, activeFilters = {} }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <Filter className="h-5 w-5 mr-2" />
        Filter
        <ChevronDown className="h-4 w-4 ml-1" />
      </Menu.Button>

      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1">
          {filters.map((filter) => (
            <div
              key={filter.key}
              className="px-4 py-2 border-b border-gray-100 last:border-b-0"
            >
              <div className="text-sm font-medium text-gray-700 mb-2">
                {filter.label}
              </div>
              <div className="space-y-1">
                {filter.options.map((option) => (
                  <Menu.Item key={option.value}>
                    {({ active }) => (
                      <label
                        className={`flex items-center px-2 py-1 rounded cursor-pointer ${
                          active ? 'bg-gray-50' : ''
                        }`}
                      >
                        <input
                          type={filter.type || 'checkbox'}
                          className="mr-2 h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          checked={
                            filter.type === 'radio'
                              ? activeFilters[filter.key] === option.value
                              : activeFilters[filter.key]?.includes(
                                  option.value
                                ) || false
                          }
                          onChange={(e) => {
                            if (filter.type === 'radio') {
                              onFilterChange(filter.key, option.value);
                            } else {
                              const currentValues =
                                activeFilters[filter.key] || [];
                              const newValues = e.target.checked
                                ? [...currentValues, option.value]
                                : currentValues.filter(
                                    (v) => v !== option.value
                                  );
                              onFilterChange(filter.key, newValues);
                            }
                          }}
                        />
                        <span className="text-sm text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </div>
          ))}

          {/* Clear Filters Button */}
          <div className="px-4 py-2">
            <button
              onClick={() => {
                filters.forEach((filter) => {
                  onFilterChange(
                    filter.key,
                    filter.type === 'radio' ? null : []
                  );
                });
              }}
              className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Clear All Filters
            </button>
          </div>
        </div>
      </Menu.Items>
    </Menu>
  );
};

export default FilterButton;
