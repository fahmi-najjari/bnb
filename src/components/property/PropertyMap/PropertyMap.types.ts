import type { Property } from '@/types';

export interface PropertyMapProps {
  property?: Property;                    // Used on the property detail page
  properties?: Property[];                // Used on the homepage or listing
  onPropertySelect?: (propertyId: string) => void;
}
