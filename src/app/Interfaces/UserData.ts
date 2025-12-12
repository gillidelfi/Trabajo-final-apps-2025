export interface UserData{
id: number,
restaurantName: string,
firstName: string,
lastName: string,
address: string,
phoneNumbrer: number,
password: number,
password2: number,
}
export type NewUserData = Omit<UserData, 'restaurantName'>;