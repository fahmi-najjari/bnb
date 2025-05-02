import PropertyList from '@/components/property/PropertyList';
import { properties } from '@/data/properties';

const PropertiesPage = () => {
  return <PropertyList properties={properties} title="All Properties" />;
};

export default PropertiesPage;
