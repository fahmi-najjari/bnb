import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar/Navbar';
import Hero from '@/components/Hero';
import PropertyFilters from '@/components/property/PropertyFilters';
import PropertyList from '@/components/property/PropertyList';
import PropertyMap from '@/components/property/PropertyMap';
import FeaturedProperties from '@/components/property/FeaturedProperties';
import Footer from '@/components/layout/footer/Footer';
import { properties } from '@/data/properties';
import { Property } from '@/types';

const HomePage: React.FC = () => {
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(properties);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredProperties(properties);
      return;
    }
    
    const lowercaseQuery = query.toLowerCase();
    const filtered = properties.filter(property => 
      property.title.toLowerCase().includes(lowercaseQuery) ||
      property.location.city.toLowerCase().includes(lowercaseQuery) ||
      property.location.country.toLowerCase().includes(lowercaseQuery)
    );
    
    setFilteredProperties(filtered);
  };

  const handleFilterChange = (filters: any) => {
    let filtered = [...properties];
    
    if (filters.location) {
      const lowercaseLocation = filters.location.toLowerCase();
      filtered = filtered.filter(property => 
        property.location.city.toLowerCase().includes(lowercaseLocation) ||
        property.location.country.toLowerCase().includes(lowercaseLocation)
      );
    }
    
    filtered = filtered.filter(property => 
      property.price.monthly >= filters.priceMin &&
      property.price.monthly <= filters.priceMax
    );
    
    if (filters.bedrooms > 0) {
      filtered = filtered.filter(property => property.bedrooms >= filters.bedrooms);
    }
    
    if (filters.bathrooms > 0) {
      filtered = filtered.filter(property => property.bathrooms >= filters.bathrooms);
    }
    
    setFilteredProperties(filtered);
  };

  const handlePropertySelect = (propertyId: string) => {
    window.location.href = `/property/${propertyId}`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onSearch={handleSearch} />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-6">
            <PropertyFilters onFilterChange={handleFilterChange} />
            <button
              onClick={() => setShowMap(!showMap)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              {showMap ? 'Show List' : 'Show Map'}
            </button>
          </div>
          
          {searchQuery && (
            <h2 className="text-2xl font-bold mb-6">
              {filteredProperties.length === 0 
                ? 'No results found' 
                : `Results for "${searchQuery}"`
              }
            </h2>
          )}
          
          {showMap ? (
            <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
              <PropertyMap 
                properties={filteredProperties}
                onPropertySelect={handlePropertySelect}
              />
            </div>
          ) : (
            <PropertyList 
              properties={filteredProperties} 
              title={!searchQuery ? "All Properties" : undefined} 
            />
          )}
        </div>
        
        <FeaturedProperties properties={properties} />
        
        <div className="bg-cyan-50 py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose Monthly Stays?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto mb-12">
              Our platform offers the perfect solution for extended stays, whether you're relocating,
              working remotely, or just need a longer getaway.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Monthly Pricing</h3>
                <p className="text-gray-600">
                  Exclusive discounted rates for stays of 28+ days, saving you money on extended bookings.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Fully Furnished</h3>
                <p className="text-gray-600">
                  Move right in with everything you need—from fully-equipped kitchens to workspace setups.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 mx-auto mb-4 bg-cyan-100 rounded-full flex items-center justify-center">
                  <span className="text-cyan-600 text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Verified Hosts</h3>
                <p className="text-gray-600">
                  Stay with confidence thanks to our verified hosts who specialize in longer-term accommodations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HomePage;