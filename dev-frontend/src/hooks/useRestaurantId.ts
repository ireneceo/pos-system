import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * Get the current restaurant ID from URL params or logged-in user
 * Returns the restaurant ID as a number
 */
export const useRestaurantId = (): number => {
  const { restaurantId: urlRestaurantId } = useParams<{ restaurantId: string }>();
  const { user } = useAuth();

  // Priority: URL parameter > User's restaurantId > Default 1
  if (urlRestaurantId) {
    return parseInt(urlRestaurantId, 10);
  }

  if (user?.restaurantId) {
    return typeof user.restaurantId === 'number'
      ? user.restaurantId
      : parseInt(user.restaurantId, 10);
  }

  console.warn('useRestaurantId: No restaurantId found in URL or user context, using default 1');
  return 1;
};
