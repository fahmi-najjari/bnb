// src/components/property/PropertyMap/PropertyMap.tsx
import { useRef, useState } from 'react';
import Map, { Marker, Popup } from 'react-map-gl';
import { MapPin } from 'lucide-react';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Property } from '@/types';

interface PropertyMapProps {
  properties: Property[];
  onPropertySelect: (propertyId: string) => void;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ properties, onPropertySelect }) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const mapRef = useRef(null);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: -74.006,
        latitude: 40.7128,
        zoom: 12
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle="https://tiles.stadiamaps.com/styles/osm_bright.json"
    >
      {properties.map((property) => (
        <Marker
          key={property.id}
          longitude={property.location.coordinates?.lng || 0}
          latitude={property.location.coordinates?.lat || 0}
          onClick={() => {
            setSelectedProperty(property);
            onPropertySelect(property.id);
          }}
        >
          <MapPin className="text-cyan-600" size={24} />
        </Marker>
      ))}

      {selectedProperty && (
        <Popup
          longitude={selectedProperty.location.coordinates?.lng || 0}
          latitude={selectedProperty.location.coordinates?.lat ||  0}
          onClose={() => setSelectedProperty(null)}
          closeButton={true}
          closeOnClick={false}
        >
          <div className="p-2">
            <h3 className="font-bold">{selectedProperty.title}</h3>
            <p className="text-sm text-gray-600">
              {selectedProperty.location.city}, {selectedProperty.location.country}
            </p>
            <p className="text-sm font-semibold text-cyan-600">
              ${selectedProperty.price.monthly}/month
            </p>
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default PropertyMap;



//import React, { useRef, useState } from 'react';
//import Map, { Marker, Popup } from 'react-map-gl';
//import { MapPin } from 'lucide-react';
//import { Property } from '@/types';
//import 'maplibre-gl/dist/maplibre-gl.css';

//interface PropertyMapProps {
//   property?: Property;                      // Used for detail page
//   properties?: Property[];                  // Used for listings
//   onPropertySelect?: (propertyId: string) => void;
// }

// const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;
// const DEFAULT_COORDS = { lng: -98.5795, lat: 39.8283 }; // USA center

// const PropertyMap: React.FC<PropertyMapProps> = ({
//   property,
//   properties,
//   onPropertySelect,
// }) => {
//   const [popupInfo, setPopupInfo] = useState<Property | null>(null);
//   const mapRef = useRef(null);

//   const initialViewState = {
//     longitude: property?.location.coordinates?.lng || DEFAULT_COORDS.lng,
//     latitude: property?.location.coordinates?.lat || DEFAULT_COORDS.lat,
//     zoom: property ? 14 : 3,
//   };

//   return (
//     <Map
//       ref={mapRef}
//       mapboxAccessToken={MAPBOX_TOKEN}
//       initialViewState={initialViewState}
//       style={{ width: '100%', height: '100%' }}
//       mapStyle="mapbox://styles/mapbox/streets-v12"
//     >
//       {property ? (
//         <Marker
//           longitude={property.location.coordinates?.lng || DEFAULT_COORDS.lng}
//           latitude={property.location.coordinates?.lat || DEFAULT_COORDS.lat}
//         >
//           <MapPin className="w-8 h-8 text-cyan-600" />
//         </Marker>
//       ) : (
//         properties?.map((prop) => (
//           <Marker
//             key={prop.id}
//             longitude={prop.location.coordinates?.lng || DEFAULT_COORDS.lng}
//             latitude={prop.location.coordinates?.lat || DEFAULT_COORDS.lat}
//             onClick={(e) => {
//               e.originalEvent.stopPropagation();
//               setPopupInfo(prop);
//               onPropertySelect?.(prop.id);
//             }}
//           >
//             <MapPin className="w-6 h-6 text-cyan-600 cursor-pointer" />
//           </Marker>
//         ))
//       )}

//       {popupInfo && (
//         <Popup
//           anchor="bottom"
//           longitude={popupInfo.location.coordinates?.lng || DEFAULT_COORDS.lng}
//           latitude={popupInfo.location.coordinates?.lat || DEFAULT_COORDS.lat}
//           onClose={() => setPopupInfo(null)}
//         >
//           <div className="p-2">
//             <img
//               src={popupInfo.images[0]}
//               alt={popupInfo.title}
//               className="w-32 h-24 object-cover rounded-md mb-2"
//             />
//             <h3 className="font-semibold text-sm">{popupInfo.title}</h3>
//             <p className="text-sm text-gray-600">
//               ${popupInfo.price.monthly.toLocaleString()}/month
//             </p>
//           </div>
//         </Popup>
//       )}
//     </Map>
//   );
// };

// export default PropertyMap;
