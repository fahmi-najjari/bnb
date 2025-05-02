import React from 'react';
import PropertyCard from '@/components/property/PropertyCard';
import { PropertyListProps } from './PropertyList.types';

const PropertyList: React.FC<PropertyListProps> = ({ properties, title }) => {
  return (
    <div className="py-8">
      {title && <h2 className="text-2xl font-bold mb-6">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
      {properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyList;
