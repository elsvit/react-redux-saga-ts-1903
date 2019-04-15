import { forIn, get } from 'lodash';

import { IRestaurant } from 'store/restaurants/restaurants';

export const filterRestaurants = (restaurants: IRestaurant[], filter: string = '') => {
  if (!restaurants) {
    return [];
  }
  if (filter === '' || filter == null) {
    return restaurants;
  }
  const filteredRestaurants = restaurants.filter((restaurant: IRestaurant) => {
    forIn(restaurant, (val: any) => {
      if (typeof val === 'object' && val != null) {
        forIn(val, (val2: any) => {
          if (
            (typeof val === 'string' || typeof val === 'number') &&
            String(val2)
              .toLowerCase()
              .includes(filter.toLowerCase())
          ) {
            return true;
          }
        });
      } else if (
        (typeof val === 'string' || typeof val === 'number') &&
        String(val)
          .toLowerCase()
          .includes(filter.toLowerCase())
      ) {
        return true;
      }
    });
  });
  return filteredRestaurants;
};

export const sortRestaurants = (restaurantsIn: IRestaurant[], value: string) => {
  if (value === '' || value === null || value === undefined) {
    return restaurantsIn;
  }
  if (!restaurantsIn) {
    return [];
  }
  const restaurants = restaurantsIn;
  restaurants.sort((a: IRestaurant, b: IRestaurant) => {
    const aValue = get(a, value, '');
    const bValue = get(b, value, '');
    if (aValue < bValue) {
      return -1;
    }
    if (aValue > bValue) {
      return 1;
    }
    return 0;
  });
  return restaurants;
};
