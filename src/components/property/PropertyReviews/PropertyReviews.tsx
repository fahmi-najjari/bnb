import React from 'react';
import { Star, ThumbsUp } from 'lucide-react';
import { PropertyReviewsProps } from './PropertyReviews.types';

const PropertyReviews: React.FC<PropertyReviewsProps> = ({ reviews, propertyId }) => {
  const propertyReviews = reviews.filter(review => review.propertyId === propertyId);

  if (propertyReviews.length === 0) {
    return (
      <div className="py-6">
        <h3 className="text-xl font-semibold mb-4">Reviews</h3>
        <p className="text-gray-500">No reviews yet for this property.</p>
      </div>
    );
  }

  const averageRating =
    propertyReviews.reduce((sum, review) => sum + review.rating, 0) / propertyReviews.length;

  return (
    <div className="py-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Reviews</h3>
        <div className="flex items-center">
          <Star size={20} className="text-yellow-500 mr-1" />
          <span className="font-semibold">{averageRating.toFixed(1)}</span>
          <span className="text-gray-500 ml-1">
            ({propertyReviews.length} reviews)
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {propertyReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-start">
              <img
                src={review.userAvatar}
                alt={review.userName}
                className="w-10 h-10 rounded-full mr-4 object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{review.userName}</h4>
                  <span className="text-gray-500 text-sm">{review.date}</span>
                </div>
                <div className="flex items-center mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star <= review.rating ? 'text-yellow-500' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <p className="mt-2 text-gray-700">{review.comment}</p>
                <button className="flex items-center mt-3 text-sm text-gray-500 hover:text-cyan-600">
                  <ThumbsUp size={14} className="mr-1" />
                  Helpful
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyReviews;
