
import { useParams } from 'react-router-dom';
import PropertyDetails from '@/components/property/pages/PropertyDetails';

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return <PropertyDetails propertyId={id || ''} />;
};

export default PropertyDetailsPage;
