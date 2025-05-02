import React, { useState } from 'react';
import { Sliders, MapPin, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import { PropertyFiltersProps, FilterState } from './PropertyFilters.types';

const PropertyFilters: React.FC<PropertyFiltersProps> = ({ onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    location: '',
    priceMin: 0,
    priceMax: 10000,
    bedrooms: 0,
    bathrooms: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: name === 'location' ? value : Number(value),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterChange(filters);
    setIsOpen(false);
  };

  const clearFilters = () => {
    const defaultFilters: FilterState = {
      location: '',
      priceMin: 0,
      priceMax: 10000,
      bedrooms: 0,
      bathrooms: 0,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" size="sm" icon={<Sliders size={16} />} onClick={() => setIsOpen(!isOpen)}>
          Filters
        </Button>

        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          {['New York', 'Miami', 'Boston', 'Los Angeles', 'Chicago', 'Seattle'].map((city) => (
            <button
              key={city}
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm bg-gray-100 hover:bg-gray-200 whitespace-nowrap"
              onClick={() => {
                const locationFilters = { ...filters, location: city };
                setFilters(locationFilters);
                onFilterChange(locationFilters);
              }}
            >
              <MapPin size={14} className="mr-1" />
              {city}
            </button>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Filter Properties</h3>
            <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-700">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={filters.location}
                  onChange={handleInputChange}
                  placeholder="Enter city or country"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              {/* Price Range */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label htmlFor="priceMin" className="block text-sm font-medium text-gray-700 mb-1">
                    Min Price ($/month)
                  </label>
                  <input
                    type="number"
                    id="priceMin"
                    name="priceMin"
                    value={filters.priceMin}
                    onChange={handleInputChange}
                    min={0}
                    step={100}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label htmlFor="priceMax" className="block text-sm font-medium text-gray-700 mb-1">
                    Max Price ($/month)
                  </label>
                  <input
                    type="number"
                    id="priceMax"
                    name="priceMax"
                    value={filters.priceMax}
                    onChange={handleInputChange}
                    min={0}
                    step={100}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Bedrooms */}
              <div>
                <label htmlFor="bedrooms" className="block text-sm font-medium text-gray-700 mb-1">
                  Bedrooms
                </label>
                <select
                  id="bedrooms"
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="0">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              {/* Bathrooms */}
              <div>
                <label htmlFor="bathrooms" className="block text-sm font-medium text-gray-700 mb-1">
                  Bathrooms
                </label>
                <select
                  id="bathrooms"
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                >
                  <option value="0">Any</option>
                  <option value="1">1+</option>
                  <option value="1.5">1.5+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <Button variant="ghost" size="sm" type="button" onClick={clearFilters}>
                Clear All
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Apply Filters
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PropertyFilters;
