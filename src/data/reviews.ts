import { Review } from '../types';

export const reviews: Review[] = [
  {
    id: 'r1',
    propertyId: '1',
    userId: 'u1',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    rating: 5,
    comment: 'This loft exceeded all my expectations! The views are incredible and the location is perfect. The host was very responsive and accommodating. I extended my stay for another month because I loved it so much.',
    date: '2023-12-15',
  },
  {
    id: 'r2',
    propertyId: '1',
    userId: 'u2',
    userName: 'Sophia Garcia',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 4,
    comment: 'Beautiful space with amazing views. The kitchen was well-equipped for long-term stays. The only downside was some street noise at night, but that\'s expected in such a central location.',
    date: '2023-11-20',
  },
  {
    id: 'r3',
    propertyId: '2',
    userId: 'u1',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    rating: 4,
    comment: 'Charming studio in a fantastic location. Perfect for my month-long stay while I was working in Boston. The host was very helpful with local recommendations.',
    date: '2023-10-05',
  },
  {
    id: 'r4',
    propertyId: '3',
    userId: 'u2',
    userName: 'Sophia Garcia',
    userAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    rating: 5,
    comment: 'Absolutely stunning condo with breathtaking ocean views! The amenities in the building are top-notch, and the location couldn\'t be better. I stayed for two months and it felt like paradise.',
    date: '2024-01-10',
  },
];