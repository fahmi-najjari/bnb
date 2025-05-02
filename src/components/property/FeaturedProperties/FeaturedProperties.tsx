import React from 'react';
import { Building } from 'lucide-react';
import PropertyList from '../PropertyList';
import { FeaturedPropertiesProps } from './FeaturedProperties.types';

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties }) => {
  const featuredProperties = properties.filter(property => property.isFeatured);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Building size={32} className="text-cyan-600" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Featured Monthly Stays</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of exceptional properties available for extended stays.
            These homes offer the perfect blend of comfort, location, and value for your monthly rental needs.
          </p>
        </div>

        <PropertyList properties={featuredProperties} />
      </div>
    </div>
  );
};

export default FeaturedProperties;
