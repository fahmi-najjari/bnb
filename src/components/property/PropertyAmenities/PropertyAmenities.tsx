import React from 'react';
import {
  Wifi,
  Utensils,
  Waves,
  Car,
  Dumbbell,
  Snowflake,
  Thermometer,
  Users,
  ShowerHead,
  Building,
  Mountain,
} from 'lucide-react';

import { PropertyAmenitiesProps } from './PropertyAmenities.types';

const PropertyAmenities: React.FC<PropertyAmenitiesProps> = ({ amenities }) => {
  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'WiFi': return <Wifi size={20} />;
      case 'Kitchen': return <Utensils size={20} />;
      case 'Pool': return <Waves size={20} />;
      case 'Parking': return <Car size={20} />;
      case 'Gym': return <Dumbbell size={20} />;
      case 'Air Conditioning': return <Snowflake size={20} />;
      case 'Heating': return <Thermometer size={20} />;
      case 'Doorman': return <Users size={20} />;
      case 'Washer/Dryer': return <ShowerHead size={20} />;
      case 'Elevator': return <Building size={20} />;
      case 'Mountain View': return <Mountain size={20} />;
      default: return null;
    }
  };

  return (
    <div className="py-6">
      <h3 className="text-xl font-semibold mb-4">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <div key={amenity} className="flex items-center">
            <div className="text-gray-600 mr-3">{getAmenityIcon(amenity)}</div>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyAmenities;
