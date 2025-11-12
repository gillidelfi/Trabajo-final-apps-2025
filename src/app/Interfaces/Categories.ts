export interface RestaurantsMenu {
    name: string,
  }
export type NewCategory = Omit<RestaurantsMenu, 'id'>;