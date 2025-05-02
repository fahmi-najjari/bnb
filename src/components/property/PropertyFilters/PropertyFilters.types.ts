export interface FilterState {
    location: string;
    priceMin: number;
    priceMax: number;
    bedrooms: number;
    bathrooms: number;
  }
  
  export interface PropertyFiltersProps {
    onFilterChange: (filters: FilterState) => void;
  }
  