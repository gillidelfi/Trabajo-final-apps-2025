export interface RestaurantsMenu {
    name: string,
    id: number
  }
export type NewCategory = Omit<RestaurantsMenu, 'id'>;