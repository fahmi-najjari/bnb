import React from 'react';
import { Heart, Star, Award, CheckCircle } from 'lucide-react';
import { PropertyCardProps } from './PropertyCard.types';
import useAuthStore from '@/hooks/auth-store/use-auth-store';
import Badge from '@/components/ui/Badge';

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  const user = useAuthStore((s) => s.user);
  const toggleFavorite = useAuthStore((s) => s.toggleFavorite);
  const isFavorite = user?.favorites?.includes(property.id) ?? false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(property.id);
  };

  return (
    <a href={`/property/${property.id}`} className="group block">
      <div className="relative overflow-hidden rounded-lg">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute right-2 top-2 rounded-full bg-white/80 p-2 text-gray-700 transition-colors hover:bg-white hover:text-red-500"
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? 'fill-red-500 text-red-500' : ''
              }`}
            />
          </button>

          {/* Badges */}
          <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
            {property.isVerified && (
              <Badge variant="info">
                <CheckCircle size={12} className="mr-1" />
                Verified
              </Badge>
            )}
            {property.host.isSuperhost && (
              <Badge variant="success">
                <Award size={12} className="mr-1" />
                Superhost
              </Badge>
            )}
            {property.isFeatured && (
              <Badge variant="warning">Featured</Badge>
            )}
          </div>
        </div>

        {/* Property details */}
        <div className="mt-3">
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {property.title}
            </h3>
            <div className="flex items-center text-sm">
              <Star size={16} className="text-yellow-500 mr-1" />
              <span>{property.rating}</span>
            </div>
          </div>
          <p className="text-gray-500 mt-1">
            {property.location.city}, {property.location.country}
          </p>
          <div className="mt-1 text-sm text-gray-600">
            {property.bedrooms} {property.bedrooms === 1 ? 'bedroom' : 'bedrooms'} ·{' '}
            {property.bathrooms} {property.bathrooms === 1 ? 'bathroom' : 'bathrooms'}
          </div>
          <p className="mt-2 font-semibold text-gray-900">
            ${property.price.monthly.toLocaleString()}
            <span className="text-gray-600 font-normal"> / month</span>
          </p>
        </div>
      </div>
    </a>
  );
};

export default PropertyCard;
