// utils/calculateAverageRating.js
export const calculateAverageRating = (reviews = []) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return total / reviews.length;
  };
  