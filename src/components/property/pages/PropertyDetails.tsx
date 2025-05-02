import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Award, Heart, Share2, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/nav/Navbar';
import Footer from '@/components/layout/footer/Footer';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import PropertyAmenities from '@/components/property/PropertyAmenities';
import PropertyReviews from '@/components/property/PropertyReviews';
import { properties } from '@/data/properties';
import { reviews } from '@/data/reviews';
import useAuthStore from '@/hooks/auth-store/use-auth-store';
import PropertyMap from '@/components/property/PropertyMap';

interface PropertyDetailPageProps {
  propertyId: string;
}

const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({ propertyId = '1' }) => {
  const property = properties.find(p => p.id === propertyId);
  const user = useAuthStore((s) => s.user);
  const toggleFavorite = useAuthStore((s) => s.toggleFavorite);
  const isFavorite = user?.favorites.includes(propertyId);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-semibold">Property not found</h2>
          <p className="mt-4">The property you're looking for doesn't exist or has been removed.</p>
          <div className="mt-6">
            <a href="/" className="text-cyan-600 hover:underline">Return to home page</a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === property.images.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? property.images.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          {/* Property Title and Quick Actions */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold">{property.title}</h1>
            <div className="flex flex-wrap items-center justify-between mt-2">
              <div className="flex items-center flex-wrap">
                <div className="flex items-center mr-4">
                  <Star size={20} className="text-yellow-500 mr-1" />
                  <span className="font-semibold">{property.rating}</span>
                  <span className="text-gray-500 ml-1">({property.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <MapPin size={18} className="mr-1" />
                  <span>{property.location.city}, {property.location.country}</span>
                </div>
                {property.host.isSuperhost && (
                  <div className="ml-4">
                    <Badge variant="success">
                      <Award size={12} className="mr-1" />
                      Superhost
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="flex mt-2 sm:mt-0">
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Share2 size={16} />}
                  className="mr-2"
                >
                  Share
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  icon={<Heart size={16} className={isFavorite ? 'fill-red-500 text-red-500' : ''} />}
                  onClick={() => toggleFavorite(property.id)}
                >
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Property Images */}
          <div className="relative mb-12">
            {showAllImages ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {property.images.map((image, index) => (
                  <div key={index} className="aspect-[4/3] overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={`${property.title} - Image ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <Button 
                  variant="outline" 
                  className="absolute top-4 right-4 bg-white bg-opacity-90"
                  onClick={() => setShowAllImages(false)}
                >
                  Show fewer photos
                </Button>
              </div>
            ) : (
              <div className="relative aspect-[2/1] overflow-hidden rounded-lg">
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={`${property.title} - Image ${currentImageIndex + 1}`} 
                  className="w-full h-full object-cover"
                />
                
                <button 
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-sm transition-all"
                  onClick={prevImage}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button 
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 shadow-sm transition-all"
                  onClick={nextImage}
                >
                  <ChevronRight size={24} />
                </button>
                
                <Button 
                  variant="outline" 
                  className="absolute bottom-4 right-4 bg-white bg-opacity-90"
                  onClick={() => setShowAllImages(true)}
                >
                  Show all photos
                </Button>
                
                <div className="absolute bottom-4 left-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-md text-sm">
                  {currentImageIndex + 1} / {property.images.length}
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Property Details */}
            <div className="lg:col-span-2">
              <div className="border-b border-gray-200 pb-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-semibold">
                      Entire rental hosted by {property.host.name}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'} · {property.bathrooms} {property.bathrooms === 1 ? 'bathroom' : 'bathrooms'} · {property.maxGuests} guests
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <img 
                      src={property.host.avatar} 
                      alt={property.host.name}
                      className="w-14 h-14 rounded-full border-2 border-white shadow-sm object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="py-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold mb-4">About this space</h3>
                <p className="text-gray-700 whitespace-pre-line">{property.description}</p>
              </div>
              
              <PropertyAmenities amenities={property.amenities} />
              
              <PropertyReviews reviews={reviews} propertyId={property.id} />
              
              <div className="py-6 border-t border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Location</h3>
                <p className="text-gray-700 mb-4">{property.location.address}</p>
                <div className="h-[400px] rounded-lg overflow-hidden">
                  <PropertyMap property={property} />
                </div>
              </div>
            </div>
            
            {/* Booking/Pricing Card */}
            <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm dark:bg-gray-800 dark:border-gray-700 sticky top-20">

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-2xl font-bold">${property.price.monthly.toLocaleString()}</span>
                    <span className="text-gray-600"> / month</span>
                  </div>
                  <div className="flex items-center">
                    <Star size={18} className="text-yellow-500 mr-1" />
                    <span>{property.rating} · <span className="text-gray-500">{property.reviewCount} reviews</span></span>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-md mb-4">
                  <div className="grid grid-cols-2 divide-x divide-gray-200">
                    <div className="p-3">
                      <label htmlFor="checkIn" className="block text-xs text-gray-500 font-medium">CHECK-IN</label>
                      <input 
                        type="date" 
                        id="checkIn"
                        className="w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0"
                      />
                    </div>
                    <div className="p-3">
                      <label htmlFor="checkOut" className="block text-xs text-gray-500 font-medium">CHECKOUT</label>
                      <input 
                        type="date" 
                        id="checkOut"
                        className="w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0"
                      />
                    </div>
                  </div>
                  <div className="border-t border-gray-200 p-3">
                    <label htmlFor="guests" className="block text-xs text-gray-500 font-medium">GUESTS</label>
                    <select 
                      id="guests"
                      className="w-full border-0 p-0 text-gray-900 focus:ring-0"
                    >
                      {Array.from({ length: property.maxGuests }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'guest' : 'guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Button variant="primary" fullWidth size="lg">
                  Request to Book
                </Button>
                
                <p className="text-center text-gray-500 text-sm mt-4">
                  You won't be charged yet
                </p>
                
                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-700">${property.price.monthly.toLocaleString()} x 1 month</span>
                    <span>${property.price.monthly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Cleaning fee</span>
                    <span>$150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Service fee</span>
                    <span>$100</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between font-bold">
                    <span>Total</span>
                    <span>${(property.price.monthly + 150 + 100).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetailPage;