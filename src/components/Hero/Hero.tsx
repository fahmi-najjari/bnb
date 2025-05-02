import React from 'react';
import { Search } from 'lucide-react';
import Button from '@/components/ui/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg"
          alt="Beautiful apartment interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
      </div>

      {/* Foreground content */}
      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Find Your Perfect Monthly Stay
          </h1>
          <p className="text-xl text-white text-opacity-90 mb-8">
            Discover beautiful homes for extended stays in the best locations worldwide.
            Monthly rentals with all the comforts of home.
          </p>

          {/* Search box */}
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex-grow">
                <label htmlFor="location" className="block text-xs font-medium text-gray-700 mb-1">
                  Where
                </label>
                <input
                  type="text"
                  id="location"
                  placeholder="City, neighborhood, or address"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div className="flex-shrink-0">
                <label htmlFor="dates" className="block text-xs font-medium text-gray-700 mb-1">
                  When
                </label>
                <input
                  type="month"
                  id="dates"
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-cyan-500 focus:border-cyan-500"
                />
              </div>

              <div className="md:self-end">
                <Button variant="primary" size="lg" icon={<Search size={20} />}>
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
